import * as React from 'react';

import routes from 'modules/routes';
import { tKeys, useTranslate } from 'services/i18n';
import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';

import BaseLayout from '../BaseLayout/BaseLayout';
import { provideStyles, StylesProps } from './PageNotFound.style';

type IProps = StylesProps & InjectedAuthRouterProps;

function PageNotFound(props: IProps) {
  const { classes } = props;
  const { t } = useTranslate();

  return (
    <BaseLayout
      hidePageNavigation
      title={t(tKeys.shared.pageNotFound.getKey())}
      backRoutePath={routes.stakes.getRedirectPath()}
    >
      <div className={classes.root}>
        <div className={classes.title}>404.</div>
        <div className={classes.description}>{t(tKeys.shared.pageNotFound.getKey())}</div>
      </div>
    </BaseLayout>
  );
}

export { IProps };
export default provideStyles(PageNotFound);
