import { ToRequestConverters } from './types';

export const toRequestConverters: ToRequestConverters = {
  'staking.bond': ({ controller, payee, value }) => [controller, value, payee],
  'staking.bondExtra': ({ maxAdditionalValue }) => [maxAdditionalValue],
  'staking.nominate': ({ nextNominees }) => [nextNominees],
  'staking.unbond': ({ value }) => [value],
};
