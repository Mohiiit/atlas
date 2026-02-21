# Module 00 Coursebook: How to Think in DeFi (First Principles)

## Why this module matters

If you skip this module, every later protocol will feel like disconnected jargon. If you learn this module properly, you can decode any DeFi design by asking the same fixed questions.

DeFi is not "magic internet money." It is software for markets, credit, and settlement. That means the correct way to study it is not by token symbols but by mechanism structure.

## Running scenario used in all modules

We use the same two people across the curriculum:

- **Maya**: has savings, wants returns, sometimes wants liquidity without selling long-term assets.
- **Arjun**: needs capital to run a business and later wants directional exposure to asset prices.

Keeping the same people and numbers reduces cognitive load.

## The five first-principles questions

For any protocol, ask:

1. **What is the state?**
2. **What actions change the state?**
3. **What invariants must remain true?**
4. **Who gets paid in normal operation?**
5. **What breaks first in stress?**

If you can answer these five, you can reason about new protocols without memorizing docs.

## Term unpacking

### State
Current protocol memory: balances, debts, LP positions, open interest, insurance funds.

### Action
Function that changes state: `deposit`, `borrow`, `swap`, `repay`, `liquidate`, `settle`.

### Invariant
Safety truth that should hold after valid transitions. Example: collateral value should remain above required threshold for active debt positions.

### Incentive
Payment signal causing actors to keep protocol healthy. Example: liquidation bonus for keepers.

### Adversary
Actor optimizing against your assumptions: MEV searcher, manipulative oracle submitter, malicious governance coalition.

## Mechanism lens vs feature lens

Feature lens asks: "Does it have X?"
Mechanism lens asks: "Under what state/path does X fail?"

Mechanism lens is what infra engineers need.

## Worked example A: same UI, different risk

Two protocols can both show "Borrow APR: 6%."

- Protocol A liquidates quickly with robust keepers and deep markets.
- Protocol B has thin liquidity and delayed oracle updates.

Same feature. Different failure probability.

## Worked example B: same fee, different economics

Two pools both charge 0.3% swap fee.

- Pool A has stable volume and low toxic flow.
- Pool B has predatory orderflow, high volatility bursts.

LP expected outcome can differ massively.

## Common beginner mistakes

1. Treating APY as guaranteed return.
2. Ignoring liquidation path and only reading entry conditions.
3. Assuming smart-contract audit means economic safety.
4. Confusing protocol usage with tokenholder value accrual.

## Failure simulations

### Simulation 1: oracle lag

- Collateral price crashes 20% in 30 seconds.
- Oracle updates every 60 seconds.
- Liquidation reacts late.

Result: even correct liquidation logic may act too late.

### Simulation 2: congestion

- Many accounts go near liquidation simultaneously.
- Gas spikes, keeper submissions fail or delay.

Result: solvency depends on throughput, not just formulas.

## Explain-it-back check (with answers)

1. Why is state mapping first?
- Because all later reasoning depends on what can and cannot change.

2. Why are invariants not enough by themselves?
- Because they may hold in code but fail in economics/timing conditions.

3. Why do incentives matter?
- Because protocol health requires third parties to act when stress hits.

4. Can protocol be "safe" and still produce poor user outcomes?
- Yes, via slippage, MEV extraction, delayed execution.

5. What is the one-line purpose of this course?
- Learn to evaluate mechanism quality, not marketing claims.

## Bridge to Module 01

Next module turns these ideas into concrete collateralized borrowing and settlement flows. You will see exactly how state, thresholds, and liquidations interact.
