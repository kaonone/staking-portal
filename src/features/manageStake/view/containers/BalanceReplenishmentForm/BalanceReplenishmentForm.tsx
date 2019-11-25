import React from 'react';
import { FORM_ERROR } from 'final-form';
import BN from 'bn.js';

import { useDeps } from 'core';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';

import { Loading } from 'shared/view/elements';
import { getErrorMsg, max } from 'shared/helpers';
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

  const [balance] = useSubscribable(() => api.getBalanceInfo$(address), [address]);
  const [fee] = useSubscribable(() => api.getFeesInfo$(address), [address]);

  const minBalanceAfterBonding =
    (fee && max(fee.transactionBaseFee, fee.transactionByteFee).mul(new BN(1000))) || new BN(0);

  const availableAmount =
    (balance && balance.availableBalance.gt(new BN(1000)) && balance.availableBalance.sub(minBalanceAfterBonding)) ||
    new BN(0);

  const onSubmit = React.useCallback(
    async (values: IFormData) => {
      try {
        isExistsStake
          ? await api.depositToStake(address, new BN(values.amount))
          : await api.createStake(address, new BN(values.amount));

        onCancel();
      } catch (error) {
        return {
          [FORM_ERROR]: getErrorMsg(error),
        };
      }
    },
    [isExistsStake, address, onCancel],
  );

  return (
    <Loading meta={[isExistsStakeMeta]} variant="hint" progressVariant="circle">
      <BalanceChangingForm
        availableAmount={availableAmount}
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
