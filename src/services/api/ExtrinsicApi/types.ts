import BN from 'bn.js';
import { O } from 'ts-toolbelt';
import { Observable } from 'rxjs';
import { SubmittableExtrinsic, SubmittableResultImpl } from '@polkadot/api/types';

/**** Request Types ****/

interface IBondRequest {
  controller: string;
  value: BN;
  payee: Payee;
}

export enum Payee {
  'staked',
  'stash',
  'controller',
}

interface IBondExtraRequest {
  maxAdditionalValue: BN;
}

interface IUnbondRequest {
  value: BN;
}

interface INominateRequest {
  nextNominees: string[];
}

/**** Converted Request Types ****/

type ConvertedBondRequest = [string, BN, Payee];
type ConvertedBondExtraRequest = [BN];
type ConvertedUnbondRequest = [BN];
type ConvertedNominateRequest = [string[]];

/********/

// [Endpoint]: [Request, ConvertedRequestForApi]
interface ISignatures {
  'staking.bond': [IBondRequest, ConvertedBondRequest];
  'staking.bondExtra': [IBondExtraRequest, ConvertedBondExtraRequest];
  'staking.unbond': [IUnbondRequest, ConvertedUnbondRequest];
  'staking.nominate': [INominateRequest, ConvertedNominateRequest];
  'staking.chill': [null, null];
  'staking.withdrawUnbonded': [null, null];
}

export type Endpoint = keyof ISignatures;
export type EndpointWithRequest = keyof O.Filter<ISignatures, [null, ...any[]], 'implements->'>;
export type EndpointWithoutRequest = Exclude<Endpoint, EndpointWithRequest>;

export type Request<E extends Endpoint> = ISignatures[E][0];
export type ConvertedRequestForApi<E extends Endpoint> = ISignatures[E][1];

export type ToRequestConverter<E extends Endpoint> = (request: Request<E>) => ConvertedRequestForApi<E>;
export type ToRequestConverters = {
  [E in EndpointWithRequest]: ToRequestConverter<E>;
};

type MaybeExtrinsicRequest<T extends Endpoint> = T extends EndpointWithRequest ? { request: Request<T> } : {};

type GenericExtrinsic<T extends Endpoint> = MaybeExtrinsicRequest<T> & {
  method: T;
  submittable: SubmittableExtrinsic<'rxjs'>;
};

export type Extrinsic<T extends Endpoint = Endpoint> = T extends Endpoint ? GenericExtrinsic<T> : never;

export interface ISubmittedExtrinsic {
  extrinsic: Extrinsic;
  promise: Promise<void>;
  result: Observable<SubmittableResultImpl>;
}
