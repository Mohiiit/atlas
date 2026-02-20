const appEl = document.getElementById("app");
const homeBtn = document.getElementById("homeBtn");
const generatedAtEl = document.getElementById("generatedAt");
const projectCardTemplate = document.getElementById("projectCardTemplate");

const state = {
  manifest: null,
  currentProjectId: null,
  currentSelectionPath: null,
  expanded: new Set(),
  nodeByPath: new Map(),
};

function formatDate(iso) {
  if (!iso) {
    return "";
  }

  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return iso;
  }

  return d.toLocaleString();
}

function hashFor(projectId, selectedPath = "") {
  if (!projectId) {
    return "#/";
  }

  const encoded = selectedPath ? encodeURIComponent(selectedPath) : "";
  return `#/project/${encodeURIComponent(projectId)}${encoded ? `/item/${encoded}` : ""}`;
}

function readHash() {
  const raw = window.location.hash || "#/";
  const parts = raw.replace(/^#\/?/, "").split("/").filter(Boolean);

  if (parts.length === 0) {
    return { projectId: null, selectedPath: null };
  }

  if (parts[0] !== "project") {
    return { projectId: null, selectedPath: null };
  }

  const projectId = decodeURIComponent(parts[1] || "");
  let selectedPath = null;

  if (parts[2] === "item" && parts[3]) {
    selectedPath = decodeURIComponent(parts.slice(3).join("/"));
  }

  return { projectId, selectedPath };
}

function setRoute(projectId, selectedPath = null) {
  const nextHash = hashFor(projectId, selectedPath || "");
  if (window.location.hash !== nextHash) {
    window.location.hash = nextHash;
  } else {
    applyRoute();
  }
}

function buildNodeMap() {
  state.nodeByPath.clear();

  const visit = (node) => {
    state.nodeByPath.set(node.path, node);
    if (node.type === "dir") {
      for (const child of node.children || []) {
        visit(child);
      }
    }
  };

  for (const project of state.manifest.projects) {
    visit(project.tree);
  }
}

function getProject(projectId) {
  return state.manifest.projects.find((p) => p.id === projectId) || null;
}

function ensureExpandedForPath(path) {
  if (!path) {
    return;
  }

  const parts = path.split("/");
  for (let i = 1; i < parts.length; i += 1) {
    const segment = parts.slice(0, i).join("/");
    state.expanded.add(segment);
  }
}

function applyRoute() {
  const { projectId, selectedPath } = readHash();

  if (!projectId) {
    state.currentProjectId = null;
    state.currentSelectionPath = null;
    renderHome();
    return;
  }

  const project = getProject(projectId);
  if (!project) {
    state.currentProjectId = null;
    state.currentSelectionPath = null;
    renderHome();
    return;
  }

  state.currentProjectId = projectId;

  if (selectedPath && state.nodeByPath.has(selectedPath)) {
    state.currentSelectionPath = selectedPath;
    ensureExpandedForPath(selectedPath);
  } else {
    state.currentSelectionPath = project.path;
    state.expanded.add(project.path);
  }

  renderProject(project);
}

function renderHome() {
  appEl.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "home-grid";

  for (const project of state.manifest.projects) {
    const fragment = projectCardTemplate.content.cloneNode(true);
    const button = fragment.querySelector(".project-card");
    fragment.querySelector(".project-name").textContent = project.name;
    fragment.querySelector(".project-meta").textContent = `${project.fileCount} files • ${project.dirCount} folders`;
    button.addEventListener("click", () => {
      setRoute(project.id, project.path);
    });
    grid.appendChild(fragment);
  }

  if (state.manifest.projects.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty panel";
    empty.textContent = "No projects found in content/projects. Use sync:vault, then build again.";
    appEl.appendChild(empty);
    return;
  }

  appEl.appendChild(grid);
}

function makeTreeNode(node, depth = 0) {
  const wrapper = document.createElement("div");
  wrapper.className = "tree";

  const row = document.createElement("div");
  row.className = "tree-row";
  row.style.paddingLeft = `${depth * 14}px`;

  if (node.type === "dir") {
    const isExpanded = state.expanded.has(node.path);

    const twisty = document.createElement("button");
    twisty.className = "twisty";
    twisty.type = "button";
    twisty.textContent = isExpanded ? "▾" : "▸";
    twisty.addEventListener("click", () => {
      if (state.expanded.has(node.path)) {
        state.expanded.delete(node.path);
      } else {
        state.expanded.add(node.path);
      }
      renderProject(getProject(state.currentProjectId));
    });
    row.appendChild(twisty);

    const btn = document.createElement("button");
    btn.className = `tree-btn ${state.currentSelectionPath === node.path ? "active" : ""}`;
    btn.type = "button";
    btn.textContent = `📁 ${node.name}`;
    btn.title = node.path;
    btn.addEventListener("click", () => {
      state.expanded.add(node.path);
      setRoute(state.currentProjectId, node.path);
    });

    row.appendChild(btn);
    wrapper.appendChild(row);

    if (isExpanded) {
      const childrenWrap = document.createElement("div");
      childrenWrap.className = "tree-children";
      for (const child of node.children || []) {
        childrenWrap.appendChild(makeTreeNode(child, depth + 1));
      }
      wrapper.appendChild(childrenWrap);
    }

    return wrapper;
  }

  const spacer = document.createElement("span");
  spacer.style.width = "20px";
  row.appendChild(spacer);

  const fileBtn = document.createElement("button");
  fileBtn.className = `tree-btn ${state.currentSelectionPath === node.path ? "active" : ""}`;
  fileBtn.type = "button";
  fileBtn.textContent = `📄 ${node.name}`;
  fileBtn.title = node.path;
  fileBtn.addEventListener("click", () => {
    setRoute(state.currentProjectId, node.path);
  });
  row.appendChild(fileBtn);
  wrapper.appendChild(row);

  return wrapper;
}

async function renderFilePreview(node, bodyEl) {
  const fileUrl = `content/${node.path}`;

  const toolbar = document.createElement("div");
  toolbar.className = "file-toolbar";

  const openLink = document.createElement("a");
  openLink.className = "btn";
  openLink.href = fileUrl;
  openLink.target = "_blank";
  openLink.rel = "noopener noreferrer";
  openLink.textContent = "Open in new tab";
  toolbar.appendChild(openLink);

  bodyEl.appendChild(toolbar);

  if (node.ext === "html") {
    const iframe = document.createElement("iframe");
    iframe.className = "preview";
    iframe.src = fileUrl;
    iframe.title = node.path;
    bodyEl.appendChild(iframe);
    return;
  }

  if (["md", "txt", "json"].includes(node.ext)) {
    const res = await fetch(fileUrl);
    if (!res.ok) {
      const errorEl = document.createElement("div");
      errorEl.className = "empty";
      errorEl.textContent = `Unable to load ${node.path}`;
      bodyEl.appendChild(errorEl);
      return;
    }

    const text = await res.text();
    const pre = document.createElement("pre");
    pre.className = "source";
    pre.textContent = text;
    bodyEl.appendChild(pre);
    return;
  }

  const fallback = document.createElement("div");
  fallback.className = "empty";
  fallback.textContent = `Preview not available for .${node.ext || "unknown"}. Use “Open in new tab”.`;
  bodyEl.appendChild(fallback);
}

function renderFolderInfo(node, bodyEl) {
  const chip = document.createElement("div");
  chip.className = "folder-chip";
  chip.textContent = `Folder: ${node.path}`;
  bodyEl.appendChild(chip);

  const empty = document.createElement("div");
  empty.className = "empty";
  empty.textContent = "Select a file from the left tree to preview it. Nested folders are fully supported.";
  bodyEl.appendChild(empty);
}

function renderProject(project) {
  appEl.innerHTML = "";

  const workspace = document.createElement("section");
  workspace.className = "workspace";

  const sidebar = document.createElement("aside");
  sidebar.className = "panel sidebar";
  sidebar.appendChild(makeTreeNode(project.tree, 0));

  const viewer = document.createElement("section");
  viewer.className = "panel viewer";

  const head = document.createElement("div");
  head.className = "viewer-head";

  const title = document.createElement("p");
  title.className = "viewer-title";
  title.textContent = state.currentSelectionPath || project.path;
  head.appendChild(title);

  const body = document.createElement("div");
  body.className = "viewer-body";

  const selectedNode = state.nodeByPath.get(state.currentSelectionPath) || project.tree;

  if (selectedNode.type === "file") {
    renderFilePreview(selectedNode, body);
  } else {
    renderFolderInfo(selectedNode, body);
  }

  viewer.appendChild(head);
  viewer.appendChild(body);

  workspace.appendChild(sidebar);
  workspace.appendChild(viewer);
  appEl.appendChild(workspace);
}

async function init() {
  const res = await fetch("manifest.json", { cache: "no-store" });
  if (!res.ok) {
    appEl.innerHTML = '<div class="empty panel">Failed to load manifest.json. Run build first.</div>';
    return;
  }

  state.manifest = await res.json();
  buildNodeMap();

  generatedAtEl.textContent = `Generated: ${formatDate(state.manifest.generatedAt)}`;

  homeBtn.addEventListener("click", () => {
    setRoute(null);
  });

  window.addEventListener("hashchange", applyRoute);
  applyRoute();
}

init();
