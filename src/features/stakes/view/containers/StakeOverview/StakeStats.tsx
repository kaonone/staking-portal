import * as React from 'react';
import { useDeps } from 'core';
import BN from 'bn.js';
import { formatBalance } from '@polkadot/util';

import { useTranslate } from 'services/i18n';
import { Typography, Loading, Table as GenericTable, MakeTableType } from 'shared/view/elements';
import { useSubscribable } from 'shared/helpers/react';
import { BalanceReplenishmentForm, CashWithdrawalForm, CashRedeeming } from 'features/manageStake';

import { BalanceChangingButton } from '../../components/BalanceChangingButton/BalanceChangingButton';
import { useStyles } from './StakeStats.style';

const Table = GenericTable as MakeTableType<IStakeMetric>;

interface IProps {
  stakeAddress: string;
}

interface IStakeMetric {
  name: string;
  value: string;
}

function StakeStats(props: IProps) {
  const { stakeAddress } = props;
  const classes = useStyles();
  const { api } = useDeps();
  const { t, tKeys: tKeysAll } = useTranslate();
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(stakeAddress), []);
  const [balance, balanceMeta] = useSubscribable(() => api.getBalanceInfo$(stakeAddress), []);

  const tKeys = tKeysAll.features.stakes.metrics;

  const availableBalance = balance ? balance.availableBalance.toString() : '0';
  const bonded = info && info.stakingLedger ? info.stakingLedger.active.toString() : '0';
  const unbonding =
    info && info.unlocking
      ? info.unlocking
          .map(item => item.value)
          .reduce((acc, cur) => acc.add(cur), new BN(0))
          .toString()
      : '0';
  const redeemable = info && info.redeemable ? info.redeemable.toString() : '0';

  const metrics = React.useMemo<IStakeMetric[]>(
    () => [
      {
        name: t(tKeys.balance.getKey()),
        value: availableBalance,
      },
      {
        name: t(tKeys.bonded.getKey()),
        value: bonded,
      },
      {
        name: t(tKeys.unbonding.getKey()),
        value: unbonding,
      },
      {
        name: t(tKeys.redeemable.getKey()),
        value: redeemable,
      },
    ],
    [bonded, unbonding, redeemable],
  );

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Stake condition
      </Typography>
      <Loading meta={[infoMeta, balanceMeta]} variant="hint">
        <Table className={classes.table} data={metrics} separated>
          <Table.Column>
            <Table.Cell>{({ data }) => data.name}</Table.Cell>
          </Table.Column>
          <Table.Column>
            <Table.Cell>{({ data }) => formatBalance(data.value)}</Table.Cell>
          </Table.Column>
          <Table.Column>
            <Table.Cell className={classes.cell}>
              {({ data }) =>
                data.name === 'Bonded' && (
                  <BalanceChangingButton
                    ModalContent={BalanceReplenishmentForm}
                    address={stakeAddress}
                    text={t(tKeys.deposit.getKey())}
                  />
                )
              }
            </Table.Cell>
          </Table.Column>
          <Table.Column>
            <Table.Cell className={classes.cell}>
              {({ data }) =>
                data.name === 'Bonded' ? (
                  <BalanceChangingButton
                    ModalContent={CashWithdrawalForm}
                    address={stakeAddress}
                    text={t(tKeys.withdraw.getKey())}
                  />
                ) : (
                  data.name === 'Redeemable' && (
                    <BalanceChangingButton
                      ModalContent={CashRedeeming}
                      address={stakeAddress}
                      text={t(tKeys.redeem.getKey())}
                      disabled={!Number(redeemable)}
                    />
                  )
                )
              }
            </Table.Cell>
          </Table.Column>
        </Table>
      </Loading>
    </>
  );
}

export default StakeStats;
