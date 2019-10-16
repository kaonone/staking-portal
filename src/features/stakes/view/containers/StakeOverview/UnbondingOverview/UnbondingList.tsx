import * as React from 'react';
import BN from 'bn.js';
import { formatBalance } from '@polkadot/util';

import { useTranslate } from 'services/i18n';
import { Hint, Typography, Table, TableHead, TableRow, TableCell, TableBody } from 'shared/view/elements';
import { usePagination } from 'shared/view/hooks';
import { Theme, colors, makeStyles } from 'shared/styles';

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

  const headerCells = ['#', t(tKeys.columns.size.getKey()), t(tKeys.columns.blocksLeft.getKey())];

  const cellsAlign: Array<'left' | 'center' | 'right'> = ['center', 'right', 'right'];

  const { items: paginatedList, paginationView } = usePagination(list);

  return !paginatedList.length ? (
    <Hint>
      <Typography>{t(tKeys.notFound.getKey())}</Typography>
    </Hint>
  ) : (
    <div>
      <Table separated>
        <TableHead>
          <TableRow>
            {headerCells.map((title, i) => (
              <TableCell key={i} align={cellsAlign[i]}>
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedList.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="center" className={classes.memberNumber}>{index + 1}</TableCell>
              <TableCell align="right">{formatBalance(item.value)}</TableCell>
              <TableCell align="right">{item.remainingBlocks.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
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
