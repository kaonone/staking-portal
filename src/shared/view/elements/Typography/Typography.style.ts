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

// TODO ds: rewrite after transition to @material-ui/styles
export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
