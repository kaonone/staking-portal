import * as React from 'react';
import cn from 'classnames';

import { useCall } from 'services/api';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { Table, TableHead, TableRow, TableCell, Typography, TableBody, CircleProgressBar, LinearProgress } from 'shared/view/elements';
import { usePagination } from 'shared/view/hooks';

import { useStyles } from './ValidatorsList.style';

const tKeys = tKeysAll.features.validators.list;

function ValidatorsList() {
  const [validatorControllers, { loaded: validatorControllersLoaded }] = useCall('query.session.validators');

  const classes = useStyles();
  const { t } = useTranslate();

  const headerCells = [
    '#',
    t(tKeys.colums.address.getKey()),
    t(tKeys.colums.bonded.getKey()),
    t(tKeys.colums.total.getKey()),
    t(tKeys.colums.reward.getKey()),
    t(tKeys.colums.myStake.getKey()),
  ];

  const cellsAlign: Array<'left' | 'center' | 'right'> = ['center', 'left', 'left', 'left', 'left', 'left'];

  const { items: paginatedValidatorControllers, paginationView } = usePagination(validatorControllers || []);

  if (!validatorControllersLoaded) {
    return (
      <div className={classes.hint}>
        <CircleProgressBar />
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
  const [ledger, ledgerMeta] = useCall('query.staking.ledger', { args: controllerAddress });
  const stashAddress = ledger && ledger.stash;
  const [info, infoMeta] = useCall(
    'derive.staking.info',
    { args: stashAddress || '', isSuspendedCall: !stashAddress },
  );

  const { error: ledgerError, loaded: ledgerLoaded } = ledgerMeta;
  const { error: infoError, loaded: infoLoaded } = infoMeta;

  const renderInfoCell = (content: React.ReactNode) => (
    <>
      {!infoLoaded && <LinearProgress />}
      {infoLoaded && (
        <Typography variant="body2">
          {infoError ? 'Error' : content}
        </Typography>
      )}
    </>
  );

  const cells = [(
    <Typography variant="body1" className={classes.memberNumber}>
      {index + 1}
    </Typography>
  ), (
    <>
      {!ledgerLoaded && <LinearProgress />}
      {ledgerLoaded && (
        <Typography variant="body2">
          {ledgerError ? 'Error' : stashAddress}
        </Typography>

      )}
    </>
  ),
  renderInfoCell(info && '10 AKRO'),
  renderInfoCell(info && '10 AKRO'),
  renderInfoCell(info && '10 AKRO'),
  renderInfoCell(info && '10 AKRO'),
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
