import { useState, useEffect, useMemo } from 'react';
import { Observable } from 'rxjs';
import { toString } from 'ramda';

import { useDeps } from 'core';
import { getErrorMsg } from 'shared/helpers';

import {
  EndpointWithoutRequest, IOption, EndpointWithRequest, Endpoint, IOptionWithRequest, ICallResult, ICallMeta,
  Request, ConvertedResponse,
} from './types';
import { callPolkaApi } from './callPolkaApi';

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
    args,
    defaultValue,
    isSuspendedCall = false,
    getCacheKey = getCacheKeyDefault,
  } = _option;

  useEffect(() => {
    if (isSuspendedCall) {
      return;
    }

    const cacheKey = getCacheKey(endpoint, args);
    const observable = cache.get(cacheKey) || callPolkaApi(polkaApi, endpoint, args);
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

function getCacheKeyDefault<E extends Endpoint>(endpoint: E, args?: Request<E>) {
  return `${endpoint}${args ? ':' + toString(args) : ''}`;
}

export { useCall };
