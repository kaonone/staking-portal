import * as React from 'react';
import { GetProps } from '_helpers';
import { FieldRenderProps } from 'react-final-form';

import { useTranslate } from 'services/i18n';
import { getFieldWithComponent } from 'shared/helpers/react';
import { TextInput, DecimalsInput } from 'shared/view/elements';

interface IOwnProps {
  baseDecimals: number;
  placeholder: string;
}

type IProps = Omit<GetProps<typeof TextInput>, 'ref'> & FieldRenderProps & IOwnProps;

function DecimalsField(props: IProps) {
  const { baseDecimals, placeholder, input, meta, ...rest } = props;
  const { t } = useTranslate();

  const error =
    typeof rest.error === 'boolean'
      ? rest.error && meta.error && t(meta.error)
      : meta.touched && meta.error && t(meta.error);

  return (
    <DecimalsInput
      baseDecimals={baseDecimals}
      {...rest}
      helperText={error}
      error={Boolean(error)}
      {...input}
      placeholder={placeholder}
    />
  );
}

export default getFieldWithComponent(DecimalsField);
