import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

function parseArgs(argv) {
  const out = { clean: false };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--clean") {
      out.clean = true;
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

function rmIfExists(targetPath) {
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
  }
}

function ensureDir(targetPath) {
  fs.mkdirSync(targetPath, { recursive: true });
}

function copyRecursiveFiltered(srcRoot, dstRoot, allowedExts) {
  const copied = [];

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
      fs.copyFileSync(srcPath, dstPath);
      copied.push(relPath.replaceAll(path.sep, "/"));
    }
  }

  walk(srcRoot);
  return copied;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const project = args.project;

  if (!project) {
    throw new Error("--project is required (example: --project yapcode)");
  }

  const sourceRoot = args.source || args.local || args.vault;
  if (!sourceRoot) {
    throw new Error("--source is required (example: --source /path/to/local/projects-root)");
  }

  const typeCsv = args.types || "html,md,pdf,png,jpg,jpeg,svg";
  const allowedExts = new Set(
    typeCsv
      .split(",")
      .map((v) => v.trim().toLowerCase())
      .filter(Boolean),
  );

  const sourceProjectRoot = path.join(sourceRoot, project);
  const destProjectRoot = path.join(repoRoot, "content", "projects", project);

  if (!fs.existsSync(sourceProjectRoot)) {
    throw new Error(`Source project folder not found: ${sourceProjectRoot}`);
  }

  if (args.clean) {
    rmIfExists(destProjectRoot);
  }

  ensureDir(destProjectRoot);

  const copied = copyRecursiveFiltered(sourceProjectRoot, destProjectRoot, allowedExts);

  const message = [
    `Project: ${project}`,
    `Source: ${sourceProjectRoot}`,
    `Destination: ${destProjectRoot}`,
    `Allowed types: ${Array.from(allowedExts).join(", ")}`,
    `Copied files: ${copied.length}`,
  ].join("\n");

  console.log(message);

  if (copied.length > 0) {
    console.log("\nSample copied paths:");
    for (const p of copied.slice(0, 20)) {
      console.log(`- ${p}`);
    }
  }
}

main();
