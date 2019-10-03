import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { BaseLayout } from 'modules/shared';
// import { useTranslate } from 'services/i18n';
import routes from 'modules/routes';

function Stake(props: RouteComponentProps<{ address: string }>) {
  const { address } = props.match.params;
  // const { t, tKeys } = useTranslate();

  return (
    <BaseLayout backRoutePath={routes.stakes.getRedirectPath()} hidePageNavigation title={'Stake name + size'}>
      Stake view for {address}
    </BaseLayout>
  );
}

export default Stake;
