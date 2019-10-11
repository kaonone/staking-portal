import React, { useMemo } from 'react';
import { empty, of } from 'rxjs';
import { pluck } from 'ramda';
import BN from 'bn.js';

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
  Checkbox,
  Hint,
} from 'shared/view/elements';
import BalanceValue from 'components/BalanceValue';
import { usePagination } from 'shared/view/hooks';
import { useSubscribable } from 'shared/helpers/react';

import { useStyles } from './ValidatorsList.style';

const tKeys = tKeysAll.features.validators.list;

interface IProps {
  validatorStashes?: string[];
}

function ValidatorsList(props: IProps) {
  const { validatorStashes } = props;
  const { api } = useDeps();
  const [validators, validatorsMeta] = useSubscribable(
    () => (validatorStashes ? of(validatorStashes) : api.getValidators$()),
    [validatorStashes],
    [],
  );
  const { loaded: validatorsLoaded, error: validatorsLoadingError } = validatorsMeta;

  const isStashAddresses = !!validatorStashes;

  const classes = useStyles();
  const { t } = useTranslate();

  const headerCells = [
    '#',
    t(tKeys.columns.address.getKey()),
    t(tKeys.columns.ownStake.getKey()),
    t(tKeys.columns.commission.getKey()),
    t(tKeys.columns.otherStakes.getKey()),
    t(tKeys.columns.myStake.getKey()),
  ];

  const cellsAlign: Array<'left' | 'center' | 'right'> = ['center', 'left', 'left', 'left', 'left', 'left'];

  const { items: paginatedValidators, paginationView } = usePagination(validators || []);

  if (!validatorsLoaded) {
    return (
      <Hint>
        <CircleProgressBar />
      </Hint>
    );
  }

  if (!!validatorsLoadingError) {
    return (
      <Hint>
        <Typography color="error">{validatorsLoadingError}</Typography>
      </Hint>
    );
  }

  return !paginatedValidators.length ? (
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
          {paginatedValidators.map((validatorController, index) => (
            <ValidatorRow
              key={validatorController}
              index={index}
              address={validatorController}
              isStashAddress={isStashAddresses}
              cellsAlign={cellsAlign}
            />
          ))}
        </TableBody>
      </Table>
      <div className={classes.pagination}>{paginationView}</div>
    </div>
  );
}

interface IValidatorRowProps {
  index: number;
  address: string;
  cellsAlign: Array<'left' | 'center' | 'right'>;
  isStashAddress: boolean;
}

function ValidatorRow({ address, index, cellsAlign, isStashAddress }: IValidatorRowProps) {
  const classes = useStyles();
  const { api } = useDeps();

  const [accounts, accountsMeta] = useSubscribable(() => api.getSubstrateAccounts$(), [], []);

  const [ledger, ledgerMeta] = useSubscribable(
    () => (isStashAddress ? of(null) : api.getStakingLedger$(address)),
    [address, isStashAddress],
    null,
  );
  const stashAddress = isStashAddress ? address : ledger && ledger.stash;

  const [info, infoMeta] = useSubscribable(
    () => (stashAddress ? api.getStakingInfo$(address) : empty()),
    [stashAddress],
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

  const cells = [
    <Typography key="1" variant="body1" className={classes.memberNumber}>
      {index + 1}
    </Typography>,
    renderInfoCell(stashAddress, [ledgerMeta]),
    renderInfoCell(ownStake && <BalanceValue input={ownStake} />, [ledgerMeta, infoMeta]),
    renderInfoCell(validatorCommission && <BalanceValue input={validatorCommission} />, [ledgerMeta, infoMeta]),
    renderInfoCell(otherStakes && <BalanceValue input={otherStakes} />, [ledgerMeta, infoMeta]),
    renderInfoCell(<BalanceValue input={userStake} />, [ledgerMeta, infoMeta, accountsMeta]),
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

export default ValidatorsList;
