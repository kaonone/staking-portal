import React from 'react';

import { useDeps } from 'core';
import { useTranslate } from 'services/i18n';
import { ModalButton } from 'shared/view/components';
import { CircleProgressBar } from 'shared/view/elements';
import { useSubscribable } from 'shared/helpers/react';

import ValidatorsListEditingForm from '../view/containers/ValidatorsListEditingForm/ValidatorsListEditingForm';
import NominatingStop from '../view/containers/NominatingStop/NominatingStop';

export function useStakeActions(address: string) {
  const { api } = useDeps();
  const { t, tKeys: allTKeys } = useTranslate();
  const tKeys = allTKeys.features.manageStake.actions;
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(address), [address]);

  const isEmptyNominees = !info || !info.nominators || !info.nominators.length;
  const nominators = (info && info.nominators) || [];

  const infoLoadedWithoutErrors = infoMeta.loaded && !infoMeta.error;

  const changeNomineesButtons = React.useMemo(
    () =>
      isEmptyNominees
        ? [
            <ModalButton
              key="Nominate"
              dialogMaxWidth="lg"
              color="secondary"
              variant="contained"
              content={t(tKeys.nominate.getKey())}
            >
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
              color="secondary"
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
            <ModalButton
              key="Stop nominating"
              color="secondary"
              variant="contained"
              content={t(tKeys.stopNominating.getKey())}
            >
              {({ closeModal }) => <NominatingStop onCancel={closeModal} address={address} />}
            </ModalButton>,
          ],
    [isEmptyNominees, address, nominators],
  );

  const actions = React.useMemo(
    () =>
      (infoMeta.loaded ? [] : [<CircleProgressBar key="Loader" />]).concat(
        infoLoadedWithoutErrors ? changeNomineesButtons : [],
      ),
    [infoLoadedWithoutErrors, changeNomineesButtons, address],
  );

  return actions;
}
