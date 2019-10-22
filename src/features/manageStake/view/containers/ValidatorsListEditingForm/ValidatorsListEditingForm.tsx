import React from 'react';
import { FORM_ERROR } from 'final-form';

import { useDeps } from 'core';
import { getErrorMsg } from 'shared/helpers';
import ValidatorsListEditingForm, {
  IFormData,
} from '../../components/ValidatorsListEditingForm/ValidatorsListEditingForm';

interface IProps {
  address: string;
  initialCheckedValidators: string[];
  onCancel(): void;
}

function ValidatorsListEditing(props: IProps) {
  const { onCancel, address, initialCheckedValidators } = props;

  const { api } = useDeps();

  const onSubmit = React.useCallback(
    async (values: IFormData) => {
      try {
        values.checkedValidators.length
          ? await api.editNominees(address, values.checkedValidators)
          : await api.stopNominating(address);

        onCancel();
      } catch (error) {
        return {
          [FORM_ERROR]: getErrorMsg(error),
        };
      }
    },
    [address, onCancel],
  );

  return (
    <ValidatorsListEditingForm
      initialCheckedValidators={initialCheckedValidators}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}

export default ValidatorsListEditing;
