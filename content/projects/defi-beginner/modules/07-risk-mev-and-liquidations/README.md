# Module 07: Risk, MEV, and Liquidations

## Objective

Understand adversarial execution and why protocol safety is market-microstructure dependent.

## First Principles

- MEV is value from transaction ordering and inclusion control.
- Oracle lag + thin liquidity = extractable liquidation/arbitrage opportunities.
- Protocol safety depends on keeper competition and blockspace conditions.

## Worked Example

A large liquidation is profitable only if:
- Discount value > gas + slippage + failed bid risk
- Competing searchers do not outbid via priority fees

If keeper latency increases, bad debt probability rises.

## Risk Checklist

- Oracle source and heartbeat
- Maximum per-block liquidation capacity
- Circuit breaker semantics
- Pause governance and timelock security

## Exercises

1. Model sandwich attack around a large AMM swap.
2. Estimate liquidation throughput needed in 30% drawdown.
3. Design safer oracle fallback ladder.

## Visual

- [Open visual explainer](./visual.html)

## Beginner-First Additions

- Deep Dive: `./deep-dive.html`
- Visual Summary: `./visual.html`
- Global Glossary: `../../foundations/first-principles-glossary.html`
