# Atlas

Atlas is an open-source static site for browsing project knowledge with nested folders.

It is designed for teams that want one web UI for:
- project research
- architecture notes
- topic deep-dives
- static HTML case studies and diagrams

## Features

- Multi-project home page (`yapcode`, `madara`, etc.)
- Recursive nested folder support
- In-browser preview for HTML, Markdown, text, and JSON
- Static build output ready for GitHub Pages
- Mobile-friendly file explorer and viewer

## Project Layout

- `content/projects/<project-name>/...`: source content to host
- `scripts/sync-from-local.mjs`: import files from a local source root into `content/projects/<project-name>`
- `scripts/build-site.mjs`: build `dist/` and generate recursive `manifest.json`
- `static/`: frontend app assets (`index.html`, `app.js`, `styles.css`)
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment workflow

## Quick Start

```bash
npm install
npm run sync:local -- --project yapcode --source /path/to/local/content-root --types html --clean
npm run build
```

Open `dist/index.html`, or run:

```bash
npm run dev
```

## Importing Local Content

Example:

```bash
npm run sync:local -- --project madara --source /path/to/local/content-root --types html,md,pdf --clean
```

Options:
- `--project <name>` (required)
- `--source <path>` (required): local root that contains project folders
- `--types <csv>` (optional): default `html,md,pdf,png,jpg,jpeg,svg`
- `--clean` (optional): remove destination before importing

## Publish Visuals (One Command)

Sync visuals from local project folders, rebuild, commit, and push:

```bash
npm run publish:visuals -- --source /path/to/local/content-root --projects Madara,yapcode --types html --clean --message \"content: sync visuals\"
```

Options:
- `--source <path>` (required): local root containing project folders
- `--projects <csv>` (optional): e.g. `Madara,yapcode`; if omitted, syncs all folders under source
- `--types <csv>` (optional): default `html`
- `--clean` (optional): clean destination before sync
- `--no-commit` (optional): stage changes without committing
- `--no-push` (optional): commit but skip push
- `--dry-run` (optional): sync only, skip build/commit/push
- `--message <text>` (optional): commit message

## Agent Skill

This repo includes a reusable skill definition:

- `skills/atlas-publish-visuals/SKILL.md`

Install for Codex:

```bash
mkdir -p ~/.codex/skills/atlas-publish-visuals
cp skills/atlas-publish-visuals/SKILL.md ~/.codex/skills/atlas-publish-visuals/SKILL.md
```

Install for Claude:

```bash
mkdir -p ~/.claude/skills/atlas-publish-visuals
cp skills/atlas-publish-visuals/SKILL.md ~/.claude/skills/atlas-publish-visuals/SKILL.md
```

After install, ask the agent to use `atlas-publish-visuals` to sync and push visuals.

## Deploy

Push to `main` and GitHub Actions deploys `dist/` to GitHub Pages.

## License

MIT. See `LICENSE`.
