/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { ForesightHasMarketListId } from '@utils/uiTypes/proposalCreationTypes'
import { Governance } from '@solana/spl-governance'
import { ProgramAccount } from '@solana/spl-governance'
import {
  governance as foresightGov,
  consts,
} from '@foresight-tmp/foresight-sdk'
import { commonAssets, ForesightMarketListIdInput } from '@utils/Foresight'
import { PublicKey } from '@solana/web3.js'

const MakeInitMarketListParams = ({
  index,
  governance,
}: {
  index: number
  governance: ProgramAccount<Governance> | null
}) => {
  const {
    inputProps,
    effector,
    governedAccountSelect,
    wallet,
  } = commonAssets<ForesightHasMarketListId>(
    { marketListId: '' },
    index,
    governance
  )
  async function ixCreator(form: ForesightHasMarketListId) {
    const { ix } = await foresightGov.genInitMarketListIx(
      Buffer.from(form.marketListId.padEnd(20)),
      new PublicKey(consts.DEVNET_PID),
      wallet!.publicKey!,
      form.governedAccount.extensions.transferAddress!
    )
    return ix
  }
  effector(ixCreator)

  return (
    <>
      {governedAccountSelect}
      <ForesightMarketListIdInput {...inputProps} />
    </>
  )
}

export default MakeInitMarketListParams
