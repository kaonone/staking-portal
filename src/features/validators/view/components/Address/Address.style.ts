import { Theme, makeStyles } from 'shared/styles';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    icon: {
      width: '100%',
      height: '100%',
      cursor: 'default',
      '& svg': {
        width: '100%',
        height: '100%',
      },
    },
    badgeContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      padding: `0 ${theme.spacing(0.75)}px`,
      userSelect: 'none',
    },
  };
});
