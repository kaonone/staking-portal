import { withStyles, Theme, WithStyles } from 'shared/styles';

const styles = (theme: Theme) => ({
  rootRowsLayout: {
    minWidth: theme.breakpoints.values.md,
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
  },
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
