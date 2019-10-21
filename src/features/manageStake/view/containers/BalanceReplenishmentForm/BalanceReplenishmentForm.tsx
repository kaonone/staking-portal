import React from 'react';
import { FORM_ERROR } from 'final-form';
import BN from 'bn.js';

import { useDeps } from 'core';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { Loading } from 'shared/view/elements';
import { getErrorMsg } from 'shared/helpers';
import { useSubscribable } from 'shared/helpers/react';
import BalanceChangingForm, { IFormData } from '../../components/BalanceChangingForm/BalanceChangingForm';

interface IProps {
  address: string;
  onCancel(): void;
}

function BalanceReplenishmentForm(props: IProps) {
  const { onCancel, address } = props;
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.manageStake.balanceReplenishmentForm;

  const { api } = useDeps();
  const [isExistsStake, isExistsStakeMeta] = useSubscribable(() => api.checkStakeExisting$(address), [address]);

  const onSubmit = React.useCallback(
    async (values: IFormData) => {
      try {
        isExistsStake
          ? await api.depositToStake(address, new BN(values.amount))
          : await api.createStake(address, new BN(values.amount));
      } catch (error) {
        return {
          [FORM_ERROR]: getErrorMsg(error),
        };
      }
    },
    [isExistsStake, address],
  );

  return (
    <Loading meta={[isExistsStakeMeta]} variant="hint" progressVariant="circle">
      <BalanceChangingForm
        title={t(tKeys.title.getKey())}
        placeholder={t(tKeys.field.placeholder.getKey())}
        cancelButtonText={t(tKeys.cancelButtonText.getKey())}
        submitButtonText={t(tKeys.submitButtonText.getKey())}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Loading>
  );
}

export default BalanceReplenishmentForm;
