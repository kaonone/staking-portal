import * as React from 'react';
import BN from 'bn.js';
import { formatNumber } from '@polkadot/util';
import BaseIdentityIcon from '@polkadot/react-identicon';
import U32 from '@polkadot/types/primitive/U32';
import { tKeys, useTranslate } from 'services/i18n';

import { withStyles, colors } from 'shared/styles';
import { Avatar, Badge, Grid, Tooltip } from 'shared/view/elements';

import { useStyles } from './Address.style';

interface IProps {
  address: string;
  offlineCount?: BN;
  lastOfflineBlock?: U32;
}

const StyledBadge = withStyles(_theme => ({
  badge: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    padding: 0,
    cursor: 'pointer',
    backgroundColor: colors.valencia,
    color: '#fff',
  },
}))(Badge);

function Address(props: IProps) {
  const { address, offlineCount, lastOfflineBlock } = props;
  const classes = useStyles();
  const { t } = useTranslate();

  const tooltipTitle = t(tKeys.features.validators.addressInfo.offline.getKey(), {
    offlineCount,
    lastOfflineBlock: lastOfflineBlock && formatNumber(lastOfflineBlock),
  });

  return (
    <Grid container wrap="nowrap" alignItems="center" spacing={2}>
      <Grid item xs={1}>
        {offlineCount && lastOfflineBlock ? (
          <StyledBadge
            badgeContent={
              <Tooltip title={tooltipTitle} aria-label="offline-count" interactive>
                <span className={classes.badgeContent}>{offlineCount}</span>
              </Tooltip>
            }
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
