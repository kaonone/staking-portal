import { withStyles, Theme, WithStyles } from 'shared/styles';

const styles = (_theme: Theme) => ({
  root: {},

  metricTitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 1.47,
  },

  metricValue: {
    color: '#fff',
    lineHeight: 1.4,
  },
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
