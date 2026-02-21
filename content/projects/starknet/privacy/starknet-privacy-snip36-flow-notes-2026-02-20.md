# Starknet Privacy + SNIP-36 Linking Notes

**Date:** 2026-02-20  
**Folder:** `[redacted-local-path]`

## Outputs generated

1. `starknet-privacy-snip36-end-to-end-flow-2026-02-20.html`
2. `starknet-privacy-snip36-flow-notes-2026-02-20.md` (this file)

## What this links

- Local deep-dive deck and markdown define privacy architecture primitives:
  - note commitments
  - nullifiers
  - client-side S-Two proving
  - paymaster gas privacy
  - viewing keys and threshold audit concepts
- SNIP-36 draft defines how off-chain S-Two proof artifacts attach to Starknet transactions and are verified in protocol path.

## Key integration mapping

- **Privacy pool tx execution** remains contract logic (nullifier checks + new commitments insertion).
- **SNIP-36 fields** carry proof context:
  - `proof` for sequencer/gateway verification path
  - `proof_facts` for contract-facing, syscall-readable facts (`get_execution_info_v3`)
- **Phase-1 trust model** from draft is explicitly highlighted as consensus-verified transitional mode.

## Atlas support for `.md`

Atlas already supports `.md` preview in the viewer. No additional code changes are required for markdown rendering support in the current setup.

## Local-only hosting plan (no push)

- Sync local Starknet folder into Atlas content:

```bash
cd [redacted-local-path]
npm run sync:local -- --project starknet --source [redacted-local-path] --types html,md --clean
npm run build
```

- Serve locally only:

```bash
cd [redacted-local-path]
npx serve dist -l 4173
```

Then open `http://localhost:4173` and navigate to project `starknet`.
