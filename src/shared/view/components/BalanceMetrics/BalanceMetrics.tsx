import * as React from 'react';

import { Grid, Divider } from 'shared/view/elements';
import { Metric } from 'shared/view/components';

import { useStyles } from './BalanceMetrics.style';

export interface IMetric {
  title: string;
  value: string | React.ReactNode;
}

interface IProps {
  metrics: IMetric[];
}

function BalanceMetrics(props: IProps) {
  const { metrics } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={2} alignItems="center">
      {metrics.map(({ title, value }, index) =>
        index === metrics.length - 1 ? (
          <Grid item>
            <Metric title={title} value={value} />
          </Grid>
        ) : (
          <>
            <Grid item>
              <Metric title={title} value={value} />
            </Grid>
            <Grid item className={classes.dividerItem}>
              <Divider orientation="vertical" className={classes.divider} />
            </Grid>
          </>
        ),
      )}
    </Grid>
  );
}

export { BalanceMetrics };
