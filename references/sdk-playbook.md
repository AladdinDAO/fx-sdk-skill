# FX SDK Playbook

## Minimal Read-Only Example

```ts
import { FxSdk } from '@aladdindao/fx-sdk'

const sdk = new FxSdk({ rpcUrl: process.env.RPC_URL, chainId: 1 })

const positions = await sdk.getPositions({
  userAddress,
  market: 'ETH',
  type: 'long',
})
```

## Minimal Transaction Planning Example

```ts
import { FxSdk, tokens } from '@aladdindao/fx-sdk'

const sdk = new FxSdk({ rpcUrl: process.env.RPC_URL, chainId: 1 })

const result = await sdk.increasePosition({
  market: 'ETH',
  type: 'short',
  positionId: 0,
  leverage: 3,
  inputTokenAddress: tokens.wstETH,
  amount: 10n ** 17n,
  slippage: 1,
  userAddress,
})

const route = result.routes[0]
```

## Sequential Execution Example

```ts
for (const tx of route.txs) {
  const hash = await walletClient.sendTransaction({
    to: tx.to as `0x${string}`,
    data: tx.data as `0x${string}`,
    value: tx.value || 0n,
    nonce: tx.nonce,
  })
  await publicClient.waitForTransactionReceipt({ hash })
}
```

## Request Templates

### Increase Position

```ts
{
  market: 'ETH' | 'BTC',
  type: 'long' | 'short',
  positionId: number,
  leverage: number,
  inputTokenAddress: string,
  amount: bigint,
  slippage: number,
  userAddress: string,
}
```

### Reduce Position

```ts
{
  market: 'ETH' | 'BTC',
  type: 'long' | 'short',
  positionId: number,
  outputTokenAddress: string,
  amount: bigint,
  slippage: number,
  userAddress: string,
  isClosePosition?: boolean,
}
```

### Deposit And Mint (Long Only)

```ts
{
  market: 'ETH' | 'BTC',
  positionId: number,
  depositTokenAddress: string,
  depositAmount: bigint,
  mintAmount: bigint,
  userAddress: string,
}
```

### Repay And Withdraw (Long Only)

```ts
{
  market: 'ETH' | 'BTC',
  positionId: number,
  repayAmount: bigint,
  withdrawAmount: bigint,
  withdrawTokenAddress: string,
  userAddress: string,
}
```

## Validation Checklist

1. Run type/tests locally:
- `npm test`
2. Run SDK examples with env configured in `example/.env`:
- `npm run example:positions`
- `npm run example:increase`
3. Confirm tx array ordering:
- approve tx first (if present)
- trade tx last
- nonces strictly increasing
4. Confirm token-market compatibility before sending tx.
5. Confirm slippage bounds (`0 < slippage < 100`).
