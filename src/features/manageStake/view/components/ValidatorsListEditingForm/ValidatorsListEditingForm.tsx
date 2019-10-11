import React from 'react';
import { Form } from 'react-final-form';
import Grid from '@material-ui/core/Grid';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';
import { Button, Typography } from 'shared/view/elements';
import ValidatorsListField from 'shared/view/form/ValidatorsListField/ValidatorsListField';

import { useStyles } from './ValidatorsListEditingForm.style';

interface IFormData {
  checkedValidators: string[];
}

const fieldNames: { [K in keyof IFormData]: K } = {
  checkedValidators: 'checkedValidators',
};

function ValidatorsListEditingForm() {
  const classes = useStyles();
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.manageStake.validatorsListEditingForm;

  const initialValues = React.useMemo<IFormData>(
    () => ({
      checkedValidators: [],
    }),
    [],
  );

  const onSubmit = (value: IFormData) => {
    console.log('Submit form', value);
  };

  const onCancel = () => {
    console.log('Cancel form');
  };

  return (
    <>
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {props => (
          <form onSubmit={props.handleSubmit} className={classes.root}>
            <Grid container justify={'space-between'} spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" weight="bold" noWrap gutterBottom>
                  {t(tKeys.title.getKey())}
                </Typography>
                <ValidatorsListField name={fieldNames.checkedValidators} />
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined" color="primary" fullWidth onClick={onCancel}>
                  {t(tKeys.cancelButtonText.getKey())}
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  {t(tKeys.submitButtonText.getKey())}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Form>
    </>
  );
}

export default ValidatorsListEditingForm;
