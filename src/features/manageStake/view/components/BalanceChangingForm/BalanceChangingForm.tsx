import React from 'react';
import * as R from 'ramda';
import { Form } from 'react-final-form';
import BN from 'bn.js';
import { formatBalance } from '@polkadot/util';

import { useDeps } from 'core';
import { Button, Typography, Grid, CircleProgressBar, Hint } from 'shared/view/elements';
import { DecimalsField, SpyField } from 'shared/view/form';
import { composeValidators, validatePositiveNumber, validateInteger, lessThenOrEqual } from 'shared/validators';
import { useSubscribable } from 'shared/helpers/react';

import { useStyles } from './BalanceChangingForm.style';

interface IFormData {
  amount: string;
  availableAmount: BN;
}

const fieldNames: { [K in keyof IFormData]: K } = {
  amount: 'amount',
  availableAmount: 'availableAmount',
};

interface IProps {
  availableAmount: BN;
  title: string;
  placeholder: string;
  cancelButtonText: string;
  submitButtonText: string;
  onSubmit: (values: IFormData) => void;
  onCancel: () => void;
}

function BalanceChangingForm(props: IProps) {
  const { title, placeholder, cancelButtonText, submitButtonText, onSubmit, onCancel, availableAmount } = props;

  const classes = useStyles();
  const { api } = useDeps();
  const [chainProps, chainPropsMeta] = useSubscribable(() => api.getChainProps$(), []);

  const initialValues = React.useMemo<IFormData>(
    () => ({
      amount: '',
      availableAmount,
    }),
    [],
  );

  const baseDecimals = chainProps ? chainProps.tokenDecimals : 0;
  const validateAmount = React.useMemo(() => {
    return composeValidators(
      validateInteger,
      validatePositiveNumber,
      R.curry(lessThenOrEqual)(availableAmount, R.__, formatBalance),
    );
  }, [availableAmount]);

  const compareValues = (prev: BN, current: BN) => prev.eq(current);

  if (!chainPropsMeta.loaded) {
    return (
      <Hint>
        <CircleProgressBar />
      </Hint>
    );
  }

  if (!!chainPropsMeta.error) {
    return (
      <Hint>
        <Typography color="error">{chainPropsMeta.error}</Typography>
      </Hint>
    );
  }

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues} subscription={{ submitError: true, submitting: true }}>
      {({ handleSubmit, submitError, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" weight="bold" noWrap gutterBottom className={classes.title}>
                {title}
              </Typography>
              <DecimalsField
                validate={validateAmount}
                baseDecimals={baseDecimals}
                name={fieldNames.amount}
                placeholder={placeholder}
              />
              <SpyField name={fieldNames.availableAmount} fieldValue={availableAmount} compare={compareValues} />
            </Grid>
            {!!submitError && (
              <Grid item xs={12}>
                <Hint>
                  <Typography color="error">{submitError}</Typography>
                </Hint>
              </Grid>
            )}
            <Grid item xs={6}>
              <Button variant="outlined" color="primary" fullWidth onClick={onCancel}>
                {cancelButtonText}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" type="submit" fullWidth disabled={submitting}>
                {submitting ? <CircleProgressBar size={24} /> : submitButtonText}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
}

export { IFormData };
export default BalanceChangingForm;
