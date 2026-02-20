---
name: atlas-publish-visuals
description: Sync local HTML visuals into the Atlas repository and push updates to GitHub Pages. Use when the user asks to publish, sync, or deploy visual diagrams/case studies to Atlas.
---

# Atlas Publish Visuals

## When to use

Use this skill when the user asks to:
- push visuals to Atlas
- sync new HTML diagrams/case studies
- deploy updated project visuals to the hosted site

## Canonical command

Run from the Atlas repository:

```bash
cd <atlas_repo_path>
npm run publish:visuals -- --source <local_projects_root> --projects <project_csv> --types html --clean --message "content: sync visuals"
```

## Examples

Sync two projects and push:

```bash
cd <atlas_repo_path>
npm run publish:visuals -- --source /path/to/local/projects-root --projects Madara,yapcode --types html --clean --message "content: sync visuals"
```

Sync all top-level project folders under the source root and push:

```bash
cd <atlas_repo_path>
npm run publish:visuals -- --source /path/to/local/projects-root --types html --clean --message "content: sync visuals"
```

## Safe variants

Stage and build without creating a commit:

```bash
npm run publish:visuals -- --source <local_projects_root> --projects <project_csv> --types html --clean --no-commit --no-push
```

Sync only (no build/commit/push):

```bash
npm run publish:visuals -- --source <local_projects_root> --projects <project_csv> --types html --clean --dry-run
```

## Post-push verification

Check GitHub Actions Pages deploy:

```bash
gh run list --repo <owner>/atlas --limit 1
gh run watch <run_id> --repo <owner>/atlas --exit-status
```

Then verify site and manifest:

```bash
curl -I -L https://<owner>.github.io/atlas/
curl -s https://<owner>.github.io/atlas/manifest.json
```
