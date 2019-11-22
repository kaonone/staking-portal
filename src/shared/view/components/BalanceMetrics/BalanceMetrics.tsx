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
  className?: string;
}

function BalanceMetrics(props: IProps) {
  const { metrics, className } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={2} alignItems="center" className={className}>
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
