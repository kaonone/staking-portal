import React from 'react';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import { useDeps } from 'core';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { Table, Typography, CircleProgressBar, Hint } from 'shared/view/elements';
import { usePagination } from 'shared/view/hooks';
import { useSubscribable } from 'shared/helpers/react';

import {
  AddressCell,
  AwaitingWithdrawalCell,
  LinkToStakeCell,
  NominatorsCountCell,
  StakeSizeCell,
} from 'features/stakes/view/components/stakesTableCells';

import { useStyles } from './StakesList.style';

interface IProps {
  makeLinkToStake(accountAddress: string): string;
}

const tKeys = tKeysAll.features.stakes.list;

function StakesList(props: IProps) {
  const { api } = useDeps();
  const { makeLinkToStake } = props;
  const [accounts, accountsMeta] = useSubscribable(() => api.getSubstrateAccounts$(), [], []);
  const { loaded: accountsLoaded, error: accountsLoadingError } = accountsMeta;

  const classes = useStyles();
  const { t } = useTranslate();

  const { items: paginatedAccounts, paginationView } = usePagination(accounts || []);

  if (!accountsLoaded) {
    return (
      <Hint>
        <CircleProgressBar />
      </Hint>
    );
  }

  if (!!accountsLoadingError) {
    return (
      <Hint>
        <Typography color="error">{accountsLoadingError}</Typography>
      </Hint>
    );
  }

  return !paginatedAccounts.length ? (
    <Hint>
      <Typography>{t(tKeys.notFound.getKey())}</Typography>
    </Hint>
  ) : (
    <div>
      <Table data={paginatedAccounts} separated>
        <Table.Column>
          <Table.Head align={'center'}>#</Table.Head>
          <Table.Cell align={'center'}>
            {({ index }: { index: number }) => (
              <Typography key="1" variant="body1" className={classes.memberNumber}>
                {index + 1}
              </Typography>
            )}
          </Table.Cell>
        </Table.Column>
        <Table.Column>
          <Table.Head align={'left'}>{t(tKeys.columns.name.getKey())}</Table.Head>
          <Table.Cell<InjectedAccountWithMeta> align={'left'}>
            {({ data }) => <AddressCell account={data} />}
          </Table.Cell>
        </Table.Column>
        <Table.Column>
          <Table.Head align={'left'}>{t(tKeys.columns.nominees.getKey())}</Table.Head>
          <Table.Cell<InjectedAccountWithMeta> align={'left'}>
            {({ data }) => <NominatorsCountCell account={data} />}
          </Table.Cell>
        </Table.Column>
        <Table.Column>
          <Table.Head align={'left'}>{t(tKeys.columns.size.getKey())}</Table.Head>
          <Table.Cell<InjectedAccountWithMeta> align={'left'}>
            {({ data }) => <StakeSizeCell account={data} />}
          </Table.Cell>
        </Table.Column>
        <Table.Column>
          <Table.Head align={'left'}>{t(tKeys.columns.awaitingWithdrawal.getKey())}</Table.Head>
          <Table.Cell<InjectedAccountWithMeta> align={'left'}>
            {({ data }) => <AwaitingWithdrawalCell account={data} />}
          </Table.Cell>
        </Table.Column>
        <Table.Column>
          <Table.Head align={'center'}>{''}</Table.Head>
          <Table.Cell<InjectedAccountWithMeta> align={'center'}>
            {({ data }) => <LinkToStakeCell account={data} makeLinkToStake={makeLinkToStake} />}
          </Table.Cell>
        </Table.Column>
      </Table>
      <div className={classes.pagination}>{paginationView}</div>
    </div>
  );
}

export default StakesList;
