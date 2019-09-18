import { withStyles, Theme, WithStyles, colors } from 'shared/styles';

const styles = (theme: Theme) => ({
  root: {
    padding: '2rem 2.375rem',
    color: colors.silver,
    fontFamily: theme.typography.fontFamily,
  },

  title: {
    fontSize: '21px',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },

  content: {

  },
  hint: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1.375rem',
    fontSize: '0.75rem',
    border: `solid 0.125rem ${colors.silver}`,
    borderRadius: '0.25rem',
  },

  hintIcon: {
    marginRight: '1.875rem',
    fontSize: '2rem',
    color: colors.silver,
  },

  actions: {
    marginTop: '3.4375rem',
  },

  action: {
    marginBottom: '0.875rem',
  },

  cancelButton: {
    color: colors.dustyGray,
    borderColor: colors.dustyGray,
  },
} as const);

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
