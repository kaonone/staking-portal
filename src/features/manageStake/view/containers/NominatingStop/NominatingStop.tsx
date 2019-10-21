import React from 'react';

import { useDeps } from 'core';
import { useTranslate } from 'services/i18n';
import { Button, Typography, Grid, CircleProgressBar, Hint } from 'shared/view/elements';
import { useCommunication, useOnChangeState } from 'shared/helpers/react';

import { useStyles } from './NominatingStop.style';

interface IProps {
  address: string;
  onCancel: () => void;
}

function NominatingStop(props: IProps) {
  const { onCancel, address } = props;

  const { api } = useDeps();
  const classes = useStyles();
  const { t, tKeys: tKeysAll } = useTranslate();
  const tKeys = tKeysAll.features.manageStake.nominatingStop;

  const { execute: executeNominatingStop, error, status } = useCommunication(() => api.stopNominating(address), [
    address,
  ]);

  const submitting = status === 'pending';

  useOnChangeState(
    status,
    (prevStatus: string, currentStatus: string): boolean => {
      return prevStatus === 'pending' && currentStatus === 'success';
    },
    () => {
      onCancel();
    },
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" weight="bold" noWrap gutterBottom className={classes.title}>
          {t(tKeys.title.getKey())}
        </Typography>
        <Hint>{t(tKeys.description.getKey())}</Hint>
      </Grid>
      {!!error && (
        <Grid item xs={12}>
          <Hint>
            <Typography color="error">{error}</Typography>
          </Hint>
        </Grid>
      )}
      <Grid item xs={6}>
        <Button variant="outlined" color="primary" fullWidth onClick={onCancel}>
          {t(tKeys.cancelButtonText.getKey())}
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" color="primary" fullWidth disabled={submitting} onClick={executeNominatingStop}>
          {submitting ? <CircleProgressBar size={24} /> : t(tKeys.submitButtonText.getKey())}
        </Button>
      </Grid>
    </Grid>
  );
}

export default NominatingStop;
