# Module 04 Coursebook (Ultra-Depth): Perpetual Markets from First Principles

## 0. Reading plan

If derivatives are new to you:

1. Read sections 1-4 for intuition.
2. Read sections 5-8 for numeric mechanics.
3. Read sections 9-13 for stress behavior.
4. Do exercises.

---

## 1. Why perps exist

Traders want leveraged exposure without expiry rollover complexity.

Perpetual futures provide this:

- no expiry date
- continuous mark-to-market
- funding transfer mechanism to keep price near spot

---

## 2. Terms in plain language

- **Leverage**: how many dollars of exposure per dollar of collateral.
- **Collateral (margin)**: capital buffer backing position.
- **Notional**: position size in dollar terms.
- **Mark price**: reference used for PnL and risk checks.
- **Funding rate**: periodic transfer between longs and shorts.
- **Maintenance margin**: minimum equity to avoid forced closure.
- **Liquidation**: forced position reduction/closure.
- **Insurance fund**: buffer that absorbs liquidation shortfalls.
- **ADL**: auto-deleveraging when losses exceed standard buffers.

---

## 3. Running scenario

Maya opens long BTC perp:

- Entry: 60,000
- Size: 1 BTC
- Collateral: 6,000
- Leverage: 10x
- Maintenance threshold: 3,500 equity

---

## 4. Core mechanism loop

1. Position opened with collateral.
2. Mark price updates.
3. Unrealized PnL updates.
4. Equity recalculated.
5. If equity < maintenance -> liquidation path.
6. If liquidation shortfall -> insurance absorbs.
7. If insurance insufficient -> ADL/socialized mechanisms.

---

## 5. Base equations

- `notional = size * mark`
- `uPnL_long = size * (mark - entry)`
- `equity = collateral + uPnL - fees - funding`

These three equations power most risk decisions.

---

## 6. Numerical example A: mild adverse move

Price: 60,000 -> 58,500

- uPnL = -1,500
- equity = 6,000 - 1,500 = 4,500

Still above 3,500 maintenance, no liquidation.

## 7. Numerical example B: liquidation trigger

Price: 60,000 -> 57,000

- uPnL = -3,000
- equity = 3,000

Below maintenance (3,500), liquidation can trigger.

## 8. Numerical example C: funding drag

Funding = +0.01% each 8h, notional 60,000.

- per interval = 6
- 90 intervals (~30 days) = 540

If price is flat, funding alone can push account closer to liquidation over time.

---

## 9. Why mark price matters

Using last traded price alone is manipulable in thin moments.

Mark/index designs try to reduce manipulation risk, but introduce dependency on oracle/index integrity.

---

## 10. Leverage sensitivity table

Approximate adverse move to lose 50% collateral (ignoring funding/fees):

- 5x: ~10%
- 10x: ~5%
- 20x: ~2.5%

Leverage compresses survival room dramatically.

---

## 11. Common beginner mistakes

1. Thinking direction is enough; path is what liquidates.
2. Ignoring funding in medium-term holds.
3. Assuming insurance fund is infinite.
4. Comparing venues by UI, not risk engine design.

---

## 12. Failure simulations

## Simulation 1: crash + queue congestion

- many accounts breach simultaneously
- liquidation throughput limited
- backlog grows
- equity decays while waiting

Result: shortfall risk rises even with correct formulas.

## Simulation 2: oracle disturbance

- mark source lags or distorts
- unfair liquidations or delayed risk recognition

Result: trust damage + potential solvency stress.

---

## 13. Perp protocol comparison framework

For each venue (e.g., Hyperliquid, dYdX, GMX), evaluate:

1. Matching design (orderbook/AMM/hybrid)
2. Margin model details
3. Mark price and oracle architecture
4. Liquidation speed and success stats
5. Insurance capacity and fallback policy

---

## 14. Explain-it-back Q&A

1. Why can a "correct long-term view" still lose money in perps?
- liquidation can occur before eventual recovery.

2. What keeps perp price near spot if no expiry exists?
- funding transfer mechanism.

3. Why is throughput as important as math?
- risk must be unwound quickly; slow execution causes losses.

4. What is insurance fund role?
- absorb residual losses from imperfect liquidation fills.

5. What makes one perp venue safer than another?
- robustness of mark/liquidation/insurance path under stress.

---

## 15. Bridge to Module 05

Perps price future-oriented views via leverage and funding. Prediction markets price event probabilities directly. Next module compares that belief-pricing structure and its own trust anchor: resolution.
