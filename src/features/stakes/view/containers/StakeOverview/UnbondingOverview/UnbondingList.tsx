import * as React from 'react';
import BN from 'bn.js';
import { formatBalance } from '@polkadot/util';

import { useTranslate } from 'services/i18n';
import { Hint, Typography, Table as GeneralTable, MakeTableType } from 'shared/view/elements';
import { usePagination } from 'shared/view/hooks';
import { Theme, colors, makeStyles } from 'shared/styles';

const Table = GeneralTable as MakeTableType<IItem>;

interface IItem {
  value: BN;
  remainingBlocks: BN;
}

interface IProps {
  list: IItem[];
}

function UnbondingList({ list }: IProps) {
  const classes = useStyles();
  const { t, tKeys: tKeysAll } = useTranslate();
  const tKeys = tKeysAll.features.stakes.unbondingList;

  const { items: paginatedList, paginationView } = usePagination(list);

  return !paginatedList.length ? (
    <Hint>
      <Typography>{t(tKeys.notFound.getKey())}</Typography>
    </Hint>
  ) : (
    <div>
      <Table data={paginatedList} separated>
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
          <Table.Head align={'right'}>{t(tKeys.columns.size.getKey())}</Table.Head>
          <Table.Cell align={'right'}>{({ data }) => formatBalance(data.value)}</Table.Cell>
        </Table.Column>
        <Table.Column>
          <Table.Head align={'right'}>{t(tKeys.columns.blocksLeft.getKey())}</Table.Head>
          <Table.Cell align={'right'}>{({ data }) => data.remainingBlocks.toString()}</Table.Cell>
        </Table.Column>
      </Table>
      <div className={classes.pagination}>{paginationView}</div>
    </div>
  );
}

export const useStyles = makeStyles((theme: Theme) => {
  return {
    memberNumber: {
      color: colors.topaz,
    },

    pagination: {
      marginBottom: theme.spacing(2),
    },
  };
});

export default UnbondingList;
