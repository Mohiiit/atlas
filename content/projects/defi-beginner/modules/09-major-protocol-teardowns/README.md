# Module 09: Major Protocol Teardowns (Current Focus)

## Objective

Integrate prior modules by dissecting leading live protocols.

## Teardown Targets

- AMM/Dex: Uniswap v4 (core), Curve, Balancer
- Lending/stables: Aave, Maker/Sky, Morpho
- Perps: Hyperliquid, dYdX, GMX
- Prediction markets: Polymarket, Augur-style models
- Restaking / shared security: EigenLayer (risk transfer lens)

## Uniswap v4 Focus Questions

1. How do hooks alter swap lifecycle and LP economics?
2. What new attack surfaces appear with arbitrary hook logic?
3. Which strategies become possible that were hard in v3?

## Perp Market Focus Questions

1. Matching model: orderbook vs AMM vs hybrid?
2. Margining and liquidation speed under stress?
3. Insurance/backstop design and socialized loss policy?

## Prediction Market Focus Questions

1. Is market question precise and non-gameable?
2. How is truth resolved and challenged?
3. Are incentives robust near resolution deadline?

## Capstone Deliverables

For each of the 3 focus areas (Uniswap v4, perps, prediction):
- 2-page mechanism memo
- State transition diagram
- Failure mode table
- Improvement proposal

## Visual

- [Open visual explainer](./visual.html)

## Beginner-First Additions

- Deep Dive: `./deep-dive.html`
- Visual Summary: `./visual.html`
- Global Glossary: `../../foundations/first-principles-glossary.html`
