import * as React from 'react';

import { Grid, Divider } from 'shared/view/elements';
import { Metric } from 'shared/view/components';

import { useStyles } from './BalanceMetrics.style';

export interface IMetric {
  title: string;
  value: React.ReactNode;
}

interface IProps {
  metrics: IMetric[];
}

function BalanceMetrics(props: IProps) {
  const { metrics } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={2} alignItems="center">
      {metrics.map(({ title, value }, index) => (
        <React.Fragment key={index}>
          {!!index && (
            <Grid item className={classes.dividerItem}>
              <Divider orientation="vertical" className={classes.divider} />
            </Grid>
          )}
          <Grid item>
            <Metric title={title} value={value} />
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
}

export { BalanceMetrics };
