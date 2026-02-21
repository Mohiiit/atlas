# Module 01 Coursebook: Collateral, Borrowing, and Settlement

## Why this topic exists

Maya wants liquidity without selling long-term ETH. Arjun wants capital now. This creates a classic credit problem: how can lender confidence exist without trust in borrower personality?

Answer: collateral + enforceable rules.

In DeFi, enforcement is code and onchain settlement instead of a legal contract processed by a bank.

## Core terms (plain language first)

### Collateral
Safety asset locked to back debt.

### Debt
Amount borrowed or minted against collateral.

### Collateral ratio
Collateral value / debt value.

### Liquidation threshold
Minimum ratio required to keep position open.

### Settlement
Final update of balances onchain.

### Finality
Point after which reversal is practically impossible.

## Running example

Maya locks ETH worth $15,000 and borrows $10,000 stablecoins.

- Initial ratio: 150%
- Protocol threshold: 125%

## Mechanism walkthrough

1. Maya deposits collateral.
2. Contract records debt when she borrows.
3. Oracle updates collateral price.
4. Risk engine checks ratio.
5. If below threshold, liquidators can repay debt and seize discounted collateral.
6. Settlement updates debt/collateral balances.

## Numerical example A (normal)

Price drop 8%.

- Collateral: 15,000 -> 13,800
- Ratio: 13,800 / 10,000 = 138%

Still safe.

## Numerical example B (stress)

Price drop 25%.

- Collateral: 15,000 -> 11,250
- Ratio: 112.5%

Below threshold. Liquidation starts.

Assume liquidator repays 3,000 debt and receives collateral worth 3,300 (10% incentive).

## Numerical example C (cascading stress)

If market keeps falling during liquidation queue delay:

- Pre-liquidation collateral 11,250
- Another 10% drop during congestion -> 10,125

Recovery worsens; bad debt risk increases.

## Misconceptions

### "Collateral means no risk"
Wrong. Collateral reduces credit risk but creates liquidation timing risk.

### "Onchain means instant"
Wrong. Congestion and ordering competition matter.

## Failure simulations

### Simulation 1: stale oracle

- Oracle update every 60 sec
- Market gap move in 15 sec
- Liquidation decisions use stale values

Result: delayed intervention, worse recovery.

### Simulation 2: keeper bottleneck

- Many positions breach at once
- Keeper capacity insufficient

Result: queue grows, insolvency probability increases.

## Evaluation checklist for real protocols

1. What collateral assets are allowed?
2. How often does oracle update?
3. Is liquidation incentive enough during volatility spikes?
4. What percent of positions are near threshold in normal times?
5. Is there circuit-breaker behavior in extreme moves?

## Explain-it-back Q&A

1. Why overcollateralize?
- To absorb market moves before debt becomes underbacked.

2. Why do protocols need liquidators?
- To execute risk reduction when borrowers cannot/will not act fast enough.

3. What does settlement finality change?
- Confidence that state updates are durable and can be relied on by downstream systems.

4. Can code be correct and outcome still bad?
- Yes, because timing and liquidity conditions may fail.

5. What is the single most important health metric here?
- Distribution of collateral ratios near liquidation threshold.

## Bridge to Module 02

Now that borrowing/settlement logic is clear, we move to AMMs where trading changes pool state continuously and introduces slippage, LP risk, and arbitrage dynamics.
