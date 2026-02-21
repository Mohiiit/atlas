# Module 01: Money, Ledger, and Settlement

## Objective

Understand DeFi as programmable clearing and collateralized settlement.

## First Principles

- Token is ledger entry + transfer rules.
- Value transfer is settlement plus finality assumptions.
- Collateral turns credit risk into liquidation risk.
- Time matters: block latency changes liquidation and arbitrage dynamics.

## Core Concepts

- Spot vs derivative claim
- Custody vs non-custody
- Netting and margining
- Oracle-mediated settlement

## Worked Example

Alice posts 150 USDC to mint 100 synthetic dollars.
- Collateral ratio = 150%
- If collateral falls to 120 USDC, ratio = 120%
- If liquidation threshold is 125%, position is liquidatable

Interpretation: insolvency protection is a function of volatility + oracle lag + liquidation throughput.

## Exercises

1. Model settlement flow for `deposit -> mint -> redeem`.
2. Add a 1-minute oracle delay and identify who can exploit it.
3. Estimate bad debt if liquidations are delayed by 20 blocks.

## Visual

- [Open visual explainer](./visual.html)

## Beginner-First Additions

- Deep Dive: `./deep-dive.html`
- Visual Summary: `./visual.html`
- Global Glossary: `../../foundations/first-principles-glossary.html`
