# Module 06: Options and Structured DeFi

## Objective

Understand option payoffs, vault wrappers, and hidden short-vol exposures.

## First Principles

- Option = nonlinear payoff on underlying.
- Sellers collect premium, absorb tail risk.
- Structured products transform payoff shape, not risk elimination.

## Worked Example (Covered Call Vault)

Vault holds 1 ETH and sells monthly call (strike 2,500) for 80 USDC premium.
- If ETH settles at 2,300: keep ETH + 80 premium.
- If ETH settles at 2,900: upside capped near strike; vault underperforms spot rally.

Interpretation: yield is monetized upside sacrifice.

## Protocol Angles

- Ribbon/Theta-like covered call automation
- Lyra/Dopex style option venues
- Onchain vol surface challenges (oracle + liquidity fragmentation)

## Exercises

1. Draw payoff of long call, short call, covered call.
2. Stress test strategy in sharp uptrend and crash.
3. Explain where implied volatility enters premium pricing.

## Visual

- [Open visual explainer](./visual.html)

## Beginner-First Additions

- Deep Dive: `./deep-dive.html`
- Visual Summary: `./visual.html`
- Global Glossary: `../../foundations/first-principles-glossary.html`
