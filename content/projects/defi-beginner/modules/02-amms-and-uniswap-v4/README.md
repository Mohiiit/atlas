# Module 02: AMMs and Uniswap v4

## Objective

Understand AMMs from curve geometry to Uniswap v4 hook-based customization.

## First Principles

- AMM is automated quote function + inventory management rule.
- LPs are short volatility and long fee flow.
- Price impact is path along curve; arbitrage re-anchors to external price.

## Uniswap Evolution

- v2: constant product (`x*y=k`), full-range liquidity
- v3: concentrated liquidity (piecewise curves), LP as active allocator
- v4: singleton architecture + hooks + flash accounting + native ETH support

## Worked Example (CPMM)

Pool starts with 1,000 ETH and 2,000,000 USDC.
- Initial mid price: 2,000 USDC/ETH
- Trader buys 10 ETH from pool
- New ETH reserve: 990
- New USDC reserve: `k/990 = (1,000*2,000,000)/990 = 2,020,202`
- Trader pays about 20,202 USDC (before fees)

Interpretation: average execution > mid price because of curve convexity (slippage).

## Uniswap v4 Hook Questions

1. What state can the hook mutate before/after swap?
2. Is fee logic deterministic and manipulation resistant?
3. Does hook logic create reentrancy or griefing surface?
4. Can custom accounting violate LP expectations?

## Exercises

1. Simulate fee revenue vs impermanent loss in range-bound vs trending market.
2. Design a dynamic fee hook that increases fee during volatility spikes.
3. Compare same strategy under v3 and v4 custom fee logic.

## Visual

- [Open visual explainer](./visual.html)

## Beginner-First Additions

- Deep Dive: `./deep-dive.html`
- Visual Summary: `./visual.html`
- Global Glossary: `../../foundations/first-principles-glossary.html`
