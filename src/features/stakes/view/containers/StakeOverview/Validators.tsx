import * as React from 'react';
import { useDeps } from 'core';

import { ValidatorsList } from 'features/validators';
import { Typography, Hint, Loading } from 'shared/view/elements';
import { useSubscribable } from 'shared/helpers/react';

interface IProps {
  stakeAddress: string;
}

function Validators(props: IProps) {
  const { stakeAddress } = props;
  const { api } = useDeps();
  const [info, infoMeta] = useSubscribable(() => api.getStakingInfo$(stakeAddress), []);

  const nominees = (info && info.nominators) || [];

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Nominees
      </Typography>
      <Loading meta={infoMeta} variant="hint" progressVariant="circle">
        {!!nominees.length ? <ValidatorsList validatorStashes={nominees} /> : <Hint>Your stake is not nominated</Hint>}
      </Loading>
    </>
  );
}

export default Validators;
