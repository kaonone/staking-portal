import React from 'react';
import { FORM_ERROR } from 'final-form';

import { useDeps } from 'core';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { CircleProgressBar, Typography } from 'shared/view/elements';
import { toBaseUnit, getErrorMsg } from 'shared/helpers';
import { useSubscribable } from 'shared/helpers/react';
import BalanceChangingForm, { IFormData } from '../../components/BalanceChangingForm/BalanceChangingForm';

interface IProps {
  address: string;
  onCancel(): void;
}

function CashWithdrawalForm(props: IProps) {
  const { onCancel, address } = props;
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.manageStake.cashWithdrawalForm;

  const { api } = useDeps();
  const [chainProps, chainPropsMeta] = useSubscribable(() => api.getChainProps$(), []);

  const onSubmit = React.useCallback(
    async (values: IFormData) => {
      const decimals = chainProps ? chainProps.tokenDecimals : 0;

      try {
        await api.withdrawFromStake(address, toBaseUnit(values.amount, decimals));
      } catch (error) {
        return {
          [FORM_ERROR]: getErrorMsg(error),
        };
      }
    },
    [address, chainProps],
  );

  if (!chainPropsMeta.loaded) {
    return (
      // TODO: need to wrap in Hint
      <CircleProgressBar />
    );
  }

  if (!!chainPropsMeta.error) {
    return (
      // TODO: need to wrap in Hint
      <Typography color="error">{chainPropsMeta.error}</Typography>
    );
  }

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
