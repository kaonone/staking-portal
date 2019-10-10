import React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { composeValidators } from 'shared/validators';
import validateFloat from 'shared/validators/validateFloat';
import validatePositiveNumber from 'shared/validators/validatePositiveNumber';

import BalanceChangingForm from '../../components/BalanceChangingForm/BalanceChangingForm';

function CashWithdrawalForm() {
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.manageStake.cashWithdrawalForm;

  const onSubmit = (values: { [key: string]: string; }) => {
    console.log('Submit form', values);
  };

  const onCancel = () => {
    console.log('Cancel form');
  };

  return (
    <BalanceChangingForm
      title={t(tKeys.title.getKey())}
      placeholder={t(tKeys.field.placeholder.getKey())}
      fieldName={t(tKeys.field.name.getKey())}
      cancelButtonText={t(tKeys.cancelButtonText.getKey())}
      submitButtonText={t(tKeys.submitButtonText.getKey())}
      validate={composeValidators(validateFloat(18), validatePositiveNumber)}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}

export default CashWithdrawalForm;
