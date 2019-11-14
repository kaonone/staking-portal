import { withStyles, Theme, WithStyles } from 'shared/styles';

const styles = (_theme: Theme) => ({
  root: {},

  metricTitle: {
    color: 'rgba(255, 255, 255, 0.8)',
  },

  metricValue: {
    color: '#fff',
  },
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
