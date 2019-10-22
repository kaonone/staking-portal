import React from 'react';
import BN from 'bn.js';
import { formatBalance } from '@polkadot/util';

import { useDeps } from 'core';
import { useTranslate } from 'services/i18n';
import { Button, Typography, Grid, CircleProgressBar, Hint, Loading } from 'shared/view/elements';
import { useCommunication, useOnChangeState, useSubscribable } from 'shared/helpers/react';

import { useStyles } from './CashRedeeming.style';

interface IProps {
  address: string;
  onCancel: () => void;
}

function CashRedeeming(props: IProps) {
  const { onCancel, address } = props;

  const { api } = useDeps();
  const classes = useStyles();
  const { t, tKeys: tKeysAll } = useTranslate();
  const tKeys = tKeysAll.features.manageStake.cashRedeeming;

  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(address), [address], null);
  const redeemable = (info && info.redeemable) || new BN(0);

  const { execute: executeCashRedeeming, error, status } = useCommunication(() => api.redeem(address), [address]);

  const submitting = status === 'pending';

  useOnChangeState(
    status,
    (prevStatus: string, currentStatus: string): boolean => prevStatus === 'pending' && currentStatus === 'success',
    () => onCancel(),
  );

  return (
    <div>
      <Typography variant="h5" weight="bold" noWrap gutterBottom className={classes.title}>
        {t(tKeys.title.getKey())}
      </Typography>
      <Loading meta={infoMeta} variant="hint">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Hint>{t(tKeys.description.getKey(), { amount: formatBalance(redeemable) })}</Hint>
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
            <Button variant="contained" color="primary" fullWidth disabled={submitting} onClick={executeCashRedeeming}>
              {submitting ? <CircleProgressBar size={24} /> : t(tKeys.submitButtonText.getKey())}
            </Button>
          </Grid>
        </Grid>
      </Loading>
    </div>
  );
}

export default CashRedeeming;
