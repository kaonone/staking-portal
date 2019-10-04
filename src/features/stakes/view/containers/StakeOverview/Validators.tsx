import * as React from 'react';
import { useDeps } from 'core';

import { ValidatorsList } from 'features/validators';
import { Grid, Typography, CircleProgressBar } from 'shared/view/elements';
import { useSubscribable } from 'shared/helpers/react';
import { makeStyles, colors, Theme } from 'shared/styles';

interface IProps {
  stakeAddress: string;
}

function Validators(props: IProps) {
  const { stakeAddress } = props;
  const classes = useStyles();
  const { api } = useDeps();
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(stakeAddress), []);

  const nominees = (info && info.nominators) || [];

  return (
    <Grid item xs={12}>
      <Typography variant="h4" gutterBottom>
        Nominees
      </Typography>
      {!infoMeta.loaded && (
        <div className={classes.hint}>
          <CircleProgressBar />
        </div>
      )}
      {!!infoMeta.error && (
        <div className={classes.hint}>
          <Typography color="error">{infoMeta.error}</Typography>
        </div>
      )}
      {infoMeta.loaded &&
        !infoMeta.error &&
        (!!nominees.length ? (
          <ValidatorsList validatorStashes={nominees} />
        ) : (
          <div className={classes.hint}>Your stake is not nominated</div>
        ))}
    </Grid>
  );
}

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
  };
});

export default Validators;
