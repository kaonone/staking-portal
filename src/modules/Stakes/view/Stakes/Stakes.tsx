import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import routes from 'modules/routes';
import { BaseLayout } from 'modules/shared';
import { useTranslate } from 'services/i18n';
import { StakesList } from 'features/stakes';

function Stakes(_props: RouteComponentProps<any>) {
  const { t, tKeys } = useTranslate();

  const makeLinkToStake = React.useCallback((address) => routes.stake.address.getRedirectPath({ address }), []);

  return (
    <BaseLayout title={t(tKeys.shared.mainTitle.getKey())}>
      <StakesList makeLinkToStake={makeLinkToStake} />
    </BaseLayout>
  );
}

export default Stakes;
