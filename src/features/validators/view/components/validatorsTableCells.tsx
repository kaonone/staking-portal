import React, { useMemo } from 'react';
import BN from 'bn.js';
import { pluck } from 'ramda';
import { useDeps } from 'core';

import { Checkbox } from 'shared/view/elements';
import { useSubscribable } from 'shared/helpers/react';
import BalanceValue from 'components/BalanceValue';
import { MakeValidatorsCheckingHandler } from 'features/validators/view/containers/ValidatorsList/ValidatorsList';
import Loading from 'shared/view/elements/Loading/Loading';

interface ICellProps {
  stashAddress: string;
}

interface ICheckboxCellProps {
  stashAddress: string;
  checkedValidators: string[];
  makeValidatorsCheckingHandler: MakeValidatorsCheckingHandler;
}

function AddressCell({ stashAddress }: ICellProps) {
  return <>{stashAddress}</>;
}

function CheckboxCell({ stashAddress, checkedValidators, makeValidatorsCheckingHandler }: ICheckboxCellProps) {
  const isChecked = checkedValidators.includes(stashAddress);
  return <Checkbox checked={isChecked} onChange={makeValidatorsCheckingHandler(stashAddress)} />;
}

function OwnStakeCell({ stashAddress }: ICellProps) {
  const { api } = useDeps();
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(stashAddress), [stashAddress], null);
  const stakers = info && info.stakers;
  const ownStake = stakers && stakers.own;

  return <Loading metas={[infoMeta]}>{ownStake && <BalanceValue input={ownStake} />}</Loading>;
}

function ValidatorCommissionCell({ stashAddress }: ICellProps) {
  const { api } = useDeps();
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(stashAddress), [stashAddress], null);
  const validatorCommission = info && info.validatorPrefs && info.validatorPrefs.validatorPayment;

  return <Loading metas={[infoMeta]}>{validatorCommission && <BalanceValue input={validatorCommission} />}</Loading>;
}

function OtherStakesCell({ stashAddress }: ICellProps) {
  const { api } = useDeps();
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(stashAddress), [stashAddress], null);
  const stakers = info && info.stakers;
  const otherStakes = stakers && stakers.total.sub(stakers.own);

  return <Loading metas={[infoMeta]}>{otherStakes && <BalanceValue input={otherStakes} />}</Loading>;
}

function UserStakeCell({ stashAddress }: ICellProps) {
  const { api } = useDeps();
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(stashAddress), [stashAddress], null);
  const stakers = info && info.stakers;
  const [accounts, accountsMeta] = useSubscribable(() => api.getSubstrateAccounts$(), [], []);

  const userStake = useMemo(() => {
    if (!stakers) {
      return new BN(0);
    }
    const accountAddresses = pluck('address', accounts);
    return stakers.others
      .filter(item => accountAddresses.includes(item.who))
      .map(item => item.value)
      .reduce((acc, cur) => acc.add(cur), new BN(0));
  }, [stakers, accounts]);

  return (
    <Loading metas={[infoMeta, accountsMeta]}>
      <BalanceValue input={userStake} />
    </Loading>
  );
}

export { AddressCell, CheckboxCell, OwnStakeCell, ValidatorCommissionCell, OtherStakesCell, UserStakeCell };
