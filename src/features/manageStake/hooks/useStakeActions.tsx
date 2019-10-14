import React from 'react';

import { useDeps } from 'core';
import { useTranslate } from 'services/i18n';
import { ModalButton } from 'shared/view/components';
import { CircleProgressBar } from 'shared/view/elements';
import { useSubscribable } from 'shared/helpers/react';

import BalanceReplenishmentForm from '../view/containers/BalanceReplenishmentForm/BalanceReplenishmentForm';
import CashWithdrawalForm from '../view/containers/CashWithdrawalForm/CashWithdrawalForm';
import ValidatorsListEditingForm from '../view/containers/ValidatorsListEditingForm/ValidatorsListEditingForm';
import NominatingStop from '../view/containers/NominatingStop/NominatingStop';

export function useStakeActions(address: string) {
  const { api } = useDeps();
  const { t, tKeys: allTKeys } = useTranslate();
  const tKeys = allTKeys.features.manageStake.actions;
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(address), [address]);

  const isEmptyNominees = !info || !info.nominators || !info.nominators.length;
  const nominators = (info && info.nominators) || [];

  const needToShowNomineesButtons = infoMeta.loaded && !infoMeta.error;
  const changeNomineesButtons = React.useMemo(
    () =>
      isEmptyNominees
        ? [
            <ModalButton key="Nominate" dialogMaxWidth="lg" variant="contained" content={t(tKeys.nominate.getKey())}>
              {({ closeModal }) => (
                <ValidatorsListEditingForm
                  onCancel={closeModal}
                  address={address}
                  initialCheckedValidators={nominators}
                />
              )}
            </ModalButton>,
          ]
        : [
            <ModalButton
              key="Edit nominees"
              dialogMaxWidth="lg"
              variant="contained"
              content={t(tKeys.editNominees.getKey())}
            >
              {({ closeModal }) => (
                <ValidatorsListEditingForm
                  onCancel={closeModal}
                  address={address}
                  initialCheckedValidators={nominators}
                />
              )}
            </ModalButton>,
            <ModalButton key="Stop nominating" variant="contained" content={t(tKeys.stopNominating.getKey())}>
              {({ closeModal }) => <NominatingStop onCancel={closeModal} address={address} />}
            </ModalButton>,
          ],
    [isEmptyNominees, address, nominators],
  );

  const actions = React.useMemo(
    () =>
      ([
        [BalanceReplenishmentForm, t(tKeys.deposit.getKey())],
        [CashWithdrawalForm, t(tKeys.withdraw.getKey())],
      ] as const)
        .map(([Form, buttonText]) => (
          <ModalButton key={buttonText} variant="contained" content={buttonText}>
            {({ closeModal }) => <Form onCancel={closeModal} address={address} />}
          </ModalButton>
        ))
        .concat(needToShowNomineesButtons ? changeNomineesButtons : [<CircleProgressBar key="Loader" />]),
    [needToShowNomineesButtons, changeNomineesButtons, address],
  );

  return actions;
}
