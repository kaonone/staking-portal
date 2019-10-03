import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { BaseLayout } from 'modules/shared';
import { StakesList } from 'features/stakes';

function Stakes(_props: RouteComponentProps<any>) {
  return (
    <BaseLayout title="Stakes">
      <StakesList />
    </BaseLayout>
  );
}

export default Stakes;
