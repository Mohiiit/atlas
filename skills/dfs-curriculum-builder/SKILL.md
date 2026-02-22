---
name: dfs-curriculum-builder
description: Build first-principles curricula by recursively expanding prerequisites (DFS/BFS) until a configurable baseline (default: high-school) is reached.
---

# DFS Curriculum Builder

## When to use
Use this skill when user asks for:
- "first-principles curriculum"
- "deep learning path"
- "expand prerequisites"
- "DFS/BFS on topics"
- "build study plan for topic X"

## Input contract
Collect these inputs explicitly if missing:
- target topic(s)
- learner baseline (beginner/intermediate/advanced)
- stop condition baseline (default: high-school)
- excluded domains (if any)
- desired output format (html/md/slides)

## Core algorithm
1. Define target node(s) `T`.
2. For each node, list required concepts `P1..Pn`.
3. For each prerequisite `Pi`:
- If `Pi` <= baseline cutoff, mark `assumed`.
- Else recurse into `Pi`.
4. Deduplicate graph nodes; keep edge map.
5. Topologically group into modules.
6. For each non-assumed node, provide:
- why it exists
- plain-language definitions
- mechanism walkthrough
- worked example(s)
- failure modes
- quiz with answers
- primary resources

## Required output sections
- Dependency graph summary
- Module sequence (ordered)
- For each module: goals, prerequisites, lessons, exercises, resources
- Explicit assumed-baseline list
- Progress checkpoints and capstone

## Quality gates
- Every non-assumed technical term has an in-page definition.
- Every module has at least one worked example.
- Every module has at least one failure mode.
- Resource list prioritizes primary sources.
- Clear distinction between "claim" and "evidence" for research-heavy topics.

## Notes
- If user has known strengths (e.g., distributed systems), reduce depth there and spend depth budget on weaker areas.
- Avoid redundant resources; choose one canonical source per concept where possible.
