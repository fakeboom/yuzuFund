import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, CurrencyAmount, JSBI, Token, TokenAmount, StakePool, AttenuationReward, ROUTER_ADDRESS, ZOO_ZAP_ADDRESS, Pair, WETH } from '@liuxingfeiyu/zoo-sdk'
import { useMultipleContractSingleData, useSingleCallResult, useSingleContractMultipleData } from '../state/multicall/hooks'
import { useActiveWeb3React } from './index'
import { APIHost, DefaultChainId, AllDefaultChainTokens, ZOO_USDT_SWAP_PAIR_ADDRESS } from "../constants/index"
import { usePairContract, useTokenContract , useFundContract} from 'hooks/useContract'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import ERC20_INTERFACE from 'constants/abis/erc20'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from 'state/transactions/hooks'

export function useFundSubscribeCallback(
  address : string,
  amount : JSBI,
){
  const tokenContract = useFundContract()
  const addTransaction = useTransactionAdder()

  const subscribe = useCallback(async (): Promise<void> => {
    
    if (!tokenContract) {
      console.error('FundContract is null')
      return
    }
    return tokenContract
      .subscribe(  address  ,BigNumber.from(amount.toString())
      )
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Fund Subscribe'}
          )
      }).catch((error: Error) => {
        console.debug('Failed to Subscribe Fund ', error)
        throw error
      })
  }, [amount, address, tokenContract, addTransaction])

  return subscribe
}

export function useFundRedeemCallback(
  address : string,
  amount : JSBI,
){
  const tokenContract = useFundContract()
  const addTransaction = useTransactionAdder()

  const redeem = useCallback(async (): Promise<void> => {
    
    if (!tokenContract) {
      console.error('FundContract is null')
      return
    }
    return tokenContract
      .redeem(  address  ,BigNumber.from(amount.toString())
      )
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Fund Redeem'}
          )
      }).catch((error: Error) => {
        console.debug('Failed to Redeem Fund ', error)
        throw error
      })
  }, [amount, address, tokenContract, addTransaction])

  return redeem
}