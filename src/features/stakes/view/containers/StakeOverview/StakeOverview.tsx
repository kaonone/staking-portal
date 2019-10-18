import * as React from 'react';
import { Grid } from 'shared/view/elements';
import Validators from './Validators';
import StakeStats from './StakeStats';
import UnbondingOverview from './UnbondingOverview/UnbondingOverview';

interface IProps {
  address: string;
}

function StakeOverview({ address }: IProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <StakeStats stakeAddress={address} />
      </Grid>
      <Grid item xs={6}>
        <UnbondingOverview stakeAddress={address} />
      </Grid>
      <Grid item xs={12}>
        <Validators stakeAddress={address} />
      </Grid>
    </Grid>
  );
}

export default StakeOverview;
