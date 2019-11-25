import { colors, makeStyles } from 'shared/styles';

export const useStyles = makeStyles(() => {
  return {
    divider: {
      backgroundColor: colors.heliotrope,
    },

    dividerItem: {
      alignSelf: 'stretch',
    },
  };
});
