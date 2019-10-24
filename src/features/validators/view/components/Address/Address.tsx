import * as React from 'react';
import BN from 'bn.js';
import { tKeys, useTranslate } from 'services/i18n';
import BaseIdentityIcon from '@polkadot/react-identicon';
import Tooltip from '@material-ui/core/Tooltip';

import { withStyles } from 'shared/styles';
import { Avatar, Badge, Grid } from 'shared/view/elements';

import { useStyles } from './Address.style';

interface IProps {
  address: string;
  offlineCount?: BN;
  blockNumbers?: string;
}

const StyledBadge = withStyles(_theme => ({
  badge: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    padding: 0,
    cursor: 'pointer',
  },
}))(Badge);

function Address(props: IProps) {
  const { address, offlineCount, blockNumbers } = props;
  const classes = useStyles();
  const { t } = useTranslate();
  const tooltipTitle = t(tKeys.features.validators.addressInfo.offline.getKey(), { offlineCount, blockNumbers });

  return (
    <Grid container wrap="nowrap" alignItems="center" spacing={2}>
      <Grid item xs={1}>
        {offlineCount && blockNumbers ? (
          <StyledBadge
            badgeContent={
              <Tooltip title={tooltipTitle} aria-label="offline-count" interactive>
                <span className={classes.badgeContent}>{`${offlineCount}`}</span>
              </Tooltip>
            }
            color="primary"
          >
            <Avatar>
              <BaseIdentityIcon className={classes.icon} value={address} />
            </Avatar>
          </StyledBadge>
        ) : (
          <Avatar>
            <BaseIdentityIcon className={classes.icon} value={address} />
          </Avatar>
        )}
      </Grid>
      <Grid item>{address}</Grid>
    </Grid>
  );
}

export default Address;
