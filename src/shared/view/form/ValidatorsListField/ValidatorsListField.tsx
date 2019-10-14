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

  const onCheck = useCallback(
    (address: string) => () => {
      const isValidatorChecked = value.includes(address);
      const nextValue = isValidatorChecked ? value.filter(item => item !== address) : [...value, address];
      onChange(nextValue);
    },
    [value, onChange],
  );

  const onCheckAll = useCallback(
    (allValidators: string[]) => () => {
      const isAllValidatorsChecked = allValidators.every(validator => value.includes(validator));

      const nextValue = isAllValidatorsChecked
        ? value.filter(item => !allValidators.includes(item))
        : Array.from(new Set([...value, ...allValidators]));
      onChange(nextValue);
    },
    [value, onChange],
  );

  return <ValidatorsList checkedValidators={value} onCheckValidator={onCheck} onCheckAllValidators={onCheckAll} />;
}

export default getFieldWithComponent(ValidatorsListField);
