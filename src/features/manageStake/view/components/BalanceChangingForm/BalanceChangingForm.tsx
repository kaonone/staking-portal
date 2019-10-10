import React from 'react';
import { Form } from 'react-final-form';
import Grid from '@material-ui/core/Grid';

import { Button, Typography } from 'shared/view/elements';
import { TextInputField } from 'shared/view/form';

import { useStyles } from './BalanceChangingForm.style';
import { FieldState } from 'final-form';

interface IProps<N extends string> {
  title: string;
  placeholder: string;
  fieldName: N;
  cancelButtonText: string;
  submitButtonText: string;
  validate: (value?: any, allValues?: {}, meta?: FieldState) => any;
  onSubmit: (values: { [key in N]: string }) => void;
  onCancel: () => void;
}

function BalanceChangingForm<N extends string>(props: IProps<N>) {
  const classes = useStyles();

  const initialValues = React.useMemo(() => ({
    [fieldName]: '',
  }), []);

  const {
    title,
    placeholder,
    fieldName,
    cancelButtonText,
    submitButtonText,
    validate,
    onSubmit,
    onCancel,
  } = props;

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      {formProps => (
        <form onSubmit={formProps.handleSubmit} className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                weight="bold"
                noWrap
                gutterBottom
              >
                {title}
              </Typography>
              <TextInputField
                variant="outlined"
                validate={validate}
                name={fieldName}
                placeholder={placeholder}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={onCancel}
              >
                {cancelButtonText}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                {submitButtonText}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
}

export default BalanceChangingForm;
