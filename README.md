# Karnot Atlas

Static GitHub Pages site for browsing project knowledge (research, architecture, topics, case studies) with support for deeply nested folders.

## Why this exists

- Host static HTML diagrams and writeups from Karnot Vault.
- Keep one homepage for many projects (`yapcode`, `madara`, etc.).
- Support arbitrary nested structure per project:
  - `research/`
  - `architecture/`
  - `topic/`
  - deeper folders as needed.

## Structure

- `content/projects/<project-name>/...` → all hosted files
- `scripts/sync-from-vault.mjs` → copy files from local Karnot Vault into `content/projects`
- `scripts/build-site.mjs` → generate `dist/` and recursive `manifest.json`
- `static/` → frontend app (`index.html`, `app.js`, `styles.css`)

## Quick start

```bash
npm install
npm run sync:vault -- --project yapcode --types html
npm run build
```

Then open `dist/index.html` or run:

```bash
npm run dev
```

## Sync from Karnot Vault

Defaults:
- vault root: `/Users/mohit/Desktop/karnot-vault`
- destination: `content/projects/<project>`

Example:

```bash
npm run sync:vault -- --project yapcode --types html --clean
```

Options:
- `--project <name>` (required)
- `--vault <path>` (optional)
- `--types <csv>` default: `html,md,pdf,png,jpg,jpeg,svg`
- `--clean` remove destination before syncing

## Deploy

GitHub Actions workflow at `.github/workflows/deploy-pages.yml` builds and deploys to GitHub Pages on pushes to `main`.
