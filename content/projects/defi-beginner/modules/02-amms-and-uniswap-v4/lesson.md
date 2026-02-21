# Module 02 Coursebook (Ultra-Depth): AMMs and Uniswap v4

## 0. How to read this chapter

If you are new to markets, read in this order:

1. Section 1-3 (intuition + terms)
2. Section 4-6 (math + mechanics)
3. Section 7-10 (v4 specifics + risk)
4. Exercises at the end

If a term feels heavy, pause and jump to the glossary, then return.

---

## 1. Why AMMs exist

### The practical problem

Maya wants to buy ETH right now. In a pure peer-to-peer system, she needs a seller at the same moment and a matching quantity. That is slow and brittle.

AMMs solve this by holding pooled inventory and using deterministic price rules. So trading can happen continuously.

### Real-life analogy

Think of a currency exchange kiosk at an airport.

- It always offers a quote.
- If many people buy one currency, that currency gets more expensive.
- The kiosk manager adjusts rates based on inventory pressure.

An AMM is that kiosk in code form.

---

## 2. Terms you must own before moving on

- **AMM**: automated market maker; smart contract quoting a price from pool state.
- **Pool reserves**: quantities of token A and token B inside pool.
- **Quote price**: instantaneous ratio implied by reserves.
- **Execution price**: average price you actually get for full trade.
- **Slippage**: execution price minus expected quote (in either direction).
- **LP (liquidity provider)**: deposits both assets, earns fees, takes inventory risk.
- **Arbitrageur**: trader who profits from price differences across venues, helping align AMM to broader market.
- **Fee tier**: trading fee charged per swap.
- **Hook (Uniswap v4)**: custom logic around core pool actions.

---

## 3. Running scenario setup

We keep one scenario through this chapter:

- Pool starts with 1,000 ETH and 2,000,000 USDC.
- Implied mid price = 2,000 USDC/ETH.
- Formula (simplified) is constant product: `x * y = k`.

Maya starts as a trader. Later, she becomes an LP.

---

## 4. Constant product from first principles

### Why this formula

`x * y = k` means product stays constant after each swap (ignoring fees for a moment). If one reserve drops, the other must rise enough to keep product fixed.

This creates a curved price response.

### Price impact intuition

Early units in a swap are cheap relative to later units because each unit changes reserve ratio and pushes price.

So AMMs are not one fixed-price machine; they are a moving-price machine.

---

## 5. Numerical walkthroughs (core)

## Example A: small buy

Initial:

- `x = 1000 ETH`
- `y = 2,000,000 USDC`
- `k = 2,000,000,000`

Maya buys 10 ETH.

- New ETH reserve: 990
- New USDC reserve: `k / 990 = 2,020,202` (approx)
- USDC paid: `20,202`
- Average price: `20,202 / 10 = 2,020.2`

She expected near 2,000 but paid average 2,020.2. That difference is slippage.

## Example B: medium buy

Maya buys 50 ETH from original state.

- New ETH reserve: 950
- New USDC reserve: `k / 950 = 2,105,263`
- USDC paid: 105,263
- Average price: 2,105.26

Bigger trade fraction -> bigger slippage.

## Example C: very large buy

Maya buys 200 ETH from original state.

- New ETH reserve: 800
- New USDC reserve: 2,500,000
- USDC paid: 500,000
- Average price: 2,500

This is a large 25% reserve draw. Slippage explodes.

### Key lesson

Depth matters as much as fee tier. "Low fee" pool with shallow depth can still be expensive in execution.

---

## 6. Adding fees to the picture

Assume 0.3% fee.

In practice, trader input is partially fee-adjusted before reserve update. Fee goes to LPs (plus any protocol fee slice).

For Maya:

- Cost = slippage cost + explicit fee

For LP:

- Revenue = fee inflow
- Risk = inventory path exposure

LP profitability is not same as fee APR headline.

---

## 7. LP economics with the same scenario

Now Maya supplies liquidity instead of trading.

### LP payoff decomposition

LP outcome over period:

1. Fees earned
2. Inventory rebalancing effect
3. External price path

### Regime interpretation

- Range-bound market: fee capture can dominate.
- Strong trend market: inventory effect can dominate negatively.

This is why LP returns must be evaluated by regime, not single averaged APR number.

---

## 8. Uniswap evolution: v2 -> v3 -> v4

## v2

- Full-range liquidity
- Simpler LP behavior

## v3

- Concentrated liquidity ranges
- Higher capital efficiency
- More active position management

## v4

- Singleton architecture
- Hooks around pool actions
- Flash accounting patterns

### Beginner-safe interpretation

v4 does not automatically mean better prices. It means more programmable behavior. Better or worse depends on specific hook design and market conditions.

---

## 9. Hooks in plain language

A hook is custom code called at defined moments (before/after swap or liquidity events).

Possible uses:

- dynamic fees
- custom access checks
- rebate logic
- volatility-aware behavior

Risk implication:

- more custom power
- more failure surface

---

## 10. Advanced worked examples (v4-style thinking)

## Example D: dynamic fee hook

Suppose pool sets:

- 5 bps fee in calm volatility
- 30 bps fee in high volatility

If volatility estimator is robust:

- LPs get compensation during toxic flow windows

If estimator is manipulable:

- attackers can trigger high-fee mode strategically and route around it or exploit user flow

## Example E: router behavior

Two pools offer same tokens:

- Pool A: low fee, thin depth
- Pool B: higher fee, deep depth

For small size, Pool A wins.
For large size, Pool B may win due to lower slippage.

This is why routing must consider full execution curve, not fee alone.

---

## 11. Common beginner mistakes

1. Comparing pools only by fee tier.
2. Treating LP fee APR as guaranteed yield.
3. Assuming any v4 hook is inherently useful.
4. Ignoring execution size when quoting "best price".

---

## 12. Failure simulations

## Simulation 1: liquidity shock

A large LP exits suddenly. Depth halves.

- previously acceptable trade sizes now incur severe slippage
- users routing with stale assumptions overpay

## Simulation 2: hook bug/economic exploit

Hook has edge-case causing unexpected fee outcome.

- traders may be overcharged or undercharged
- LP payouts may deviate from intended economics
- trust and volume can collapse quickly

---

## 13. Protocol teardown checklist for AMMs

1. Depth profile at relevant notional sizes
2. Slippage distribution by time regime
3. LP return decomposition (fees vs inventory effect)
4. Hook security + economic review (for v4)
5. Arbitrage latency after external price jump

---

## 14. Explain-it-back Q&A (with concise answers)

1. Why do AMMs have slippage?
- Because trades alter reserve ratios, moving quotes along a curve.

2. Who keeps AMM prices close to market prices?
- Arbitrageurs.

3. Why is LP yield not equivalent to bank interest?
- LP yield includes active market exposure and path-dependent inventory risk.

4. What does v4 add fundamentally?
- Programmable behavior via hooks around core pool actions.

5. What is the biggest practical trading mistake for beginners?
- Ignoring trade size relative to pool depth.

---

## 15. Bridge to Module 03

AMMs teach pooled inventory and price curves. Next module (lending/stablecoins) uses pooled liquidity too, but now the system tracks debt and solvency thresholds explicitly.
