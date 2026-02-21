import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

function parseArgs(argv) {
  const out = {
    clean: false,
    dryRun: false,
    noCommit: false,
    noPush: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--clean") {
      out.clean = true;
      continue;
    }

    if (arg === "--dry-run") {
      out.dryRun = true;
      continue;
    }

    if (arg === "--no-commit") {
      out.noCommit = true;
      continue;
    }

    if (arg === "--no-push") {
      out.noPush = true;
      continue;
    }

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const val = argv[i + 1];
      if (!val || val.startsWith("--")) {
        throw new Error(`Missing value for --${key}`);
      }
      out[key] = val;
      i += 1;
    }
  }

  return out;
}

function ensureDir(targetPath) {
  fs.mkdirSync(targetPath, { recursive: true });
}

function rmIfExists(targetPath) {
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
  }
}

function toPosix(p) {
  return p.replaceAll(path.sep, "/");
}

function sanitizeTextContent(text) {
  return text
    .replace(/file:\/\/[^\s)"'`<>]+/g, "[redacted-local-file-url]")
    .replace(/\/Users\/[^\s)"'`<>]+/g, "[redacted-local-path]")
    .replace(/\/home\/[^\s)"'`<>]+/g, "[redacted-local-path]")
    .replace(/[A-Za-z]:\\Users\\[^\s)"'`<>]+/g, "[redacted-local-path]");
}

function copyRecursiveFiltered(srcRoot, dstRoot, allowedExts) {
  const copied = [];
  const textExts = new Set(["md", "txt", "json", "html", "js", "css"]);

  function walk(currentSrc) {
    const entries = fs.readdirSync(currentSrc, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith(".")) {
        continue;
      }

      const srcPath = path.join(currentSrc, entry.name);
      const relPath = path.relative(srcRoot, srcPath);
      const dstPath = path.join(dstRoot, relPath);

      if (entry.isDirectory()) {
        walk(srcPath);
        continue;
      }

      const ext = path.extname(entry.name).slice(1).toLowerCase();
      if (!allowedExts.has(ext)) {
        continue;
      }

      ensureDir(path.dirname(dstPath));
      if (textExts.has(ext)) {
        const srcText = fs.readFileSync(srcPath, "utf8");
        fs.writeFileSync(dstPath, sanitizeTextContent(srcText), "utf8");
      } else {
        fs.copyFileSync(srcPath, dstPath);
      }
      copied.push(toPosix(relPath));
    }
  }

  walk(srcRoot);
  return copied;
}

function run(cmd) {
  execSync(cmd, { cwd: repoRoot, stdio: "inherit" });
}

function runCapture(cmd) {
  return execSync(cmd, { cwd: repoRoot, stdio: "pipe" }).toString();
}

function getProjects(sourceRoot, projectsCsv) {
  if (projectsCsv) {
    return projectsCsv
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  }

  return fs
    .readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const sourceRoot = args.source;

  if (!sourceRoot) {
    throw new Error("--source is required (example: --source /path/to/local/projects-root)");
  }

  if (!fs.existsSync(sourceRoot)) {
    throw new Error(`Source root not found: ${sourceRoot}`);
  }

  const projects = getProjects(sourceRoot, args.projects);
  if (projects.length === 0) {
    throw new Error("No projects found to sync.");
  }

  const typeCsv = args.types || "html";
  const allowedExts = new Set(
    typeCsv
      .split(",")
      .map((v) => v.trim().toLowerCase())
      .filter(Boolean),
  );

  console.log(`Source root: ${sourceRoot}`);
  console.log(`Projects: ${projects.join(", ")}`);
  console.log(`Types: ${Array.from(allowedExts).join(", ")}`);
  console.log(`Clean mode: ${args.clean ? "on" : "off"}`);

  for (const project of projects) {
    const sourceProjectRoot = path.join(sourceRoot, project);
    const destProjectRoot = path.join(repoRoot, "content", "projects", project);

    if (!fs.existsSync(sourceProjectRoot)) {
      if (args.projects) {
        throw new Error(`Project folder not found under source root: ${sourceProjectRoot}`);
      }
      continue;
    }

    if (args.clean) {
      rmIfExists(destProjectRoot);
    }

    ensureDir(destProjectRoot);
    const copied = copyRecursiveFiltered(sourceProjectRoot, destProjectRoot, allowedExts);
    console.log(`- ${project}: copied ${copied.length} file(s)`);
  }

  if (args.dryRun) {
    console.log("Dry run complete. Skipping build/commit/push.");
    return;
  }

  run("npm run build");

  run("git add content/projects");

  const staged = runCapture("git diff --cached --name-only").trim();
  if (!staged) {
    console.log("No content changes detected after sync.");
    return;
  }

  if (!args.noCommit) {
    const message = args.message || "content: sync visuals";
    run(`git commit -m ${JSON.stringify(message)}`);
  } else {
    console.log("Skipped commit due to --no-commit.");
  }

  if (!args.noPush) {
    run("git push");
  } else {
    console.log("Skipped push due to --no-push.");
  }
}

main();
