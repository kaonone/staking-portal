import { withStyles, Theme, WithStyles } from 'shared/styles';

const styles = (_theme: Theme) => ({
  root: {},

  metricTitle: {
    color: 'inherit',
  },

  metricValue: {
    color: 'inherit',
  },
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
