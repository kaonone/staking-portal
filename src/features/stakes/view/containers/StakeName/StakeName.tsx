import * as React from 'react';
import { useDeps } from 'core';
import { useSubscribable } from 'shared/helpers/react';
import { getShortString } from 'shared/helpers/string';

interface IProps {
  address: string;
}

function StakeName(props: IProps) {
  const { address } = props;
  const { api } = useDeps();
  const [accounts, accountsMeta] = useSubscribable(() => api.getSubstrateAccounts$(), [], []);

  if (!accountsMeta.loaded) {
    return <>Loading...</>;
  }

  const account = accounts.find(item => item.address === address);
  const name = (account && account.meta.name) || getShortString(address);
  return <>{name}</>;
}

export default StakeName;
