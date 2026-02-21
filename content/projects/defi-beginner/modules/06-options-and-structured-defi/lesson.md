# Module 06 Coursebook: Options and Structured Yield

## Problem statement

Users want higher yield than passive lending. Structured products often provide this by selling option exposure.

## Terms

- **Call option**: right to buy at strike.
- **Strike**: fixed exercise price.
- **Premium**: upfront option payment.
- **Covered call**: own asset + sell call.
- **Implied volatility**: expected volatility embedded in option price.

## Running example

Maya deposits 1 ETH into covered-call vault.

- Strike 2,500
- Premium 80 USDC

## Mechanism

1. Vault receives deposits.
2. Vault writes options.
3. Vault collects premium.
4. At expiry, payoff depends on spot vs strike.

## Numerical examples

A) Spot 2,300: keep ETH + premium.

B) Spot 2,900: upside mostly capped past strike.

C) Repeated monthly cycles show smooth income in chop but opportunity cost in strong trends.

## Misconceptions

- "APY = free money" -> no, income is compensation for sold convexity.

## Failure simulations

- High-vol regime shift breaks historical assumptions.
- Poor option liquidity at roll causes expensive execution.

## Checklist

1. What payoff is being sold?
2. In which regime does strategy underperform most?
3. Are strike and tenor rules transparent?

## Explain-it-back

1. Where does vault yield originate?
- Option premium.
2. Why can strategy lag spot badly?
- Upside is capped by short call.
3. Why can smooth charts be deceptive?
- Tail scenarios are infrequent but severe.
