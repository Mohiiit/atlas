# Module 03: Lending and Stablecoins

## Objective

Understand overcollateralized lending and stablecoin mechanism design.

## First Principles

- Lending protocol is pooled balance sheet + risk engine.
- Utilization controls variable borrow rate.
- Liquidation converts collateral volatility into transfer of position ownership.
- Stablecoin design is about peg defense under stress.

## Protocol Archetypes

- Aave-style pooled lending
- Maker/Sky vault-based debt issuance (DAI/USDS style)
- Curve lending and crvUSD LLAMMA-style liquidation bands (study conceptually)

## Worked Example (Utilization)

Pool supply = 100M USDC, borrowed = 80M.
- Utilization = 80%
- If rate model has kink at 85%, borrow APR increases sharply past 85%
- At 95% utilization, borrowers pay much higher rate, incentivizing repayment or new supply

## Stablecoin Stress Test

Assume collateral drops 25% in 2 hours.
- Can liquidators absorb volume?
- Is oracle update timely?
- Is protocol backstop enough to prevent bad debt?

## Exercises

1. Build a simple borrow-rate curve with kink and test equilibrium utilization.
2. Compare liquidation penalty effects on borrower behavior.
3. Write failure analysis for a hypothetical depeg event.

## Visual

- [Open visual explainer](./visual.html)

## Beginner-First Additions

- Deep Dive: `./deep-dive.html`
- Visual Summary: `./visual.html`
- Global Glossary: `../../foundations/first-principles-glossary.html`
