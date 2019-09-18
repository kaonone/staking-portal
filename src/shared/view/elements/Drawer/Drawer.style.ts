import { withStyles, Theme, WithStyles, colors } from 'shared/styles';

const styles = (_theme: Theme) => ({
  root: {
    width: '26.875rem',
    backgroundColor: colors.blackCurrant,

  },
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
