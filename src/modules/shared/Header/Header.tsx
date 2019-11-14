import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { formatBalance } from '@polkadot/util';

import { Back } from 'shared/view/elements/Icons';
import { Grid, IconButton, Typography, Loading, Divider } from 'shared/view/elements';
import { withComponent, useSubscribable } from 'shared/helpers/react';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useDeps } from 'core';

import { provideStyles, StylesProps } from './Header.style';

const LinkIconButton = withComponent(Link)(IconButton);

interface IOwnProps {
  actions?: React.ReactNode[];
  backRoutePath?: string;
  title: React.ReactNode;
  additionalContent?: React.ReactNode;
}

type IProps = IOwnProps & StylesProps & RouteComponentProps;

function Header(props: IProps) {
  const { classes, actions, title, backRoutePath, additionalContent } = props;
  const { t } = useTranslate();
  const tKeys = tKeysAll.shared;
  const { api } = useDeps();

  const [balance, balanceMeta] = useSubscribable(() => api.getTotalBalanceInfo$().totalBalance, []);
  const [bonded, bondedMeta] = useSubscribable(() => api.getTotalBalanceInfo$().totalBonded, []);
  const [chainProps] = useSubscribable(() => api.getChainProps$(), []);
  const baseDecimals = chainProps ? chainProps.tokenDecimals : 0;

  const formattedBalance = formatBalance(balance, true, baseDecimals);
  const formattedBonded = formatBalance(bonded, true, baseDecimals);

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" spacing={2}>
        {backRoutePath && (
          <Grid item>
            <LinkIconButton to={backRoutePath} className={classes.backButton}>
              <Back />
            </LinkIconButton>
          </Grid>
        )}
        <Grid item xs zeroMinWidth>
          <Typography variant="h5" noWrap weight="bold" className={classes.title}>
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" noWrap className={classes.balanceTitle}>
            {t(tKeys.balance.getKey())}
          </Typography>
          <Typography variant="h5" noWrap weight="bold" className={classes.title}>
            <Loading meta={balanceMeta}>{formattedBalance}</Loading>
          </Typography>
        </Grid>
        <Grid item className={classes.dividerItem}>
          <Divider orientation="vertical" className={classes.divider} />
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" noWrap className={classes.balanceTitle}>
            {t(tKeys.bonded.getKey())}
          </Typography>
          <Typography variant="h5" noWrap weight="bold" className={classes.title}>
            <Loading meta={bondedMeta}>{formattedBonded}</Loading>
          </Typography>
        </Grid>
        {actions &&
          !!actions.length &&
          actions.map((action, index) => (
            <Grid item key={index}>
              {action}
            </Grid>
          ))}
        {!!additionalContent && (
          <Grid item xs={12}>
            {additionalContent}
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export { IProps };
export default withRouter(provideStyles(Header));
