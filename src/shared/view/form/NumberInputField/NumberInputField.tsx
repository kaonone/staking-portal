import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { GetProps } from '_helpers';

import { useTranslate } from 'services/i18n';
import { NumberInput } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';

type IProps = Omit<GetProps<typeof NumberInput>, 'ref'> & FieldRenderProps;

function NumberInputField(props: IProps) {
  const { input, meta, ...rest } = props;
  const { t } = useTranslate();
  const error = typeof rest.error === 'boolean'
    ? rest.error && meta.error && t(meta.error)
    : meta.touched && meta.error && t(meta.error);

  const onChange: GetProps<typeof NumberInput>['onChange'] = value => props.input.onChange(value.floatValue);

  return (
    <NumberInput {...rest} helperText={error} error={Boolean(error)} {...input} onChange={onChange}/>
  );
}

export default getFieldWithComponent(NumberInputField);
