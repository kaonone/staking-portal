import * as React from 'react';
import * as R from 'ramda';
import BN from 'bn.js';
import { useDeps } from 'core';

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

  const lastOfflineBlock = React.useMemo(() => {
    const last = validatorOfflineInfo && R.last(validatorOfflineInfo);
    return last && last.blockNumber;
  }, [validatorOfflineInfo]);

  return <AddressCard address={address} offlineCount={offlineCount} lastOfflineBlock={lastOfflineBlock} />;
}

export default Address;
