# Module 09 Coursebook: A Repeatable Teardown Method for Major Protocols

## Problem statement

You need a consistent way to compare protocols without marketing bias.

## Teardown terms

- **State map**
- **Action map**
- **Invariant map**
- **PnL map**
- **Trust map**

## Running application

Apply same template to:

1. Uniswap v4
2. Perp venue
3. Prediction market venue

## Workflow

1. List state variables.
2. List state transitions.
3. Write invariants + break conditions.
4. Trace normal cash flows.
5. Simulate stress.
6. Document governance override paths.

## Example A (Uniswap v4)

- State: reserves, LP positions, hook state
- Break lens: hook-induced economic exploit

## Example B (Perps)

- State: open interest, margins, insurance
- Break lens: liquidation backlog + insurance depletion

## Example C (Prediction markets)

- State: order depth, open claims, dispute status
- Break lens: ambiguous resolution + low-depth manipulation

## Misconceptions

- "Highest volume protocol is best" -> robustness and governance quality matter more in stress.

## Failure simulations

- Oracle quality shock
- Execution congestion shock
- Governance intervention shock

## Deliverable template

- 2-page memo
- state-transition diagram
- failure table with mitigation
- one improvement proposal

## Explain-it-back

1. Why standard template?
- Ensures comparable, less-biased analysis.
2. Why include trust map?
- Offchain dependencies often dominate failure path.
3. Why stress simulation mandatory?
- Calm-regime metrics hide fragility.
