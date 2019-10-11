import React from 'react';

import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import BalanceChangingForm, { IFormData } from '../../components/BalanceChangingForm/BalanceChangingForm';

function CashWithdrawalForm() {
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.manageStake.cashWithdrawalForm;

  const onSubmit = (values: IFormData) => {
    console.log('Submit form', values);
  };

  const onCancel = () => {
    console.log('Cancel form');
  };

  return (
    <BalanceChangingForm
      title={t(tKeys.title.getKey())}
      placeholder={t(tKeys.field.placeholder.getKey())}
      cancelButtonText={t(tKeys.cancelButtonText.getKey())}
      submitButtonText={t(tKeys.submitButtonText.getKey())}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}

export default CashWithdrawalForm;
