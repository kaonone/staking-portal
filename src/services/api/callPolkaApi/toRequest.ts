import { ToRequestConverters } from './types';
import { GenericAccountId } from '@polkadot/types';

export const toRequestConverters: ToRequestConverters = {
  'query.staking.ledger': address => new GenericAccountId(address),
  'query.staking.nominators': address => new GenericAccountId(address),
  'derive.staking.info': address => new GenericAccountId(address),
  'derive.balances.all': address => new GenericAccountId(address),
  'derive.balances.fees': address => new GenericAccountId(address),
};
