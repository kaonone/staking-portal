import { useState, useEffect, useMemo } from 'react';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Codec } from '@polkadot/types/types';
import { ApiRx } from '@polkadot/api';
import { toString } from 'ramda';

import { useDeps } from 'core';
import { getErrorMsg } from 'shared/helpers';

import {
  EndpointWithoutRequest, IOption, EndpointWithRequest, Endpoint, IOptionWithRequest, ICallResult, ICallMeta,
  ToRequestConverter, Request, ConvertedResponse,
} from './types';
import { fromResponseConverters } from './fromResponse';
import { toRequestConverters } from './toRequest';

const cache = new Map<string, Observable<ConvertedResponse<Endpoint>>>();

function useCall<E extends EndpointWithoutRequest>(endpoint: E, _option?: IOption<E>): ICallResult<E>;
function useCall<E extends EndpointWithRequest>(endpoint: E, _option: IOptionWithRequest<E>): ICallResult<E>;
function useCall<E extends Endpoint>(endpoint: E, _option: Partial<IOptionWithRequest<E>> = {}): ICallResult<E> {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState(() => Date.now());
  const [result, setResult] = useState<ICallResult<E>[0]>(null);
  const { polkaApi } = useDeps();

  const {
    args = [] as const,
    defaultValue,
    isSuspendedCall = false,
    getCacheKey = getCacheKeyDefault,
  } = _option;

  useEffect(() => {
    if (isSuspendedCall) {
      return;
    }

    const cacheKey = getCacheKey(endpoint, args);
    const observable = cache.get(cacheKey) || makeCallObservable(polkaApi, endpoint, args);
    cache.set(cacheKey, observable);

    const subscription = observable.subscribe({
      next: value => {
        setLoaded(true);
        setError(null);
        setUpdatedAt(Date.now());
        setResult(value);
      },
      error: err => setError(getErrorMsg(err)),
    });

    return subscription.unsubscribe;
  }, [JSON.stringify(args), isSuspendedCall]);

  const meta: ICallMeta = useMemo(() => ({
    loaded, updatedAt, error,
  }), [loaded, updatedAt, error]);

  return [result || defaultValue || null, meta];
}

function makeCallObservable<E extends Endpoint>(
  polkaApi: Observable<ApiRx>,
  endpoint: E,
  args: Request<E> | readonly [],
): Observable<ConvertedResponse<E>> {
  return polkaApi.pipe(switchMap(api => {
    const [area, section, method] = endpoint.split('.');
    if (!isArea(area)) {
      throw new Error(`Unknown api.${area}, expected ${availableAreas.join(', ')}`);
    }

    const toRequestConverter: ToRequestConverter<EndpointWithRequest> | null =
      toRequestConverters[endpoint as EndpointWithRequest] || null;
    const convertedArgs = toRequestConverter && toRequestConverter(args as Request<EndpointWithRequest>);
    const argsForRequest = Array.isArray(convertedArgs) ? convertedArgs : [convertedArgs];

    let response: Observable<Codec>;
    if (area === 'consts') {
      const apiResponse = api.consts[section] && api.consts[section][method];
      if (!apiResponse) {
        throw new Error(`Unable to find api.${area}.${section}.${method}`);
      }
      response = new BehaviorSubject(apiResponse);
    } else {
      const apiMethod = api[(area as 'query')][section] && api[(area as 'query')][section][method];
      if (!apiMethod) {
        throw new Error(`Unable to find api.${area}.${section}.${method}`);
      }
      response = apiMethod(...argsForRequest);
    }

    return response.pipe(
      map(value => fromResponseConverters[endpoint](value as any)),
    );
  }));
}

const availableAreas = ['consts', 'rpc', 'query', 'derive'] as const;
type Area = (typeof availableAreas)[number];

function isArea(value: string): value is Area {
  return (availableAreas as readonly string[]).includes(value);
}

function getCacheKeyDefault<E extends Endpoint>(endpoint: E, args: Request<E>) {
  return `${endpoint}:${toString(args || null)}`;
}

export { useCall };
