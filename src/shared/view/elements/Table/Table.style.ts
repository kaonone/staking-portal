import { withStyles, WithStyles, Theme, colors } from 'shared/styles';

const styles = (theme: Theme) => ({

  root: {
    width: '100%',

    '&$separated': {
      borderSpacing: '0 1rem',
      borderCollapse: 'separate',
    },
  },

  separated: {},

  row: {
    background: colors.white,
  },

  text: {
    fontWeight: 'normal',
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
  },

  cell: {
    composes: '$text',
    fontSize: '0.9375rem',
  },
} as const);

// TODO ds: rewrite after transition to @material-ui/styles
export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
