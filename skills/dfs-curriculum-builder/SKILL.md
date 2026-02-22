---
name: dfs-curriculum-builder
description: Build first-principles curricula by recursively expanding prerequisites (DFS/BFS) until a configurable baseline (default: high-school) is reached.
---

# DFS Curriculum Builder

A deterministic workflow for producing deep, teachable curricula from any topic.

Use this when the user asks for:
- first-principles curriculum
- prerequisite expansion
- DFS/BFS learning map
- "teach me everything needed to understand X"

## 1) Agent Invocation Contract

When another agent calls this skill, require or infer these fields:

- `target_topics`: list of final goals (example: `understand push0 claims`)
- `learner_profile`: beginner/intermediate/advanced + known strengths
- `stop_baseline`: where recursion stops (default: `high_school`)
- `excluded_scope`: topics to keep shallow or skip
- `delivery_format`: `html` / `markdown` / `mixed`
- `depth_budget`: optional (example: `short`, `standard`, `deep`)
- `time_budget`: optional total weeks or hours

If fields are missing, apply defaults and state assumptions explicitly.

## 2) Output Guarantees

This skill must always produce all of the following:

1. A dependency graph summary (topics + prerequisite edges).
2. A module order that follows prerequisite constraints.
3. Explicit stop-condition list (`assumed baseline topics`).
4. For each module:
- why this module exists
- term unpacking (plain language first)
- lessons/subtopics
- worked examples
- failure modes/misconceptions
- exercises + short answer key
- curated resources
5. A capstone path and completion criteria.

## 3) Core Algorithm (Deterministic)

### Step A: Normalize goal
- Convert user request into one or more target nodes `T`.
- Example: `T = evaluate push0 real-time proving claims`.

### Step B: Expand prerequisites (DFS default)
For each node `N`:
1. Enumerate direct prerequisites `P(N)`.
2. For each `p in P(N)`:
- If `p` is at/under stop baseline -> mark `assumed`.
- Else recurse into `p`.
3. Record edge `N -> p`.

### Step C: Deduplicate and classify
- Merge repeated nodes.
- Classify each node as:
- `teach` (must fully teach)
- `refresh` (known but rusty)
- `assumed` (below stop baseline)

### Step D: Module construction
- Topologically sort graph.
- Group adjacent nodes by conceptual coherence.
- Ensure each module has practical outcomes, not only theory.

### Step E: Pedagogical expansion
For each module, include:
- one running example (reused across modules where possible)
- at least one quantitative example
- at least one break/failure case
- explicit "how this connects to target topic"

### Step F: Quality validation
Run quality gates (Section 7) before finalizing.

## 4) Baseline Stop Rules

Default stop baseline: `high_school`.

Treat as **assumed** unless user says otherwise:
- algebraic manipulation
- basic functions/graphs
- basic probability intuition
- reading tables/charts
- basic computing terms (input/output/runtime)

Do **not** assume:
- finite fields
- asymptotic tradeoff interpretation in papers
- cryptographic security definitions
- distributed systems consistency semantics

## 5) BFS vs DFS Guidance

- Use `DFS` when user wants deep first-principles mastery.
- Use `BFS` when user wants broad landscape first.
- Hybrid strategy:
1. BFS for top-level map.
2. DFS for each critical branch.

If user says "DFS/BFS whichever works," default to hybrid.

## 6) Resource Policy

Prioritize sources in this order:
1. primary papers/specs/docs
2. official project documentation
3. high-quality educational bridges

Rules:
- avoid duplicate resources serving the same role
- prefer one canonical source per concept
- label each resource as `primary`, `bridge`, or `practice`
- for volatile claims, verify links and dates

## 7) Mandatory Quality Gates

A curriculum is not complete unless all pass:

- every non-assumed technical term has a nearby definition
- each module includes at least one worked example
- each module includes at least one failure mode
- module sequence obeys prerequisites
- claim-vs-evidence is explicit for research-heavy modules
- learner can answer "why this module exists" for each module

## 8) Multi-Agent Handoff Format

When returning output to another agent, include this compact machine-usable summary:

```yaml
curriculum_meta:
  strategy: dfs|bfs|hybrid
  stop_baseline: high_school
  target_topics:
    - ...
  assumed_topics:
    - ...
  module_count: N
modules:
  - id: M0
    title: ...
    prerequisites: [..]
    outcomes: [..]
    resources:
      - {title: ..., type: primary|bridge|practice, url: ...}
quality_gates:
  passed: true|false
  failures: []
```

Also include human-readable pages/files if requested by user.

## 9) Authoring Template Per Module

Use this template exactly for consistency:

1. `Why this module exists`
2. `Prerequisites`
3. `Term unpacking`
4. `Mechanism walkthrough`
5. `Worked examples`
6. `Failure modes and misconceptions`
7. `Exercises`
8. `Answer key`
9. `Resources`
10. `Bridge to next module`

## 10) Handling User Strengths and Exclusions

If user states strengths (example: observability/Grafana/Prometheus), mark related branches as `refresh` and reduce depth there.
Shift depth budget into weaker branches.

If user excludes a branch, still include a one-paragraph dependency note explaining why it is being skipped.

## 11) Practical Defaults

If user gives no budgets:
- `strategy = hybrid`
- `depth_budget = deep`
- `time_budget = 12-16 weeks`
- `delivery_format = html + concise index`

## 12) Common Failure Patterns (avoid)

- term dumping without definitions
- resource spam with no role labels
- module order violating prerequisites
- no explicit stop condition
- no exercises/answer keys
- confusing system performance claims with full end-to-end guarantees

## 13) Success Criterion

The curriculum is successful when a learner can:
- explain target topic from first principles,
- identify hidden assumptions in claims,
- and design or critique a concrete implementation path.
