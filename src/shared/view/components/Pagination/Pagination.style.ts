import { withStyles, Theme, WithStyles, colors } from 'shared/styles';

const styles = (theme: Theme) => ({
  root: {
    padding: `${theme.spacing()}px ${theme.spacing(2.5)}px`,
    borderRadius: '0.25rem',
    backgroundColor: colors.white,
  },

  toggleIcon: {
    width: '0.875rem',
    height: '0.875rem',
    color: colors.haiti,
    cursor: 'pointer',

    '&$disabled': {
      color: colors.topaz,
    },
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
