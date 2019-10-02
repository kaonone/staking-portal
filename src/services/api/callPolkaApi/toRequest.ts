import { ToRequestConverters } from './types';
import { GenericAccountId } from '@polkadot/types';

export const toRequestConverters: ToRequestConverters = {
  'derive.staking.info': address => new GenericAccountId(address),
  'query.staking.ledger': address => new GenericAccountId(address),
};
