import React from 'react';
import { Link } from 'react-router-dom';
import BN from 'bn.js';
import { useDeps } from 'core';

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { useSubscribable } from 'shared/helpers/react';

import BalanceValue from 'components/BalanceValue';
import { IconButton, Loading } from 'shared/view/elements';
import { OpenInNewOutlined } from 'shared/view/elements/Icons';

import { useStyles } from './stakesTableCells.style';

interface IProps {
  makeLinkToStake(accountAddress: string): string;
}

interface ICellProps {
  account: InjectedAccountWithMeta;
}

export function AddressCell({ account }: ICellProps) {
  return <>{account.meta.name || account.address}</>;
}

export function NominatorsCountCell({ account }: ICellProps) {
  const { api } = useDeps();
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(account.address), [account.address], null);
  const nominatorsCount = info && info.nominators ? info.nominators.length : 0;

  return <Loading meta={infoMeta}>{nominatorsCount}</Loading>;
}

export function BalanceCell({ account }: ICellProps) {
  const { api } = useDeps();
  const [balance, balanceMeta] = useSubscribable(() => api.getBalanceInfo$(account.address), [account]);
  const balanceSize = (balance && balance.availableBalance) || new BN(0);

  return (
    <Loading meta={balanceMeta}>
      <BalanceValue input={balanceSize} />
    </Loading>
  );
}

export function StakeSizeCell({ account }: ICellProps) {
  const { api } = useDeps();
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(account.address), [account.address], null);
  const stakeSize = info && info.stakingLedger ? info.stakingLedger.active : new BN(0);

  return (
    <Loading meta={infoMeta}>
      <BalanceValue input={stakeSize} />
    </Loading>
  );
}

export function AwaitingWithdrawalCell({ account }: ICellProps) {
  const { api } = useDeps();
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(account.address), [account.address], null);
  const awaitingWithdrawal =
    info && info.unlocking
      ? info.unlocking.map(item => item.value).reduce((acc, cur) => acc.add(cur), new BN(0))
      : new BN(0);

  return (
    <Loading meta={infoMeta}>
      <BalanceValue input={awaitingWithdrawal} />
    </Loading>
  );
}

export function RedeemableCell({ account }: ICellProps) {
  const { api } = useDeps();
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(account.address), [account.address], null);
  const redeemable = (info && info.redeemable) || new BN(0);

  return (
    <Loading meta={infoMeta}>
      <BalanceValue input={redeemable} />
    </Loading>
  );
}

export function LinkToStakeCell({ account, makeLinkToStake }: ICellProps & IProps) {
  const classes = useStyles();

  return (
    <IconButton component={Link} to={makeLinkToStake(account.address)} className={classes.iconButton}>
      <OpenInNewOutlined fontSize="inherit" />
    </IconButton>
  );
}
