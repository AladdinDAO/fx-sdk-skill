---
name: fx-sdk-agent
description: Use FX Protocol TypeScript SDK (fx-sdk) to query positions, build leverage operation transaction plans, and generate runnable scripts for increasePosition, reducePosition, adjustPositionLeverage, depositAndMint, and repayAndWithdraw. Use when users ask to integrate this SDK into an agent/tool, produce transaction execution code, troubleshoot SDK parameters, or validate FX trading workflows on Ethereum mainnet.
---

# FX SDK Agent Skill

Use this skill to produce reliable `fx-sdk` integrations for agent workflows.

## Follow This Workflow

1. Confirm user intent: read-only query (`getPositions`) or transaction-producing action (`increase/reduce/adjust/deposit/repay`).
2. Collect required inputs before coding:
- `market`: `ETH` or `BTC`
- position type when needed: `long` or `short`
- `positionId`
- token address from `tokens`
- amount fields (`bigint` in wei-like units)
- `slippage` (must be `0 < slippage < 100`)
- `userAddress`
3. Create `FxSdk` once and reuse it.
4. Return SDK result first (routes/tx plan), then optionally provide transaction sending loop.
5. Keep nonce order from SDK-provided `txs`; send transactions sequentially.
6. Validate inputs and surface SDK error messages directly when possible.
7. If input comes from `agent-tools.json` style payloads, convert amount strings to `bigint` before SDK calls.

## Project Ground Truth

Treat these as canonical project references before generating code:

- `AGENTS.md`
- `README.md`
- `agent-tools.json`

## Canonical Imports

```ts
import { FxSdk, tokens } from '@aladdindao/fx-sdk'
```

Use custom RPC only when provided:

```ts
const sdk = new FxSdk({ rpcUrl, chainId: 1 })
```

## Method Map

- `sdk.getPositions({ userAddress, market, type })`: read-only positions.
- `sdk.increasePosition(...)`: open new position (`positionId: 0`) or add collateral/leverage.
- `sdk.reducePosition(...)`: reduce or close (`isClosePosition: true`).
- `sdk.adjustPositionLeverage(...)`: rebalance leverage for existing position.
- `sdk.depositAndMint(...)`: long pool only.
- `sdk.repayAndWithdraw(...)`: long pool only.

## Token Constraints

Honor SDK token checks:

- ETH market common tokens: `eth`, `stETH`, `weth`, `wstETH`, `usdc`, `usdt`, `fxUSD`
- BTC market common tokens: `WBTC`, `usdc`, `usdt`, `fxUSD`
- `depositAndMint` / `repayAndWithdraw`:
- ETH long: `eth|stETH|weth|wstETH`
- BTC long: `WBTC`

## Output Style For Agent Tasks

When user asks to integrate SDK into an AI agent, return:

1. A minimal adapter function with typed input.
2. A safe dry-run mode (`planOnly`) that returns SDK routes without sending transactions.
3. A transaction executor function that consumes one selected route/result and sends `txs` in nonce order.
4. A validation checklist and command list.

## Tool Schema Interop

If user provides values from `agent-tools.json`:

- Parse wei strings with `BigInt(value)`.
- Keep `positionId` as number.
- Keep `slippage` as number in `(0, 100)`.
- Normalize token addresses with `tokens.*` when possible.

## Project-Specific References

Read these files when examples are required:

- `example/increase-position.ts`
- `example/reduce-position.ts`
- `example/adjust-position-leverage.ts`
- `example/deposit-and-mint.ts`
- `example/repay-and-withdraw.ts`
- `example/get-positions.ts`

For reusable request shapes and test checklist, read:

- `references/sdk-playbook.md`
- `references/agent-adapter-example.ts`
