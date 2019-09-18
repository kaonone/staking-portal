import { withStyles, Theme, WithStyles, hexToRGBA, colors } from 'shared/styles';

const styles = (theme: Theme) => ({

  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    marginBottom: '2.5rem',
    fontSize: '8.5rem',
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'bold',
    color: hexToRGBA(colors.heavyMetal, 0.13),
  },

  description: {
    fontSize: '1.125rem',
    fontFamily: theme.typography.fontFamily,
    color: colors.black,
  },
} as const);

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
