import { Observable } from 'rxjs';
import { ApiRx } from '@polkadot/api';

import { EndpointWithoutRequest, EndpointWithRequest, Endpoint, Request, Extrinsic } from './types';
import { toRequestConverters } from './toRequest';

async function makeSubmittableExtrinsic<E extends EndpointWithRequest>(
  substrateApi: Observable<ApiRx>,
  endpoint: E,
  request: Request<E>,
): Promise<Extrinsic<E>>;
async function makeSubmittableExtrinsic<E extends EndpointWithoutRequest>(
  substrateApi: Observable<ApiRx>,
  endpoint: E,
): Promise<Extrinsic<E>>;
async function makeSubmittableExtrinsic<E extends Endpoint>(
  substrateApi: Observable<ApiRx>,
  endpoint: E,
  request?: Request<E>,
): Promise<Extrinsic<E>>;
async function makeSubmittableExtrinsic<E extends Endpoint>(
  substrateApi: Observable<ApiRx>,
  endpoint: E,
  request?: Request<E>,
): Promise<Extrinsic<E>> {
  const api = await substrateApi.toPromise();
  const [section, method] = endpoint.split('.');

  const toRequestConverter = toRequestConverters[endpoint as EndpointWithRequest] || null;
  const convertedRequest = request && toRequestConverter ? toRequestConverter(request as any) : [];
  const argsForRequest = Array.isArray(convertedRequest) ? convertedRequest : [convertedRequest];

  const apiMethod = api.tx[section] && api.tx[section][method];

  if (!apiMethod) {
    throw new Error(`Unable to find api.tx.${section}.${method}`);
  }

  const extrinsic = {
    request,
    method: endpoint,
    submittable: apiMethod(...argsForRequest),
  } as unknown as Extrinsic<E>;
  return extrinsic;
}

export { makeSubmittableExtrinsic };
