import React, { useCallback } from 'react';
import { FieldRenderProps } from 'react-final-form';

import { getFieldWithComponent } from 'shared/helpers/react';
import { ValidatorsList } from 'features/validators';

interface IInput {
  value: string[];
  onChange(value: string[]): void;
}

function ValidatorsListField(props: FieldRenderProps) {
  const { value, onChange } = props.input as IInput;

  const makeHandler = useCallback(
    (validators: string | string[]) => () => {
      if (typeof validators === 'string') {
        const address = validators;

        const isValidatorChecked = value.includes(address);
        const nextValue = isValidatorChecked ? value.filter(item => item !== address) : [...value, address];

        onChange(nextValue);
      } else {
        const isAllValidatorsChecked =
          value.length === validators.length && validators.every(validator => value.includes(validator));
        const nextValue = isAllValidatorsChecked ? [] : validators;

        onChange(nextValue);
      }
    },
    [value, onChange],
  );

  return <ValidatorsList checkedValidators={value} makeValidatorsCheckingHandler={makeHandler} />;
}

export default getFieldWithComponent(ValidatorsListField);
