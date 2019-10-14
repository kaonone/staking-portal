import { ToRequestConverters } from './types';

export const toRequestConverters: ToRequestConverters = {
  'staking.bond': ({ controller, payee, value }) => [controller, value, payee],
  'staking.bondExtra': ({ maxAdditionalValue }) => [maxAdditionalValue],
  'staking.unbond': ({ value }) => [value],
};
