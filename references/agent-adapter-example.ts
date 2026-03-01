import { FxSdk, tokens } from '@aladdindao/fx-sdk'
import type { Address } from 'viem'

export type FxAction =
  | {
      kind: 'getPositions'
      userAddress: Address
      market: 'ETH' | 'BTC'
      type: 'long' | 'short'
    }
  | {
      kind: 'increasePosition'
      market: 'ETH' | 'BTC'
      type: 'long' | 'short'
      positionId: number
      leverage: number
      inputTokenAddress: Address
      amount: bigint
      slippage: number
      userAddress: Address
    }

export interface AdapterOptions {
  rpcUrl?: string
  chainId?: number
  planOnly?: boolean
}

export async function runFxAction(action: FxAction, options: AdapterOptions = {}) {
  const sdk = new FxSdk({ rpcUrl: options.rpcUrl, chainId: options.chainId ?? 1 })

  if (action.kind === 'getPositions') {
    return sdk.getPositions(action)
  }

  if (action.kind === 'increasePosition') {
    const result = await sdk.increasePosition(action)

    if (options.planOnly ?? true) {
      return {
        mode: 'plan',
        positionId: result.positionId,
        routes: result.routes,
      }
    }

    return {
      mode: 'execute_required',
      message: 'Use wallet client to send selected route.txs sequentially.',
      routePreview: result.routes[0],
    }
  }

  throw new Error('Unsupported action kind')
}

// Example payload for agent planners
export const sampleIncreasePayload: FxAction = {
  kind: 'increasePosition',
  market: 'ETH',
  type: 'short',
  positionId: 0,
  leverage: 3,
  inputTokenAddress: tokens.wstETH,
  amount: 10n ** 17n,
  slippage: 1,
  userAddress: '0x0000000000000000000000000000000000000001',
}
