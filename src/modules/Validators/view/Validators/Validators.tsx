import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { BaseLayout } from 'modules/shared';
import { ValidatorsList } from 'features/validators';

function Validators(_props: RouteComponentProps<any>) {
  return (
    <BaseLayout title="Validators">
      <ValidatorsList />
    </BaseLayout>
  );
}

export default Validators;
