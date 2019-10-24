import * as React from 'react';
import { useDeps } from 'core';
import BN from 'bn.js';

import { useSubscribable } from 'shared/helpers/react';

import { default as AddressCard } from '../../components/Address/Address';

interface IProps {
  address: string;
}

function Address(props: IProps) {
  const { address } = props;
  const { api } = useDeps();
  const [offlineInfo] = useSubscribable(() => api.getValidatorOfflineInfo$(), []);
  const validatorOfflineInfo = offlineInfo && offlineInfo[address];

  const offlineCount = React.useMemo(
    () => validatorOfflineInfo && validatorOfflineInfo.reduce((total, { count }): BN => total.add(count), new BN(0)),
    [validatorOfflineInfo],
  );

  return <AddressCard address={address} offlineCount={offlineCount} offlineInfo={validatorOfflineInfo} />;
}

export default Address;
