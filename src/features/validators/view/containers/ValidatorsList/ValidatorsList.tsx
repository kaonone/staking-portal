import React, { useMemo } from 'react';
import cn from 'classnames';
import { empty } from 'rxjs';
import { pluck } from 'ramda';
import BN from 'bn.js';

import { useDeps } from 'core';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { Table, TableHead, TableRow, TableCell, Typography, TableBody, CircleProgressBar, LinearProgress } from 'shared/view/elements';
import { usePagination } from 'shared/view/hooks';
import BalanceValue from 'components/BalanceValue';
import { useSubscribable } from 'shared/helpers/react';

import { useStyles } from './ValidatorsList.style';

const tKeys = tKeysAll.features.validators.list;

function ValidatorsList() {
  const { api } = useDeps();
  const [validatorControllers, loadingMeta] = useSubscribable(() => api.getValidators$(), [], []);
  const { loaded: validatorsLoaded, error: validatorsLoadingError } = loadingMeta;

  const classes = useStyles();
  const { t } = useTranslate();

  const headerCells = [
    '#',
    t(tKeys.colums.address.getKey()),
    t(tKeys.colums.ownStake.getKey()),
    t(tKeys.colums.commission.getKey()),
    t(tKeys.colums.otherStakes.getKey()),
    t(tKeys.colums.myStake.getKey()),
  ];

  const cellsAlign: Array<'left' | 'center' | 'right'> = ['center', 'left', 'left', 'left', 'left', 'left'];

  const { items: paginatedValidatorControllers, paginationView } = usePagination(validatorControllers || []);

  if (!validatorsLoaded) {
    return (
      <div className={classes.hint}>
        <CircleProgressBar />
      </div>
    );
  }

  if (!!validatorsLoadingError) {
    return (
      <div className={classes.hint}>
        <Typography color="error">{validatorsLoadingError}</Typography>
      </div>
    );
  }

  return !paginatedValidatorControllers.length
    ? (
      <div className={classes.hint}>
        <Typography>{t(tKeys.notFound.getKey())}</Typography>
      </div>
    ) : (
      <div>
        <Table separated className={classes.table}>
          <TableHead>
            <TableRow className={classes.header}>
              {headerCells.map((title, i) => (
                <TableCell key={i} align={cellsAlign[i]} className={cn(classes.cell, classes.headerCell)}>
                  <Typography variant="subtitle1" className={classes.headerTitle}>{title}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedValidatorControllers.map((validatorController, index) => (
              <ValidatorRow
                key={validatorController}
                index={index}
                controllerAddress={validatorController}
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

interface IValidatorRowProps {
  index: number;
  controllerAddress: string;
  cellsAlign: Array<'left' | 'center' | 'right'>;
}

function ValidatorRow({ controllerAddress, index, cellsAlign }: IValidatorRowProps) {
  const classes = useStyles();
  const { api } = useDeps();

  const [accounts, accountsMeta] = useSubscribable(() => api.getSubstrateAccounts$(), [], []);

  const [ledger, ledgerMeta] = useSubscribable(
    () => api.getStakingLedger$(controllerAddress),
    [controllerAddress],
    null,
  );
  const stashAddress = ledger && ledger.stash;

  const [info, infoMeta] = useSubscribable(
    () => stashAddress ? api.getStakingInfo$(controllerAddress) : empty(),
    [stashAddress],
    null,
  );

  const renderInfoCell = (content: React.ReactNode, metas: Array<{ loaded: boolean; error: string | null }>) => {
    const loaded = metas.every(value => value.loaded);
    const error = (metas.find(value => value.error) || { error: null }).error;

    return (
      <>
        {!loaded && <LinearProgress />}
        {loaded && (
          <Typography variant="body2">
            {error ? error : content}
          </Typography>
        )}
      </>
    );
  };

  const stakers = info && info.stakers;
  const ownStake = stakers && stakers.own;
  const otherStakes = stakers && stakers.total.sub(stakers.own);
  const validatorCommission = info && info.validatorPrefs && info.validatorPrefs.validatorPayment;

  const userStake = useMemo(() => {
    if (!stakers) {
      return new BN(0);
    }
    const accountAddresses = pluck('address', accounts);
    return stakers.others
      .filter(item => accountAddresses.includes(item.who))
      .map(item => item.value)
      .reduce((acc, cur) => acc.add(cur), new BN(0));
  }, [stakers, accounts]);

  const cells = [(
    <Typography variant="body1" className={classes.memberNumber}>
      {index + 1}
    </Typography>
  ),
  renderInfoCell(stashAddress, [ledgerMeta]),
  renderInfoCell(ownStake && <BalanceValue input={ownStake} />, [ledgerMeta, infoMeta]),
  renderInfoCell(validatorCommission && <BalanceValue input={validatorCommission} />, [ledgerMeta, infoMeta]),
  renderInfoCell(otherStakes && <BalanceValue input={otherStakes} />, [ledgerMeta, infoMeta]),
  renderInfoCell(<BalanceValue input={userStake} />, [ledgerMeta, infoMeta, accountsMeta]),
  ];

  return (
    <TableRow className={classes.row}>
      {cells.map((cell, k) => (
        <TableCell
          key={k}
          className={classes.cell}
          align={cellsAlign[k]}
        >
          {cell}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default ValidatorsList;
