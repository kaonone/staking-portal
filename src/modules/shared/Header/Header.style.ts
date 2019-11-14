import { withStyles, Theme, WithStyles, gradients, colors } from 'shared/styles';

const styles = (theme: Theme) => ({
  root: {
    padding: `${theme.spacing(3.5)}px ${theme.spacing(3)}px`,
    background: gradients.purple,
    borderRadius: 4,
  },

  backButton: {
    color: '#fff',
  },

  title: {
    color: '#fff',
  },

  balanceTitle: {
    color: 'rgba(255, 255, 255, 0.8)',
  },

  divider: {
    backgroundColor: colors.heliotrope,
  },

  dividerItem: {
    alignSelf: 'stretch',
  },
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
