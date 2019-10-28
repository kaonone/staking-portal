import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { getFieldWithComponent, useOnChangeState } from 'shared/helpers/react';

interface IOwnProps<T> {
  value: T;
  compare?: (prev: T, current: T) => boolean;
}

type IProps<T> = FieldRenderProps & IOwnProps<T>;

function SpyField<T>(props: IProps<T>) {
  const { input, value, compare } = props;
  const { onChange } = input;
  const defaultCompare = (prev: T, current: T) => prev === current;

  useOnChangeState(value, compare || defaultCompare, (_prev, current) => onChange(current));

  return <input {...input} type="hidden" />;
}

export default getFieldWithComponent(SpyField);
