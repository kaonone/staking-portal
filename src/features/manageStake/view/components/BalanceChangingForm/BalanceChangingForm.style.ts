import { makeStyles, colors } from 'shared/styles';

const styles = () => ({
  root: {
    color: colors.silver,
  },
} as const);

export const useStyles = makeStyles(styles);
