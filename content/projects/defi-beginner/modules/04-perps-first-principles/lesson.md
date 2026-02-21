# Module 04 Coursebook: Perpetual Futures, Funding, and Liquidation Mechanics

## Problem statement

Arjun wants leveraged exposure without fixed expiry futures. Perpetual contracts provide this, but force continuous risk management through margin and liquidation.

## Terms

- **Leverage**: position notional / collateral.
- **Mark price**: reference for PnL and liquidation.
- **Funding**: periodic transfer long<->short.
- **Maintenance margin**: minimum equity to keep position open.
- **Insurance fund**: buffer for liquidation shortfalls.

## Running example

Maya opens 1 BTC long at 60,000 with 6,000 collateral (10x).

## Mechanism

1. Open position with collateral.
2. Mark updates.
3. PnL updates.
4. Equity checked against maintenance margin.
5. Liquidation if breach.
6. Insurance/ADL if shortfall.

## Numerical example A

Price to 57,000.

- PnL = -3,000
- Equity = 3,000
- If maintenance = 3,500 -> liquidation eligible.

## Numerical example B

Funding = +0.01% every 8h on 60,000 notional.

- Cost per interval = 6
- 30 intervals cost = 180

## Numerical example C

20x leverage with same directional move doubles sensitivity. A 2.5-3% move can threaten solvency.

## Misconceptions

1. "Direction right means profit eventually" -> liquidation can happen before recovery.
2. "Funding is small so ignore" -> cumulative drag matters.

## Failure simulations

- Mark price feed disturbance.
- Liquidation queue overload during volatility spikes.

## Checklist

1. Mark formula transparency?
2. Liquidation latency stats?
3. Insurance adequacy vs open interest?
4. ADL/socialized loss policy clarity?

## Explain-it-back

1. Why funding exists?
- To keep perp anchored near spot.
2. Why liquidation speed matters?
- Delays convert paper risk into realized system losses.
3. What is first stress breakpoint usually?
- Execution throughput, not formula correctness.
