import { Theme, makeStyles } from 'shared/styles';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    iconButton: {
      margin: `${theme.spacing(-1.5)}px 0`,
    },
  };
});
