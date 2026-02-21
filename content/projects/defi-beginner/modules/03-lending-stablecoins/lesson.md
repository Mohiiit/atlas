# Module 03 Coursebook: Lending, Utilization, and Stablecoin Stability

## Problem statement

Maya wants yield on idle capital. Arjun wants borrowable working capital. DeFi lending pool connects both, but must continuously manage solvency and liquidity.

## Core terms

- **Utilization**: borrowed / supplied.
- **Borrow APR**: cost for borrowers.
- **Supply APR**: return to depositors.
- **Kink model**: rate curve with sharp slope change past threshold.
- **Stablecoin**: token targeting stable value.
- **Depeg**: meaningful break from target value.

## Running example

Pool starts with:

- Supply 100,000 USDC (mostly Maya)
- Borrow 60,000 USDC (Arjun + others)
- Utilization 60%

## Mechanism

1. Suppliers deposit.
2. Borrowers borrow with collateral constraints.
3. Rates update from utilization.
4. Repayment/interest flows back to suppliers.
5. Liquidation handles unhealthy positions.

## Numerical example A: utilization shift

Borrow rises to 85,000, supply still 100,000.

- Utilization = 85%
- Above kink (assume 80%)
- Borrow APR jumps, encouraging repayment/new supply.

## Numerical example B: collateral shock

Arjun has loan against volatile collateral. Collateral drops 30% quickly.

- If liquidation is fast: debt mostly recovered.
- If liquidation is delayed: pool may eat shortfall.

## Numerical example C: stablecoin confidence loop

If collateral quality doubt rises:

- Users redeem/sell stablecoin
- Price drops below peg
- If redemptions constrained, depeg can deepen

## Misconceptions

1. "Stablecoin = always stable" -> false.
2. "High utilization means great lender yield only" -> incomplete; it also means fragility.

## Failure simulations

- Oracle lag during fast crash.
- Keeper congestion in correlated drawdown.

## Checklist

1. Where is kink and why?
2. What liquidation throughput exists under stress?
3. Which collateral dominates systemic risk?
4. What redemption assurances exist?

## Explain-it-back Q&A

1. Why do rates spike at high utilization?
- To rebalance supply-demand and prevent pool exhaustion.
2. What creates bad debt?
- Debt not fully covered by recoverable collateral.
3. Can depeg happen without hack?
- Yes, via liquidity and confidence dynamics.
