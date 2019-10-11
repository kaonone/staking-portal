import React from 'react';

import { useDeps } from 'core';
import { ModalButton } from 'shared/view/components';
import { Button, CircleProgressBar } from 'shared/view/elements';
import { useSubscribable } from 'shared/helpers/react';

import BalanceReplenishmentForm from '../view/containers/BalanceReplenishmentForm/BalanceReplenishmentForm';
import CashWithdrawalForm from '../view/containers/CashWithdrawalForm/CashWithdrawalForm';

export function useStakeActions(address: string) {
  const { api } = useDeps();
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(address), [address]);

  const isEmptyNominees = !info || !info.nominators || !info.nominators.length;

  const needToShowNomineesButtons = infoMeta.loaded && !infoMeta.error;
  const changeNomineesButtons = isEmptyNominees
    ? [
        <Button disabled variant="contained" key="Nominate">
          Nominate
        </Button>,
      ]
    : [
        <Button disabled variant="contained" key="Edit nominees">
          Edit nominees
        </Button>,
        <Button disabled variant="contained" key="Stop nominations">
          Stop nominations
        </Button>,
      ];

  const actions = React.useMemo(
    () =>
      ([[BalanceReplenishmentForm, 'Deposit'], [CashWithdrawalForm, 'Withdraw']] as const)
        .map(([Form, buttonText]) => (
          <ModalButton key={buttonText} variant="contained" content={buttonText}>
            {({ closeModal }) => <Form onCancel={closeModal} address={address} />}
          </ModalButton>
        ))
        .concat(needToShowNomineesButtons ? changeNomineesButtons : [<CircleProgressBar key="Loader" />]),
    [needToShowNomineesButtons, address],
  );

  return actions;
}
