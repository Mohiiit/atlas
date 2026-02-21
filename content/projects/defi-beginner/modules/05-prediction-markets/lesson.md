# Module 05 Coursebook (Ultra-Depth): Prediction Markets and Resolution Design

## 0. Reading plan

This chapter is about one critical idea: price signals are only as good as resolution integrity and liquidity quality.

Read sections 1-4 first, then examples, then failure analysis.

---

## 1. Why prediction markets exist

Humans debate futures with opinions. Prediction markets force participants to put capital behind beliefs. That creates a market-based probability signal.

But this signal can be high quality or low quality depending on design.

---

## 2. Term unpacking

- **Binary market**: YES/NO outcome market.
- **YES share**: pays 1 if outcome true at resolution.
- **Implied probability**: rough reading of YES price.
- **Resolution source**: canonical source for final truth.
- **Dispute window**: period for challenges.
- **Liquidity depth**: executable volume without major price move.
- **Calibration**: how often predicted probabilities match realized frequencies over time.

---

## 3. Running scenario

Market question:

"Will event X happen by date D according to source S?"

YES is trading at 0.63.
Maya believes true probability is 0.70.

---

## 4. Mechanism loop

1. Market defined with clear question + resolution rules.
2. Traders buy/sell claims.
3. Price evolves with flow.
4. Event date passes.
5. Resolver submits outcome.
6. Dispute (if needed).
7. Final settlement at 1/0 payout.

---

## 5. Numerical example A: basic edge

Maya buys 1,000 YES at 0.63.

- Cost: 630
- If YES true: payout 1,000, gross +370
- If YES false: -630

Break-even probability before costs: 63%.

---

## 6. Numerical example B: execution quality

Suppose visible price is 0.63, but depth is thin.

Maya buys 5,000 YES:

- first 1,000 at 0.63
- next 2,000 at 0.65
- last 2,000 at 0.68

Average entry:

`(1000*0.63 + 2000*0.65 + 2000*0.68) / 5000 = 0.658`

Her effective break-even rises from 63% to 65.8%.

---

## 7. Numerical example C: cost-adjusted edge

Model probability = 70%.

- raw edge at 0.63: 0.07/share
- effective entry 0.658: edge 0.042/share
- assume fees 0.01/share and expected dispute/friction cost 0.008/share
- net expected edge: 0.024/share

Edge can shrink by two-thirds after execution + friction.

---

## 8. Resolution design: the real trust anchor

Good question design characteristics:

1. Binary and objective.
2. Bound by clear date/time.
3. Bound by explicit source hierarchy.
4. Handles source unavailability contingencies.

Example of strong question:

"Will agency Z publish metric M above threshold T by date D on official release page P?"

Weak question:

"Will economy improve this quarter?"

---

## 9. Market quality dimensions

1. **Question quality**
2. **Resolution/dispute robustness**
3. **Liquidity depth**
4. **Participant diversity**
5. **Cost structure**

Price quality is weakest where one of these is weak.

---

## 10. Common beginner mistakes

1. Treating displayed price as fully reliable regardless of depth.
2. Ignoring dispute risk and assuming instant clean settlement.
3. Trading ambiguous questions with subjective outcome interpretation.
4. Focusing on headline volume rather than executable depth.

---

## 11. Failure simulations

## Simulation 1: ambiguous question attack

- wording leaves room for interpretation
- resolver selects one interpretation
- disputes escalate and finalization delays

Outcome: confidence in market weakens; price signal quality collapses.

## Simulation 2: close-window liquidity manipulation

- near expiry, book depth thins
- moderate capital can push displayed price significantly

Outcome: naive participants misread probability from manipulated terminal prints.

---

## 12. Evaluation checklist for live prediction protocols

1. Is question design template strict and objective?
2. Is resolution source transparent and archived?
3. Is dispute process economically balanced?
4. What is depth at common trade sizes?
5. What is historical calibration quality?

---

## 13. Explain-it-back Q&A

1. Why is resolution more important than UI?
- Because payout truth depends on resolution mechanism.

2. Why can implied probability be misleading?
- Thin depth and frictions distort displayed price quality.

3. What kills good ideas in execution?
- Slippage, fees, and dispute/friction costs.

4. What is a high-quality market question?
- Objective, time-bounded, source-bounded, minimally ambiguous.

5. How do you compare two prediction venues fairly?
- Same framework: question quality, resolution robustness, depth, costs, calibration.

---

## 14. Bridge to Module 06

Prediction markets teach event-probability pricing. Next module (options/structured DeFi) teaches payoff-shape engineering, where risk/return depends heavily on volatility and convexity assumptions.
