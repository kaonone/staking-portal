import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { BaseLayout } from 'modules/shared';
import { ValidatorsList } from 'features/validators';
import { useTranslate } from 'services/i18n';

function Validators(_props: RouteComponentProps<any>) {
  const { t, tKeys } = useTranslate();
  return (
    <BaseLayout title={t(tKeys.shared.mainTitle.getKey())}>
      <ValidatorsList />
    </BaseLayout>
  );
}

export default Validators;
