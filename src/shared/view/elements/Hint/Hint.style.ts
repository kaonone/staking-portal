import { Theme, colors, makeStyles } from 'shared/styles';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      padding: theme.spacing(2),
      borderRadius: '0.25rem',
      backgroundColor: colors.whiteLilac,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
  };
});
