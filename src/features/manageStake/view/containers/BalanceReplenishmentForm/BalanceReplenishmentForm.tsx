import React from 'react';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import BalanceChangingForm from '../../components/BalanceChangingForm/BalanceChangingForm';

function BalanceReplenishmentForm() {
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.manageStake.balanceReplenishmentForm;

  const onSubmit = () => {
    console.log('Submit form');
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
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}

export default BalanceReplenishmentForm;
