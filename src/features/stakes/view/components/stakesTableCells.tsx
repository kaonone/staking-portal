import React from 'react';
import { Link } from 'react-router-dom';
import BN from 'bn.js';
import { useDeps } from 'core';

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { useSubscribable } from 'shared/helpers/react';

import BalanceValue from 'components/BalanceValue';
import { IconButton } from 'shared/view/elements';
import { OpenInNewOutlined } from 'shared/view/elements/Icons';
import Loading from 'shared/view/elements/Loading/Loading';
import { useStyles } from 'features/stakes/view/containers/StakesList/StakesList.style';

interface IProps {
  makeLinkToStake(accountAddress: string): string;
}

interface ICellProps {
  account: InjectedAccountWithMeta;
}

function AddressCell({ account }: ICellProps) {
  return <>{account.meta.name || account.address}</>;
}

function NominatorsCountCell({ account }: ICellProps) {
  const { api } = useDeps();
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(account.address), [account.address], null);
  const nominatorsCount = info && info.nominators ? info.nominators.length : 0;

  return <Loading metas={[infoMeta]}>{nominatorsCount}</Loading>;
}

function StakeSizeCell({ account }: ICellProps) {
  const { api } = useDeps();
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(account.address), [account.address], null);
  const stakeSize = info && info.stakingLedger ? info.stakingLedger.active : new BN(0);

  return <Loading metas={[infoMeta]}>{<BalanceValue input={stakeSize} />}</Loading>;
}

function AwaitingWithdrawalCell({ account }: ICellProps) {
  const { api } = useDeps();
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(account.address), [account.address], null);
  const awaitingWithdrawal =
    info && info.stakingLedger
      ? info.stakingLedger.unlocking.map(item => item.value).reduce((acc, cur) => acc.add(cur), new BN(0))
      : new BN(0);

  return <Loading metas={[infoMeta]}>{<BalanceValue input={awaitingWithdrawal} />}</Loading>;
}

function LinkToStakeCell({ account, makeLinkToStake }: ICellProps & IProps) {
  const classes = useStyles();

  return (
    <Loading metas={[]}>
      {
        <IconButton component={Link} to={makeLinkToStake(account.address)} className={classes.iconButton}>
          <OpenInNewOutlined fontSize="inherit" />
        </IconButton>
      }
    </Loading>
  );
}

export { AddressCell, NominatorsCountCell, StakeSizeCell, AwaitingWithdrawalCell, LinkToStakeCell };
