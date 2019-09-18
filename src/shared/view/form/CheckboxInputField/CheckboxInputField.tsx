import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { GetProps } from '_helpers';

import { useTranslate } from 'services/i18n';
import { CheckboxInput } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';

type IProps = GetProps<typeof CheckboxInput> & FieldRenderProps;

function CheckboxInputField(props: IProps) {
  const { input, meta, ...rest } = props;
  const { t } = useTranslate();
  const error = typeof rest.error === 'boolean'
    ? rest.error && meta.error && t(meta.error)
    : meta.touched && meta.error && t(meta.error);
  const value = typeof input.value === 'boolean' ? undefined : input.value;
  return (
    <CheckboxInput {...rest} helperText={error} error={Boolean(error)} {...input} value={value} />
  );
}

export default getFieldWithComponent(CheckboxInputField, 'checkbox');
