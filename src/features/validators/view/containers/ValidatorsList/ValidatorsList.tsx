import React, { useMemo } from 'react';
import { of } from 'rxjs';
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

type MakeValidatorsCheckingHandler = (address: string | string[]) => () => void;

interface IProps {
  validatorStashes?: string[];
  checkedValidators?: string[];
  makeValidatorsCheckingHandler?: MakeValidatorsCheckingHandler;
}

function ValidatorsList(props: IProps) {
  const { validatorStashes, checkedValidators, makeValidatorsCheckingHandler } = props;
  const { api } = useDeps();
  const [validators, validatorsMeta] = useSubscribable(
    () => (validatorStashes ? of(validatorStashes) : api.getValidators$()),
    [validatorStashes],
    [],
  );
  const { loaded: validatorsLoaded, error: validatorsLoadingError } = validatorsMeta;

  const classes = useStyles();
  const { t } = useTranslate();

  const { items: paginatedValidators, paginationView } = usePagination(validators || []);

  const renderCheckboxHeaderCell = () => {
    const isChecked =
      checkedValidators && paginatedValidators.every(validator => checkedValidators.includes(validator));

    return (
      <Checkbox
        checked={isChecked}
        onChange={makeValidatorsCheckingHandler ? makeValidatorsCheckingHandler(paginatedValidators) : undefined}
      />
    );
  };

  const headerCells = [
    '#',
    ...(checkedValidators ? [renderCheckboxHeaderCell()] : []),
    t(tKeys.columns.address.getKey()),
    t(tKeys.columns.ownStake.getKey()),
    t(tKeys.columns.commission.getKey()),
    t(tKeys.columns.otherStakes.getKey()),
    t(tKeys.columns.myStake.getKey()),
  ];

  const cellsAlign: Array<'left' | 'center' | 'right'> = [
    'center',
    ...(checkedValidators ? (['center'] as const) : []),
    'left',
    'left',
    'left',
    'left',
    'left',
  ];

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
          {paginatedValidators.map((stashAddress, index) => (
            <ValidatorRow
              key={stashAddress}
              index={index}
              stashAddress={stashAddress}
              cellsAlign={cellsAlign}
              checkedValidators={checkedValidators}
              makeValidatorsCheckingHandler={makeValidatorsCheckingHandler}
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
  stashAddress: string;
  cellsAlign: Array<'left' | 'center' | 'right'>;
  checkedValidators?: string[];
  makeValidatorsCheckingHandler?: MakeValidatorsCheckingHandler;
}

function ValidatorRow({
  checkedValidators,
  makeValidatorsCheckingHandler,
  stashAddress,
  index,
  cellsAlign,
}: IValidatorRowProps) {
  const classes = useStyles();
  const { api } = useDeps();

  const [accounts, accountsMeta] = useSubscribable(() => api.getSubstrateAccounts$(), [], []);

  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(stashAddress), [stashAddress], null);

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

  const renderCheckboxCell = (
    validators: string[],
    currentValidator: string,
    onChange?: MakeValidatorsCheckingHandler,
  ) => {
    const isChecked = validators.includes(currentValidator);

    return <Checkbox checked={isChecked} onChange={onChange ? onChange(currentValidator) : undefined} />;
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
    ...(checkedValidators ? [renderCheckboxCell(checkedValidators, stashAddress, makeValidatorsCheckingHandler)] : []),
    renderInfoCell(stashAddress, []),
    renderInfoCell(ownStake && <BalanceValue input={ownStake} />, [infoMeta]),
    renderInfoCell(validatorCommission && <BalanceValue input={validatorCommission} />, [infoMeta]),
    renderInfoCell(otherStakes && <BalanceValue input={otherStakes} />, [infoMeta]),
    renderInfoCell(<BalanceValue input={userStake} />, [infoMeta, accountsMeta]),
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
