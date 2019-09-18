import { withStyles, Theme, WithStyles } from 'shared/styles';

const styles = (theme: Theme) => ({
  link: {
    margin: theme.spacing(),
    '&:visited': {
      color: theme.palette.primary.light,
    },
    '&:hover, &:active': {
      color: theme.palette.primary.dark,
      textDecoration: 'underline',
    },
  },

  toolbarRoot: {
    justifyContent: 'center',
  },
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
