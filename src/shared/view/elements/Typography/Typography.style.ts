import { withStyles, WithStyles } from 'shared/styles';

const styles = () => ({

  root: {
    '&$medium': {
      fontWeight: 500,
    },

    '&$bold': {
      fontWeight: 'bold',
    },
  },

  medium: {},
  bold: {},

} as const);

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
