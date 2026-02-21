# Module 04: Perps from First Principles

## Objective

Understand perpetual swaps as continuous futures with funding-based anchoring.

## First Principles

- Perp = synthetic forward with no expiry.
- Mark price drives PnL and liquidation.
- Funding payment aligns perp price to index/spot.
- Margin system controls leverage and insolvency risk.

## Core Math

- Position notional = size * mark price
- Unrealized PnL (long) = size * (mark - entry)
- Equity = collateral + unrealized PnL - fees
- Maintenance margin test triggers liquidation

## Worked Example

Long 1 BTC perp at 60,000 with 6,000 collateral (10x).
- If price drops to 57,000, PnL = -3,000
- Equity = 3,000
- If maintenance margin requires 3,500, position is liquidatable

Funding example:
- Funding = +0.01% (longs pay shorts) every 8h
- Notional 60,000 -> payment 6 per interval

## Architecture Patterns

- vAMM/perp-AMM (inventory risk in pool)
- CLOB with offchain matching + onchain settlement
- Hybrid RFQ/keeper models

## Exercises

1. Compare liquidation trajectories at 5x, 10x, 20x.
2. Simulate funding when perp trades at premium for 3 days.
3. Analyze insurance fund depletion scenario.

## Visual

- [Open visual explainer](./visual.html)

## Beginner-First Additions

- Deep Dive: `./deep-dive.html`
- Visual Summary: `./visual.html`
- Global Glossary: `../../foundations/first-principles-glossary.html`
