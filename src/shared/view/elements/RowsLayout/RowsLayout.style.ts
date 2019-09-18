import { withStyles, WithStyles, Theme } from 'shared/styles';

const styles = (_theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    overflow: 'hidden', // https://github.com/mui-org/material-ui/issues/7466
  },

  container: {
    flexGrow: 1,
  },
} as const);

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
