import { withStyles, Theme, WithStyles, colors } from 'shared/styles';

const styles = (theme: Theme) => ({
  root: {
    color: colors.silver,
    fontFamily: theme.typography.fontFamily,
  },

  title: {
    marginBottom: '2rem',
    fontSize: '1.5rem',
  },
} as const);

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
