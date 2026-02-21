# Module 00: Orientation - How to Think About DeFi

## Objective

Build the mental model: every protocol is a programmable market with state, constraints, and incentives.

## First Principles

- State: balances, debt, collateral, LP positions, open interest.
- Transition function: what actions can mutate state (`swap`, `borrow`, `liquidate`, `settle`).
- Invariants: things that should hold (`x*y=k` approximation in CPMM, health factor >= 1 for solvency).
- Adversary model: MEV searchers, toxic flow, oracle lag, governance capture.
- Settlement truth: what is finalized onchain vs trusted offchain.

## Worked Example

If a protocol claims "market neutral yield", ask:
1. Who is paying that yield (explicit fee, inflation, basis trade)?
2. Under what state transition can yield turn negative?
3. Which oracle or accounting delay can hide losses?

## Deliverable

Write a one-page "protocol x-ray" for any DeFi app:
- State variables
- Action set
- Invariants
- Revenue path
- Blow-up path

## Visual

- [Open visual explainer](./visual.html)

## Beginner-First Additions

- Deep Dive: `./deep-dive.html`
- Visual Summary: `./visual.html`
- Global Glossary: `../../foundations/first-principles-glossary.html`
