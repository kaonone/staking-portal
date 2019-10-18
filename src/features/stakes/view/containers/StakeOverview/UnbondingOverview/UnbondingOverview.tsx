import * as React from 'react';

import { useDeps } from 'core';
import { useTranslate } from 'services/i18n';
import { Typography, Loading } from 'shared/view/elements';
import { useSubscribable } from 'shared/helpers/react';
import UnbondingList from './UnbondingList';

interface IProps {
  stakeAddress: string;
}

function UnbondingOverview(props: IProps) {
  const { stakeAddress } = props;
  const { t, tKeys } = useTranslate();
  const { api } = useDeps();
  const [stakingInfo, stakingInfoMeta] = useSubscribable(() => api.getStakingInfo$(stakeAddress), []);

  const unbondingList = (stakingInfo && stakingInfo.unlocking) || [];

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {t(tKeys.features.stakes.unbondingList.title.getKey())}
      </Typography>
      <Loading meta={stakingInfoMeta} variant="hint">
        <UnbondingList list={unbondingList} />
      </Loading>
    </>
  );
}

export default UnbondingOverview;
