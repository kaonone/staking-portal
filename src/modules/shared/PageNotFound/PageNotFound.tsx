import * as React from 'react';

import routes from 'modules/routes';
import { tKeys, useTranslate } from 'services/i18n';
import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';

import BaseLayout from '../BaseLayout/BaseLayout';
import { provideStyles, StylesProps } from './PageNotFound.style';

type IProps = StylesProps & InjectedAuthRouterProps;

class PageNotFound extends React.PureComponent<IProps> {
  public render() {
    const { classes } = this.props;
    const { t } = useTranslate();

    return (
      <BaseLayout title={t(tKeys.shared.pageNotFound.getKey())} backRoutePath={routes.validators.getRedirectPath()}>
        <div className={classes.root}>
          <div className={classes.title}>404.</div>
          <div className={classes.description}>{t(tKeys.shared.pageNotFound.getKey())}</div>
        </div>
      </BaseLayout>
    );
  }
}

export { IProps };
export default provideStyles(PageNotFound);
