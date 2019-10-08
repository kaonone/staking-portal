import * as React from 'react';
import { Grid, Paper } from 'shared/view/elements';
import Validators from './Validators';

interface IProps {
  address: string;
}

function StakeOverview({ address }: IProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper>Stake stats</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>Awaiting withdrawal</Paper>
      </Grid>
      <Validators stakeAddress={address} />
    </Grid>
  );
}

export default StakeOverview;
