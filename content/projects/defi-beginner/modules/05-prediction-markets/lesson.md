# Module 05 Coursebook: Prediction Markets, Resolution, and Price Quality

## Problem statement

Prediction markets convert beliefs into prices. But good pricing requires clear questions, credible resolution, and sufficient liquidity.

## Terms

- **YES/NO share**: pays 1 if outcome true/false.
- **Implied probability**: approximate interpretation of price.
- **Resolution source**: authoritative truth input.
- **Dispute window**: challenge period.
- **Liquidity depth**: executable size without huge price impact.

## Running example

YES trades 0.63. Maya believes event probability is 0.70.

## Mechanism

1. Create objective question.
2. Traders buy/sell claims.
3. Price evolves.
4. Event occurs.
5. Resolution and dispute.
6. Winner redeems at 1.

## Numerical example A

Buy 1,000 YES at 0.63.

- Cost 630
- If YES true -> payout 1,000 -> gross +370

## Numerical example B

If execution average slips to 0.67 due to thin depth, expected edge shrinks materially.

## Numerical example C

If fees + slippage total 0.03 and your edge is 0.07, net edge is only 0.04.

## Misconceptions

1. "Price always true probability" -> only under strong assumptions.
2. "Volume alone means quality" -> resolution trust matters equally.

## Failure simulations

- Ambiguous question exploited in dispute.
- Thin close-period market manipulated by modest capital.

## Checklist

1. Is question binary and verifiable?
2. Is resolver transparent and contestable?
3. Is depth sufficient at intended trade size?

## Explain-it-back

1. What is core trust anchor?
- Resolution/dispute mechanism.
2. Why can two markets on same topic differ in quality?
- Different wording, depth, and adjudication quality.
3. What kills edge most often?
- Costs + low-liquidity execution.
