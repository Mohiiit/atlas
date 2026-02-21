# Module 07 Coursebook: MEV, Execution Risk, and Liquidation Capacity

## Problem statement

Protocol formulas may be correct, yet users and system can still lose due to adversarial transaction ordering and congestion.

## Terms

- **MEV**: value extracted from transaction ordering control.
- **Sandwich**: pre-trade + post-trade extraction around victim order.
- **Backrun**: post-event arbitrage capture.
- **Keeper**: actor executing liquidations.
- **Throughput**: risk that can be unwound per time unit.

## Running example

Maya places large swap; Arjun is near liquidation; volatility spikes.

## Mechanism

1. Tx enters mempool.
2. Searchers simulate opportunities.
3. Builders order bundles.
4. Keepers race liquidations.
5. Solvency depends on risk-off throughput.

## Numerical examples

A) Sandwich adds 1.7% execution cost to Maya.

B) Required liquidation 50M, capacity drops from 8M to 3M per block-equivalent under congestion.

C) Backlog duration increases expected bad debt under continued adverse moves.

## Misconceptions

- "No code bug => safe outcomes" -> false.

## Failure simulations

- Keeper infrastructure failure.
- Oracle lag + congestion combo.

## Checklist

1. Measured liquidation latency under load?
2. Failed liquidation rate?
3. Anti-MEV protections for users?

## Explain-it-back

1. Why does ordering matter?
- It reallocates value among participants and can degrade fairness.
2. Why is throughput a solvency variable?
- Risk must be removed before collateral decays further.
3. Can protocol look healthy in calm regime but fail in stress?
- Yes, if stress-path execution assumptions are weak.
