import { withStyles, WithStyles, Theme, colors } from 'shared/styles';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
  },
  overlay: {
    color: colors.silver,
  },
  progress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    left: 0,
  },
} as const);

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
