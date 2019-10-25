import * as React from 'react';
import { GetProps } from '_helpers';
import { FieldRenderProps } from 'react-final-form';
import BN from 'bn.js';

import { getFieldWithComponent } from 'shared/helpers/react';
import { TextInput } from 'shared/view/elements';

interface IOwnProps {
  availableAmount: BN;
}

type IProps = Omit<GetProps<typeof TextInput>, 'ref'> & FieldRenderProps & IOwnProps;

function SpyField(props: IProps) {
  const { input, availableAmount, ...rest } = props;
  const { onChange } = input;

  React.useMemo(() => {
    onChange(availableAmount);
  }, [availableAmount]);

  return (
    <TextInput {...rest} {...input} type="hidden" />
  );
}

export default getFieldWithComponent(SpyField);
