import { withStyles, Theme, WithStyles, colors } from 'shared/styles';

const styles = (theme: Theme) => ({
  root: {
    padding: `${theme.spacing(1.25)}px ${theme.spacing(2.5)}px`,
    borderRadius: '0.25rem',
    backgroundColor: colors.white,
  },

  toggleIcon: {
    fontSize: '1rem',
    color: colors.haiti,

    '&$disabled': {
      color: colors.topaz,
    },
  },

  toggleButton: {
    margin: -theme.spacing(1),
  },

  toggleBack: {
    transform: 'rotate(180deg)',
  },

  disabled: {},

  itemsPerPage: {
    color: colors.topaz,
    marginRight: theme.spacing(),
  },

  currentItems: {
    color: colors.topaz,
  },

  select: {
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: '0.75rem',
    color: colors.topaz,
  },
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
