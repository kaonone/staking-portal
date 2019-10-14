import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import routes from 'modules/routes';
import { BaseLayout } from 'modules/shared';
// import { useTranslate } from 'services/i18n';
import { StakeOverview, StakeName } from 'features/stakes';
import { useStakeActions } from 'features/manageStake';

function Stake(props: RouteComponentProps<{ address: string }>) {
  const { address } = props.match.params;
  // const { t, tKeys } = useTranslate();
  const actions = useStakeActions(address);

  return (
    <BaseLayout
      backRoutePath={routes.stakes.getRedirectPath()}
      hidePageNavigation
      title={<StakeName address={address} />}
      actions={actions}
    >
      <StakeOverview address={address} />
    </BaseLayout>
  );
}

export default Stake;
