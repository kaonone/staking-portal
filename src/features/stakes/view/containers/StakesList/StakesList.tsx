import React from 'react';
import BN from 'bn.js';
import { Link } from 'react-router-dom';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import { useDeps } from 'core';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  CircleProgressBar,
  LinearProgress,
  IconButton,
  Hint,
} from 'shared/view/elements';
import { OpenInNewOutlined } from 'shared/view/elements/Icons';
import BalanceValue from 'components/BalanceValue';
import { usePagination } from 'shared/view/hooks';
import { useSubscribable } from 'shared/helpers/react';

import { useStyles } from './StakesList.style';

const tKeys = tKeysAll.features.stakes.list;

interface IProps {
  makeLinkToStake(accountAddress: string): string;
}

function StakesList(props: IProps) {
  const { api } = useDeps();
  const [accounts, accountsMeta] = useSubscribable(() => api.getSubstrateAccounts$(), [], []);
  const { loaded: accountsLoaded, error: accountsLoadingError } = accountsMeta;

  const classes = useStyles();
  const { t } = useTranslate();

  const headerCells = [
    '#',
    t(tKeys.columns.name.getKey()),
    t(tKeys.columns.nominees.getKey()),
    t(tKeys.columns.size.getKey()),
    t(tKeys.columns.awaitingWithdrawal.getKey()),
    '',
  ];

  const cellsAlign: Array<'left' | 'center' | 'right'> = ['center', 'left', 'left', 'left', 'left', 'center'];

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

  return !paginatedAccounts.length
    ? (
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
            {paginatedAccounts.map((account, index) => (
              <StakeRow
                {...props}
                key={account.address}
                index={index}
                account={account}
                cellsAlign={cellsAlign}
              />
            ))}
          </TableBody>
        </Table>
        <div className={classes.pagination}>
          {paginationView}
        </div>
      </div>
    );
}

interface IValidatorRowProps extends IProps {
  index: number;
  account: InjectedAccountWithMeta;
  cellsAlign: Array<'left' | 'center' | 'right'>;
}

function StakeRow({ account, index, cellsAlign, makeLinkToStake }: IValidatorRowProps) {
  const classes = useStyles();
  const { api } = useDeps();

  const [info, infoMeta] = useSubscribable(
    () => api.getStakingInfo$(account.address),
    [account.address],
    null,
  );

  const renderInfoCell = (content: React.ReactNode, metas: Array<{ loaded: boolean; error: string | null }>) => {
    const loaded = metas.every(value => value.loaded);
    const error = (metas.find(value => value.error) || { error: null }).error;

    return (
      <>
        {!loaded && <LinearProgress />}
        {loaded && (error ? <Typography color="error">{error}</Typography> : content)}
      </>
    );
  };

  const nominatorsCount = info && info.nominators ? info.nominators.length : 0;
  const stakeSize = info && info.stakingLedger ? info.stakingLedger.active : new BN(0);
  const awaitingWithdrawal = info && info.stakingLedger
    ? info.stakingLedger.unlocking
      .map(item => item.value)
      .reduce((acc, cur) => acc.add(cur), new BN(0))
    : new BN(0);

  const cells = [(
    <Typography className={classes.memberNumber}>
      {index + 1}
    </Typography>
  ),
  renderInfoCell(account.meta.name || account.address, []),
  renderInfoCell(nominatorsCount, [infoMeta]),
  renderInfoCell(<BalanceValue input={stakeSize} />, [infoMeta]),
  renderInfoCell(<BalanceValue input={awaitingWithdrawal} />, [infoMeta]),
  renderInfoCell((
    <IconButton component={Link} to={makeLinkToStake(account.address)} className={classes.iconButton}>
      <OpenInNewOutlined fontSize="inherit" />
    </IconButton>
  ), []),
  ];

  return (
    <TableRow>
      {cells.map((cell, k) => (
        <TableCell key={k} align={cellsAlign[k]}>
          {cell}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default StakesList;
