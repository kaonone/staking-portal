import React from 'react';
import { Form } from 'react-final-form';
import Grid from '@material-ui/core/Grid';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { Button, Typography, Hint, CircleProgressBar } from 'shared/view/elements';
import ValidatorsListField from 'shared/view/form/ValidatorsListField/ValidatorsListField';

import { useStyles } from './ValidatorsListEditingForm.style';

interface IFormData {
  checkedValidators: string[];
}

const fieldNames: { [K in keyof IFormData]: K } = {
  checkedValidators: 'checkedValidators',
};
interface IProps {
  initialCheckedValidators: string[];
  onSubmit: (values: IFormData) => void;
  onCancel: () => void;
}

function ValidatorsListEditingForm(props: IProps) {
  const { initialCheckedValidators, onCancel, onSubmit } = props;
  const classes = useStyles();
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.manageStake.validatorsListEditingForm;

  const initialValues = React.useMemo<IFormData>(
    () => ({
      checkedValidators: initialCheckedValidators,
    }),
    [initialCheckedValidators.toString()],
  );

  return (
    <>
      <Form onSubmit={onSubmit} initialValues={initialValues} subscription={{ submitError: true, submitting: true }}>
        {({ handleSubmit, submitError, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" weight="bold" noWrap gutterBottom className={classes.title}>
                  {t(tKeys.title.getKey())}
                </Typography>
                <ValidatorsListField name={fieldNames.checkedValidators} />
              </Grid>
              {!!submitError && (
                <Grid item xs={12}>
                  <Hint>
                    <Typography color="error">{submitError}</Typography>
                  </Hint>
                </Grid>
              )}
              <Grid item xs={3}>
                <Button variant="outlined" color="primary" fullWidth onClick={onCancel}>
                  {t(tKeys.cancelButtonText.getKey())}
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" color="primary" type="submit" fullWidth disabled={submitting}>
                  {submitting ? <CircleProgressBar size={24} /> : t(tKeys.submitButtonText.getKey())}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Form>
    </>
  );
}

export { IFormData };
export default ValidatorsListEditingForm;
