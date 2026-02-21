# Education Blueprint for Beginner-First DeFi Modules

This blueprint is derived from common structure patterns in beginner-friendly explainers (Coinbase Learn style, Binance Academy style, Ethereum.org explainers, Investopedia term-first pages, Cloudflare Learning Center, Stripe conceptual docs).

## What Works in Beginner Content

1. Start with one-sentence purpose
- "What problem does this solve?"

2. Define terms before using them deeply
- Plain language first
- Technical definition second
- Tiny example third

3. Use one running scenario
- Same people and same numbers throughout
- Reuse scenario in every section

4. Layer depth in this order
- intuition
- mechanics
- math
- edge cases
- risks

5. Add explicit misconception correction
- Example: "Yield is not free return; it is usually payment for taking a specific risk."

6. Add checks for understanding
- 3 to 5 short questions with answers

## Recommended Module Skeleton

1. Why this topic exists (non-crypto analogy)
2. Key terms you must know first
3. Running example setup
4. Step-by-step mechanism flow
5. Numerical walkthrough A (normal case)
6. Numerical walkthrough B (stress case)
7. What can fail (technical + economic)
8. How to evaluate live protocols
9. Mini quiz with answers
10. Summary in 5 bullets

## Term Expansion Rule

Any first use of these must be explained inline:
- collateral
- liquidation
- utilization
- slippage
- LP
- mark price
- funding
- oracle
- MEV
- governance capture

## Language Rule

Avoid introducing these until after AMM basics are clear:
- aggregator
- intent solver
- orderflow abstraction
- composability stack

If used, define in one sentence and show one plain example.

## Depth Rule

For each deep-dive page:
- target 1200 to 2200 words
- at least 2 numerical examples
- at least 1 failure simulation
- at least 1 misconception correction

## Quality Rubric

A module passes only if:
- a non-finance beginner can explain it back in plain words
- every bold term is defined nearby
- running example appears at least 3 times
- learner can answer quiz without external source
