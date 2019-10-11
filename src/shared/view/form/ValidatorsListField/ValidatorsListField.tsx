import React, { useCallback } from 'react';
import { FieldRenderProps } from 'react-final-form';

import { getFieldWithComponent } from 'shared/helpers/react';
import { ValidatorsList } from 'features/validators';

function ValidatorsListField(props: FieldRenderProps) {
  const { input } = props;

  const onCheck = useCallback((value: string) => () => {
    const checkedValidators = input.value;
    const index = checkedValidators.indexOf(value);
    const isValidatorChecked = index !== -1;

    return isValidatorChecked ? checkedValidators.splice(index, 1) : checkedValidators.push(value);
  }, [input]);

  return (
    <ValidatorsList checkedValidators={input.value} onCheckValidator={onCheck} />
  );
}

export default getFieldWithComponent(ValidatorsListField);
