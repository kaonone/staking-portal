import * as React from 'react';
import { GetProps } from '_helpers';
import { formatBalance } from '@polkadot/util';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import TextInput from 'shared/view/elements/Input/TextInput';
import { calculateNumberFromDecimals } from 'shared/helpers/calculateNumberFromDecimals';

interface IOwnProps {
  baseDecimals: number;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

interface IOption<T> {
  value: T;
  text: string;
}

type IProps = IOwnProps & Omit<GetProps<typeof TextInput>, 'ref'>;

function DecimalsInput(props: IProps) {
  const { placeholder, onChange, baseDecimals, value, ...restInputProps } = props;

  const getInitialValues = (initialAmount: string): { prefix: number; roundedValue: string } => {
    const zeros = [];
    const amountString = initialAmount;

    amountString
      .split('')
      .reverse()
      .every(num => {
        if (num === '0') {
          zeros.push(num);
          return true;
        }
      });

    const prefix = zeros.length ? zeros.length - (zeros.length % 3) : 0;
    const roundedValue = initialAmount.substr(0, initialAmount.length - prefix);

    return {
      prefix,
      roundedValue,
    };
  };

  const [decimals, setDecimals] = React.useState(getInitialValues(value).prefix);
  const [amount, setAmount] = React.useState(getInitialValues(value).roundedValue);

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDecimals(Number(event.target.value));
    onChange(calculateNumberFromDecimals(amount, Number(event.target.value), baseDecimals));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isValidValue =
      !Number.isNaN(Number(event.target.value)) &&
      Number.isInteger(Number(event.target.value)) &&
      Number(event.target.value) >= 0;

    if (isValidValue) {
      setAmount(event.target.value);
      onChange(calculateNumberFromDecimals(event.target.value, decimals, baseDecimals));
    } else {
      setAmount(amount);
      onChange(calculateNumberFromDecimals(amount, decimals, baseDecimals));
    }
  };

  const options = formatBalance.getOptions().map(
    ({ power, text }): IOption<number> => ({
      value: power,
      text,
    }),
  );

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <TextInput
            {...restInputProps}
            value={amount}
            variant="outlined"
            placeholder={placeholder}
            fullWidth
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            value={decimals}
            onChange={handleSelectChange}
            variant="outlined"
            fullWidth
          >
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </>
  );
}

export default DecimalsInput;
