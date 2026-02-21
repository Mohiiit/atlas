# Module 02 Coursebook: AMMs and Uniswap v4 from First Principles

## Why this topic exists

Traders need immediate execution without waiting for direct counterparties. AMMs solve this by using pooled liquidity and deterministic pricing rules.

This module teaches three layers:

1. AMM intuition and math
2. LP economics
3. Why Uniswap v4 changes design space (and risks)

## Term unpacking

### AMM
Automated market maker: smart contract that quotes prices from pool state.

### Pool reserves
Quantities of assets in pool (e.g., ETH and USDC).

### Constant product
Simple rule <code>x * y = k</code>.

### Slippage
Execution worse than initial quote because trade moves pool state.

### LP
Liquidity provider depositing assets and earning fees.

### Impermanent loss
Underperformance vs holding assets passively, due to inventory rebalancing path.

### Hook (v4)
Custom plugin-like logic before/after core actions.

## Running example

Pool state:

- ETH reserve: 1,000
- USDC reserve: 2,000,000
- k = 2,000,000,000

Maya buys ETH with USDC.

## Mechanism walkthrough

1. Maya sends swap transaction.
2. Pool computes new reserves from formula + fee logic.
3. Maya receives ETH out.
4. Pool price shifts.
5. Arbitrageurs compare with external markets and trade if profitable.

## Numerical example A: slippage math

Maya buys 10 ETH.

- New ETH reserve = 990
- New USDC reserve = k/990 = 2,020,202 (approx)
- USDC paid = 20,202 (before fee)

Average paid per ETH ~2,020 vs initial 2,000.

## Numerical example B: larger trade

If Maya buys 100 ETH instead:

- New ETH reserve = 900
- New USDC reserve = 2,222,222
- USDC paid ~222,222

Average price ~2,222/ETH.

Much worse than initial quote. Bigger trade fraction => bigger slippage.

## Numerical example C: LP side

Assume total daily volume high and fee tier 0.3%.

- Fee revenue rises with volume.
- But if market trends strongly in one direction, LP inventory rebalances and may underperform holding.

LP outcome = fee income - inventory drag (+/- depending on path).

## Uniswap v2 vs v3 vs v4

### v2
Simple full-range pool.

### v3
Concentrated liquidity ranges; higher capital efficiency, higher management complexity.

### v4
Adds hooks, singleton architecture, flash accounting.

Interpretation for beginners: v4 is an extensibility platform, not automatically better execution.

## Misconceptions

### "High fee tier means LP always better"
No. Toxic flow and volatility path can dominate fee gains.

### "Hook = guaranteed innovation upside"
No. Hooks can introduce new attack and complexity surfaces.

## Failure simulations

### Simulation 1: dynamic fee hook manipulation

If hook raises fees based on a manipulable short-window metric, attacker may force metric spikes and exploit routing behavior.

### Simulation 2: thin liquidity + large order

Execution deteriorates, arbitrage drains value, users get poor fills.

## Practical protocol checklist

1. Depth at relevant trade sizes?
2. Fee model deterministic and robust?
3. For v4 pools: hook audit quality and behavior clarity?
4. Historical slippage distribution by market regime?

## Explain-it-back Q&A

1. Why does slippage happen in AMMs?
- Trade changes reserves; quote moves along formula curve.

2. Who brings pool price back to market price?
- Arbitrageurs.

3. Why can LP lose despite earning fees?
- Inventory path can hurt more than fee income in some regimes.

4. What is the core promise of v4 hooks?
- Customizable behavior around core pool actions.

5. What is the core risk of v4 hooks?
- More complex logic surfaces for bugs or economic exploits.

## Bridge to Module 03

Now we move from trading pools to lending pools. Both are shared liquidity systems, but lending adds explicit debt, interest curves, and solvency accounting.
