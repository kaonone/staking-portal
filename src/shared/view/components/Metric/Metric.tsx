import * as React from 'react';

import { StylesProps, provideStyles } from './Metric.style';
import { Typography } from 'shared/view/elements';

interface IProps {
  title: string;
  value: React.ReactNode;
}

function Metric(props: IProps & StylesProps) {
  const { classes, title, value } = props;
  return (
    <div className={classes.root}>
      <Typography variant="subtitle2" component="h6" weight="medium" className={classes.metricTitle}>
        {title}
      </Typography>
      <Typography variant="h6" component="span" className={classes.metricValue}>
        {value}
      </Typography>
    </div>
  );
}

export default provideStyles(Metric);
