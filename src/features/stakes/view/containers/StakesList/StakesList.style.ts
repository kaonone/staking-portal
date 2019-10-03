import { Theme, colors, makeStyles } from 'shared/styles';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    hint: {
      padding: theme.spacing(2),
      borderRadius: '0.25rem',
      backgroundColor: colors.whiteLilac,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
    },

    memberNumber: {
      color: colors.topaz,
    },

    pagination: {
      marginBottom: theme.spacing(2),
    },
  };
});
