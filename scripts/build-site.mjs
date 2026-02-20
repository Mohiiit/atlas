import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const staticDir = path.join(repoRoot, "static");
const contentDir = path.join(repoRoot, "content");
const distDir = path.join(repoRoot, "dist");

function ensureDir(targetPath) {
  fs.mkdirSync(targetPath, { recursive: true });
}

function rmIfExists(targetPath) {
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
  }
}

function copyDir(src, dst) {
  ensureDir(dst);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, dstPath);
      continue;
    }

    fs.copyFileSync(srcPath, dstPath);
  }
}

function toPosix(p) {
  return p.replaceAll(path.sep, "/");
}

function buildTree(absPath, relPath = "") {
  const stat = fs.statSync(absPath);

  if (stat.isDirectory()) {
    const children = fs
      .readdirSync(absPath, { withFileTypes: true })
      .filter((entry) => !entry.name.startsWith("."))
      .map((entry) => {
        const childAbs = path.join(absPath, entry.name);
        const childRel = relPath ? path.join(relPath, entry.name) : entry.name;
        return buildTree(childAbs, childRel);
      })
      .sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === "dir" ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });

    return {
      type: "dir",
      name: path.basename(absPath),
      path: toPosix(relPath),
      children,
    };
  }

  const ext = path.extname(absPath).slice(1).toLowerCase();

  return {
    type: "file",
    name: path.basename(absPath),
    path: toPosix(relPath),
    ext,
    size: stat.size,
    updatedAt: stat.mtime.toISOString(),
  };
}

function countTree(node) {
  if (!node) {
    return { files: 0, dirs: 0 };
  }

  if (node.type === "file") {
    return { files: 1, dirs: 0 };
  }

  let files = 0;
  let dirs = 1;

  for (const child of node.children || []) {
    const c = countTree(child);
    files += c.files;
    dirs += c.dirs;
  }

  return { files, dirs };
}

function buildManifest() {
  const projectsRoot = path.join(contentDir, "projects");

  if (!fs.existsSync(projectsRoot)) {
    return {
      generatedAt: new Date().toISOString(),
      contentRoot: "content",
      projects: [],
    };
  }

  const projectEntries = fs
    .readdirSync(projectsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .sort((a, b) => a.name.localeCompare(b.name));

  const projects = projectEntries.map((entry) => {
    const projectAbs = path.join(projectsRoot, entry.name);
    const projectRel = path.join("projects", entry.name);
    const tree = buildTree(projectAbs, projectRel);
    const counts = countTree(tree);

    return {
      id: entry.name,
      name: entry.name,
      path: toPosix(projectRel),
      fileCount: counts.files,
      dirCount: Math.max(0, counts.dirs - 1),
      tree,
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    contentRoot: "content",
    projects,
  };
}

function main() {
  rmIfExists(distDir);
  ensureDir(distDir);

  copyDir(staticDir, distDir);
  copyDir(contentDir, path.join(distDir, "content"));

  const manifest = buildManifest();
  fs.writeFileSync(path.join(distDir, "manifest.json"), JSON.stringify(manifest, null, 2));

  console.log(`Build complete: ${distDir}`);
  console.log(`Projects found: ${manifest.projects.length}`);
  for (const project of manifest.projects) {
    console.log(`- ${project.name}: ${project.fileCount} files, ${project.dirCount} directories`);
  }
}

main();
