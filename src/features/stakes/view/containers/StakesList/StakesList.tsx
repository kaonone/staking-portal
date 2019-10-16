import React from 'react';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import { useDeps } from 'core';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { Table as GenericTable, Typography, Hint, MakeTableType, Loading } from 'shared/view/elements';
import { usePagination } from 'shared/view/hooks';
import { useSubscribable } from 'shared/helpers/react';

import {
  AddressCell,
  AwaitingWithdrawalCell,
  LinkToStakeCell,
  NominatorsCountCell,
  StakeSizeCell,
  RedeemableCell,
} from '../../components/stakesTableCells/stakesTableCells';
import { useStyles } from './StakesList.style';

const Table = GenericTable as MakeTableType<InjectedAccountWithMeta>;

interface IProps {
  makeLinkToStake(accountAddress: string): string;
}

const tKeys = tKeysAll.features.stakes.list;

function StakesList(props: IProps) {
  const { api } = useDeps();
  const { makeLinkToStake } = props;
  const [accounts, accountsMeta] = useSubscribable(() => api.getSubstrateAccounts$(), [], []);

  const classes = useStyles();
  const { t } = useTranslate();

  const { items: paginatedAccounts, paginationView } = usePagination(accounts || []);

  return (
    <Loading meta={accountsMeta} variant="hint" progressVariant="circle">
      {!paginatedAccounts.length ? (
        <Hint>
          <Typography>{t(tKeys.notFound.getKey())}</Typography>
        </Hint>
      ) : (
        <div>
          <Table data={paginatedAccounts} separated>
            <Table.Column>
              <Table.Head align={'center'}>#</Table.Head>
              <Table.Cell align={'center'}>
                {({ index }) => (
                  <Typography variant="body1" className={classes.memberNumber}>
                    {index + 1}
                  </Typography>
                )}
              </Table.Cell>
            </Table.Column>
            <Table.Column>
              <Table.Head>{t(tKeys.columns.name.getKey())}</Table.Head>
              <Table.Cell>{({ data }) => <AddressCell account={data} />}</Table.Cell>
            </Table.Column>
            <Table.Column>
              <Table.Head>{t(tKeys.columns.nominees.getKey())}</Table.Head>
              <Table.Cell>{({ data }) => <NominatorsCountCell account={data} />}</Table.Cell>
            </Table.Column>
            <Table.Column>
              <Table.Head>{t(tKeys.columns.size.getKey())}</Table.Head>
              <Table.Cell>{({ data }) => <StakeSizeCell account={data} />}</Table.Cell>
            </Table.Column>
            <Table.Column>
              <Table.Head>{t(tKeys.columns.awaitingWithdrawal.getKey())}</Table.Head>
              <Table.Cell>{({ data }) => <AwaitingWithdrawalCell account={data} />}</Table.Cell>
            </Table.Column>
            <Table.Column>
              <Table.Head>{t(tKeys.columns.redeemable.getKey())}</Table.Head>
              <Table.Cell>{({ data }) => <RedeemableCell account={data} />}</Table.Cell>
            </Table.Column>
            <Table.Column>
              <Table.Cell align={'center'}>
                {({ data }) => <LinkToStakeCell account={data} makeLinkToStake={makeLinkToStake} />}
              </Table.Cell>
            </Table.Column>
          </Table>
          <div className={classes.pagination}>{paginationView}</div>
        </div>
      )}
    </Loading>
  );
}

export default StakesList;
