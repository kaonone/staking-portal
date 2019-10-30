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
  const [nominators, nominatorsMeta] = useSubscribable(() => api.getStakeNominators$(stakeAddress), [], []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Nominees
      </Typography>
      <Loading meta={nominatorsMeta} variant="hint">
        {!!nominators.length ? (
          <ValidatorsList validatorStashes={nominators} />
        ) : (
          <Hint>Your stake is not nominated</Hint>
        )}
      </Loading>
    </>
  );
}

export default Validators;
