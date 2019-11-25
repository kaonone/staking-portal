import { withStyles, Theme, WithStyles, gradients } from 'shared/styles';

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

  metrics: {
    marginLeft: theme.spacing(2),
  },
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
