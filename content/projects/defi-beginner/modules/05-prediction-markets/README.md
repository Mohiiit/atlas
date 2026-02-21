# Module 05: Prediction Markets

## Objective

Understand price-as-probability markets and resolution/oracle trust boundaries.

## First Principles

- Binary market price approximates implied probability under assumptions.
- Liquidity mechanism can be orderbook, AMM, or market-maker algorithm.
- Market quality depends on resolution clarity and manipulation resistance.
- Oracle/dispute process is the real trust anchor.

## Worked Example

Market: "Will ETH ETF inflows exceed X by date Y?"
- YES share trades at 0.63
- Implied probability approximately 63%
- Buy 1,000 YES costs 630
- If YES resolves true: payout 1,000
- Expected edge requires your true probability estimate > 63% after fees

## Design Tradeoffs

- Fast resolution vs robust dispute window
- High liquidity incentives vs wash-trading risk
- Compliance constraints vs open participation

## Exercises

1. Draft a resolution specification that minimizes ambiguity.
2. Model EV for trader with 70% belief at market price 0.63.
3. List manipulation vectors near market close.

## Visual

- [Open visual explainer](./visual.html)

## Beginner-First Additions

- Deep Dive: `./deep-dive.html`
- Visual Summary: `./visual.html`
- Global Glossary: `../../foundations/first-principles-glossary.html`
