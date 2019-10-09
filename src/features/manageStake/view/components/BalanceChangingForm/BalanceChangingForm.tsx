import React from 'react';
import { Form } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import { Button, Typography } from 'shared/view/elements';
import { NumberInputField } from 'shared/view/form';
import { provideStyles, StylesProps } from './BalanceChangingForm.style';

interface IOwnProps {
  title: string;
  placeholder: string;
  fieldName: string;
  cancelButtonText: string;
  submitButtonText: string;
  onSubmit: () => void;
  onCancel: () => void;
}

type IProps = IOwnProps & StylesProps;

class BalanceChangingForm extends React.Component<IProps> {
  public render() {
    const {
      classes,
      title,
      placeholder,
      fieldName,
      cancelButtonText,
      submitButtonText,
      onSubmit,
      onCancel,
    } = this.props;

    return (
      <Form onSubmit={onSubmit}>
        {props => (
          <form onSubmit={props.handleSubmit} className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" noWrap weight="bold" className={classes.title}>{title}</Typography>
                <NumberInputField
                  variant="outlined"
                  decimalSeparator={'.'}
                  allowNegative={false}
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
}

export default provideStyles(BalanceChangingForm);
