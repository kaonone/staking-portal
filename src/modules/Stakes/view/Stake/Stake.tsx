import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import routes from 'modules/routes';
import { BaseLayout } from 'modules/shared';
// import { useTranslate } from 'services/i18n';
import { StakeOverview, StakeName } from 'features/stakes';

function Stake(props: RouteComponentProps<{ address: string }>) {
  const { address } = props.match.params;
  // const { t, tKeys } = useTranslate();

  return (
    <BaseLayout
      backRoutePath={routes.stakes.getRedirectPath()}
      hidePageNavigation
      title={<StakeName address={address} />}
    >
      <StakeOverview address={address} />
    </BaseLayout>
  );
}

export default Stake;
