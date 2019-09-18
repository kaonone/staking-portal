import { withStyles, Theme, WithStyles } from 'shared/styles';

const styles = (_theme: Theme) => ({
  root: {},

  metricTypography: {
    color: 'inherit',
  },

  metricTitle: {
    composes: '$metricTypography',
  },

  metricValue: {
    composes: '$metricTypography',
  },
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
