# Tongo Shielded Transactions on Starknet — First Principles Guide

## Who this is for

This note is for a fresh CS graduate who knows basic crypto terms (public/private key, signatures, hashing) but is new to privacy protocols.

Goal: explain **how Tongo can provide private balances/transfers on a fully public network like Starknet**.

---

## 1) The core problem

Public blockchains are transparent by default.

If Alice sends Bob tokens on a normal ERC-20:
- sender address is public
- receiver address is public
- amount is public
- anyone can build their full transaction graph

Tongo changes the **state representation** and **verification method**:
- state is stored as encrypted curve points, not plain balances
- users provide zero-knowledge proofs that operations are valid
- contract verifies proofs and updates encrypted state

So the chain still verifies correctness, but does not learn private values.

---

## 2) Mental model before details

Think of each account as a locked box on-chain:
- chain can verify the lock logic is followed
- chain cannot read the money amount inside
- owner has a key to read their own amount

In Tongo, the “locked box” is an ElGamal-style encrypted balance (`CipherBalance`), and proof system shows updates are valid.

---

## 3) Actors and keys

There are two different key contexts:

1. **Starknet account key**
- signs the Starknet transaction
- pays gas
- visible at network layer

2. **Tongo private key**
- controls the private balance logic
- used to generate/verify proof relations and decrypt own state
- mapped to a Tongo public key / Tongo address

In Cloak SDK this appears as:
- Starknet account = regular account abstraction wallet
- Tongo account = `new TongoAccount(tongoPrivateKey, tongoContract, provider)`

---

## 4) What is stored on-chain?

For each Tongo public key, contract state includes encrypted values (simplified):
- `balance` (encrypted)
- `pending` (encrypted)
- `nonce`
- optional AE hint blobs for faster local decryption

Important: encrypted state is not a generic byte array; it is curve-point ciphertext (`L`, `R`) with algebraic structure the verifier uses.

---

## 5) The cryptography in plain words

## 5.1 ElGamal-style balance encryption

A balance `b` is represented as elliptic-curve points:
- `L = g^b + y^r`
- `R = g^r`

Where:
- `g` = generator point
- `y` = user public key
- `r` = randomness

Only holder of private key `x` (where `y = g^x`) can remove `y^r` and recover `g^b`.

## 5.2 Why decryption is possible

With private key `x`, user computes:
- `L - xR = g^b`

Then finds `b` (discrete log in small bounded range). In current SDK implementation, balances are bounded to 32 bits for practicality.

## 5.3 Why contract can verify without learning `b`

Contract receives proofs that demonstrate statements like:
- “I know secret key for this public key”
- “Ciphertext update is consistent with transfer/withdraw rules”
- “Amount and leftover are in allowed range (non-negative, bounded)”

It verifies proof equations on public inputs only.

---

## 6) Why this works on a public network

Public chain requirement: all validators must independently verify correctness.

Tongo satisfies this by making verification public and deterministic:
- proof inputs include public context (`chain_id`, contract address, sender address, op type, nonce)
- verifier recomputes challenge/hash and checks equations
- if proof passes, encrypted state transition is accepted

So everyone can verify “this transition is valid” without seeing “what was the secret amount.”

---

## 7) Operation-by-operation flow

We use STRK example with Tongo unit rate.

Assume (for illustration):
- rate for STRK pool means 1 Tongo unit = 0.05 STRK
- Alice has Tongo keypair `(xA, yA)`
- Bob has Tongo keypair `(xB, yB)`

## 7.1 Fund (public -> shielded)

What happens:
1. Alice approves ERC-20 spend to Tongo contract (`approve` call).
2. Alice sends `fund` operation with proof.
3. Contract pulls ERC-20 and updates Alice encrypted `balance`.

What is private vs public:
- fund is boundary crossing with ERC-20, so deposit amount is observable in transaction context.
- resulting internal private balance is encrypted.

## 7.2 Transfer (shielded -> shielded)

What happens:
1. Alice creates transfer proof locally.
2. Proof states: sender balance reduces by `b`, receiver pending increases by `b`, constraints hold.
3. Contract verifies and updates encrypted states.

What is private vs public:
- no plain transfer amount is exposed in standard transfer calldata model.
- sender/receiver public keys and proof objects are visible.
- amount itself stays hidden behind ciphertext/proof relations.

## 7.3 Rollover (pending -> spendable)

Why needed:
- receiver side uses `pending` bucket.
- rollover finalizes pending funds into active `balance`.

