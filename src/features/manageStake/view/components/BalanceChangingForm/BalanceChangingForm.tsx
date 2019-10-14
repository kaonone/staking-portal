import React from 'react';
import { Form } from 'react-final-form';

import { useDeps } from 'core';
import { TextInputField } from 'shared/view/form';
import { Button, Typography, Grid, CircleProgressBar, Hint } from 'shared/view/elements';
import { composeValidators, validateFloat, validatePositiveNumber } from 'shared/validators';
import { useSubscribable } from 'shared/helpers/react';

import { useStyles } from './BalanceChangingForm.style';

interface IFormData {
  amount: string;
}

const fieldNames: { [K in keyof IFormData]: K } = {
  amount: 'amount',
};

interface IProps {
  title: string;
  placeholder: string;
  cancelButtonText: string;
  submitButtonText: string;
  onSubmit: (values: IFormData) => void;
  onCancel: () => void;
}

function BalanceChangingForm(props: IProps) {
  const { title, placeholder, cancelButtonText, submitButtonText, onSubmit, onCancel } = props;

  const classes = useStyles();
  const { api } = useDeps();
  const [chainProps, chainPropsMeta] = useSubscribable(() => api.getChainProps$(), []);

  const initialValues = React.useMemo<IFormData>(
    () => ({
      amount: '',
    }),
    [],
  );

  const amountDecimals = chainProps ? chainProps.tokenDecimals : 0;
  const validateAmount = React.useMemo(() => {
    return composeValidators(validateFloat(amountDecimals), validatePositiveNumber);
  }, [amountDecimals]);

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
              <TextInputField
                variant="outlined"
                validate={validateAmount}
                name={fieldNames.amount}
                placeholder={placeholder}
                fullWidth
              />
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
