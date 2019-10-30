import { StakingLedger, UnlockChunk } from '@polkadot/types/interfaces';
import { DerivedStaking } from '@polkadot/api-derive/types';
import U32 from '@polkadot/types/primitive/U32';
import { FromResponseConverters, IUnlockChunk, IStakingLedger, IDerivedStaking, IIndividualExposure } from './types';

export const fromResponseConverters: FromResponseConverters = {
  'rpc.system.properties': response => ({
    ss58Format: response.ss58Format.unwrapOr(new U32(-1)).toNumber(),
    tokenDecimals: response.tokenDecimals.unwrapOr(new U32(15)).toNumber(),
    tokenSymbol: response.tokenSymbol.unwrapOr('DEV').toString(),
  }),
  'derive.staking.info': response => convertDerivedStaking(response),
  'query.session.validators': response => response.map(String),
  'query.staking.nominators': ([response]) => response.map(String),
  'query.staking.ledger': response => {
    const unwrappedLedger = response.unwrapOr(null);
    return unwrappedLedger && convertStakingLedger(unwrappedLedger);
  },
  'derive.session.info': response => response,
  'derive.balances.all': response => response,
  'derive.balances.fees': response => response,
  'derive.staking.recentlyOffline': response => response,
};

function convertDerivedStaking(value: DerivedStaking): IDerivedStaking {
  return {
    accountId: value.accountId.toString(),
    controllerId: value.controllerId && value.controllerId.toString(),
    nextSessionId: value.nextSessionId && value.nextSessionId.toString(),
    nextSessionIds: value.nextSessionIds.map(String),
    nominators: value.nominators && value.nominators.map(String),
    redeemable: value.redeemable,
    rewardDestination: value.rewardDestination,
    sessionId: value.sessionId && value.sessionId.toString(),
    sessionIds: value.sessionIds.map(String),
    stakers: value.stakers && {
      others: value.stakers.others.map<IIndividualExposure>(item => ({
        value: item.value.toBn(),
        who: item.who.toString(),
      })),
      own: value.stakers.own.toBn(),
      total: value.stakers.total.toBn(),
    },
    stakingLedger: value.stakingLedger && convertStakingLedger(value.stakingLedger),
    stashId: value.stashId && value.stashId.toString(),
    unlocking: value.unlocking,
    validatorPrefs: value.validatorPrefs && {
      validatorPayment: value.validatorPrefs.validatorPayment.toBn(),
    },
  };
}

function convertStakingLedger(value: StakingLedger): IStakingLedger {
  return {
    stash: value.stash.toString(),
    active: value.active.toBn(),
    total: value.total.toBn(),
    unlocking: value.unlocking.toArray().map(convertUnlockChunk),
  };
}

function convertUnlockChunk(value: UnlockChunk): IUnlockChunk {
  return {
    era: value.era.toBn(),
    value: value.value.toBn(),
  };
}
