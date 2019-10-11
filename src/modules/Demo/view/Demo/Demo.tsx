import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useTranslate } from 'services/i18n';
import Grid from '@material-ui/core/Grid';
import { BaseLayout } from 'modules/shared';

function Demo(_props: RouteComponentProps<any>) {
  const { t, tKeys } = useTranslate();

  return (
    <BaseLayout title={t(tKeys.shared.mainTitle.getKey())}>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={5}>
          Demo page
        </Grid>
      </Grid>
    </BaseLayout>
  );
}

export default Demo;