Flow:
1. Bob calls rollover with proof of key ownership.
2. Contract moves encrypted pending value into spendable encrypted balance.

## 7.4 Withdraw (shielded -> public)

What happens:
1. Alice proves she can reduce private balance by amount `w` while keeping leftover valid.
2. Contract updates encrypted balance and transfers ERC-20 out to target Starknet address.

What is private vs public:
- withdraw is boundary crossing, so output public transfer context is visible.
- internal remaining balance stays encrypted.

---

## 8) Why “pending” exists

`pending` helps protocol cleanly separate:
- incoming encrypted credits
- receiver’s final claim/finalization step

It avoids fragile assumptions about receiver-side immediate state transitions and keeps verification flow composable.

---

## 9) AE hints: performance helper, not trust anchor

In SDK internals, there is an authenticated-encryption “hint” (`AEBalance`) using XChaCha20-Poly1305.

Purpose:
- speed up local decryption of your own balance
- avoid expensive brute-force lookup in normal UI path

How key is derived (simplified):
- ECDH shared secret from private key + public key
- HKDF with salt including nonce and contract context

Security point:
- if hint fails or is tampered, balance can still be validated/decrypted through core ciphertext logic.
- protocol correctness does not rely only on hint.

---

## 10) Replay/context binding defense

Proof prefix data includes values like:
- `chain_id`
- `tongo_address`
- `sender_address`
- operation tag (`fund`, `transfer`, `withdraw`, `rollover`)
- nonce and operation-specific public inputs

Result:
- proofs are context-bound
- a proof for one chain/contract/sender/op cannot be reused in another context

---

## 11) Exactly what remains visible

Even with shielding, public observers can still see metadata:
- transaction timestamp and hash
- gas payer Starknet account
- called contract(s)
- operation type
- boundary flows (fund/withdraw context)

Privacy gain is strongest on internal shielded transfer amounts/balances, not on network-level metadata.

---

## 12) Concrete mini-example

Alice and Bob both use STRK Tongo pool.

Initial:
- Alice public STRK: 10
- Alice shielded: 0
- Bob shielded: 0

Step A: Alice funds 2 STRK into Tongo
- Public sees a fund boundary tx.
- Private state: Alice encrypted balance now represents 2 STRK equivalent units.

Step B: Alice shielded-transfers 0.7 STRK equivalent to Bob
- Public sees a transfer proof transaction.
- Public does not directly see “0.7” as plain internal amount.
- Bob’s encrypted pending increases.

Step C: Bob calls rollover
- Bob pending becomes spendable encrypted balance.

Step D: Bob withdraws 0.2 STRK to public wallet
- Public sees withdrawal boundary effect.
- Bob’s remaining encrypted balance stays private.

---

## 13) Protocol limits and engineering realities

1. **Bit-size bound**
- Current implementation uses bounded balance range (32-bit units in SDK path).
- This is part of making range-proof verification practical.

2. **One Tongo contract per token**
- STRK, ETH, USDC pools are separate deployments.
- Conversions rely on token-specific `rate`.

3. **Gas payer identity is still visible**
- Full sender privacy would require extra relayer/broadcaster design.

4. **Timing correlation still possible**
- Privacy is not “invisibility”; metadata analysis is still possible.

---

## 14) Why this is a good Starknet fit

Starknet already has:
- account abstraction (good for multi-call orchestration)
- efficient proof verification patterns in Cairo
- composable contract calls

So Tongo can add confidential state transitions while preserving developer ergonomics.

---

## 15) Cloak-specific takeaway

In Cloak today, Tongo provides the privacy core for:
- shield
- shielded transfer
- rollover
- unshield

Ward/guardian and 2FA add policy control on top.

For shielded swaps, Cloak composes Tongo with DEX routing as:
- unshield -> swap -> reshield (single atomic multicall)

---

## 16) If you want to go deeper next

Read these local sources in order:
1. `packages/sdk/node_modules/@fatsolutions/tongo-sdk/src/account/account.ts`
2. `packages/sdk/node_modules/@fatsolutions/tongo-sdk/src/provers/transfer.ts`
3. `packages/sdk/node_modules/@fatsolutions/tongo-sdk/src/provers/withdraw.ts`
4. `packages/sdk/node_modules/@fatsolutions/tongo-sdk/src/operations/*.ts`
5. `packages/sdk/node_modules/@fatsolutions/tongo-sdk/src/ae_balance.ts`

These files show the exact proof inputs, prefix binding, and calldata construction used by the SDK.
