import BN from 'bn.js';
import { O } from 'ts-toolbelt';
import { GenericAccountId, Vec, Option } from '@polkadot/types';
import { ChainProperties, AccountId, StakingLedger } from '@polkadot/types/interfaces';
import { DerivedStaking } from '@polkadot/api-derive/types';

// [Endpoint]: [Request, ConvertedRequestForApi, ApiResponse, ConvertedResponse]
interface ISignatures {
  'rpc.system.properties': [null, null, ChainProperties, IChainProperties];
  'query.session.validators': [null, null, Vec<AccountId>, string[]];
  'query.staking.ledger': [string, GenericAccountId, Option<StakingLedger>, IStakingLedger | null];
  'derive.staking.info': [string, GenericAccountId, DerivedStaking, IDerivedStaking];
}

export type Endpoint = keyof ISignatures;
export type EndpointWithRequest = keyof O.Filter<ISignatures, [null, ...any[]], 'implements->'>;
export type EndpointWithoutRequest = Exclude<Endpoint, EndpointWithRequest>;

export type Request<E extends Endpoint> = ISignatures[E][0];
export type ConvertedRequestForApi<E extends Endpoint> = ISignatures[E][1];
export type ApiResponse<E extends Endpoint> = ISignatures[E][2];
export type ConvertedResponse<E extends Endpoint> = ISignatures[E][3];

// tslint:disable-next-line: no-empty-interface
export interface IOption<E extends Endpoint> {
  defaultValue?: ConvertedResponse<E>;
  isSuspendedCall?: boolean;
  getCacheKey?(endpoint: E, args?: Request<E>): string;
}

export interface IOptionWithRequest<E extends Endpoint> extends IOption<E> {
  args: Request<E>;
}

export interface ICallMeta {
  error: string | null;
  loaded: boolean;
  updatedAt: number;
}

export type ICallResult<E extends Endpoint> = [ConvertedResponse<E> | null, ICallMeta];

export type ToRequestConverter<E extends Endpoint> = (request: Request<E>) => ConvertedRequestForApi<E>;
export type ToRequestConverters = {
  [E in EndpointWithRequest]: ToRequestConverter<E>;
};

export type FromResponseConverters = {
  [E in Endpoint]: (response: ApiResponse<E>) => ConvertedResponse<E>;
};

/**** CHAIN TYPES ****/

export interface IChainProperties {
  readonly ss58Format: number;
  readonly tokenDecimals: number;
  readonly tokenSymbol: string;
}

export interface IStakingLedger {
  /** AccountId */
  readonly stash: string;
  /** Compact<Balance> */
  readonly total: BN;
  /** Compact<Balance> */
  readonly active: BN;
  /** Vec<UnlockChunk> */
  readonly unlocking: IUnlockChunk[];
}

export interface IUnlockChunk {
  /** Compact<Balance> */
  readonly value: BN;
  /** Compact<BlockNumber> */
  readonly era: BN;
}

export interface IDerivedStaking {
  readonly accountId: string;
  readonly controllerId?: string;
  readonly nextSessionId?: string;
  readonly nextSessionIds: string[];
  readonly nominators?: string[];
  readonly redeemable?: BN;
  readonly rewardDestination?: IRewardDestination;
  readonly sessionId?: string;
  readonly sessionIds: string[];
  readonly stakers?: IExposure;
  readonly stakingLedger?: IStakingLedger;
  readonly stashId?: string;
  readonly unlocking?: IDerivedUnlockingChunk[];
  readonly validatorPrefs?: IValidatorPrefs;
}

export interface IRewardDestination {
  /** 0:: Staked */
  readonly isStaked: boolean;
  /** 1:: Stash */
  readonly isStash: boolean;
  /** 2:: Controller */
  readonly isController: boolean;
}

export interface IExposure {
  /** Compact<Balance> */
  readonly total: BN;
  /** Compact<Balance> */
  readonly own: BN;
  /** Vec<IndividualExposure> */
  readonly others: IIndividualExposure[];
}

export interface IIndividualExposure {
  /** AccountId */
  readonly who: string;
  /** Compact<Balance> */
  readonly value: BN;
}

export interface IDerivedUnlockingChunk {
  remainingBlocks: BN;
  value: BN;
}

export interface IValidatorPrefs {
  /** Compact<Balance> */
  readonly validatorPayment: BN;
}
