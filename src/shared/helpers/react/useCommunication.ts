import { useCallback, useState, useRef, useEffect } from 'react';
import { Object } from 'ts-toolbelt';
import { makeCancelablePromise, ICancelablePromise } from '../makeCancelablePromise';

type Status = 'initial' | 'pending' | 'success' | 'error' | 'canceled';

interface ICommunicationState<E, O extends IOptions<E>> {
  error: string;
  status: Status;
  result: InferResult<E> | (Object.Has<O, 'defaultResult'> extends true ? never : undefined);
  execute(...args: InferArgs<E>): void;
  cancelRequest(): void;
  resetState(): void;
}

type InferResult<E> = E extends (...args: any[]) => Promise<infer R> ? R : never;
type InferArgs<E> = E extends (...args: infer A) => Promise<any> ? A : never;

interface IOptions<E> {
  defaultResult?: InferResult<E>;
  resetStateOnExecute?: boolean;
}

export default function useCommunication<E extends (...args: any[]) => Promise<any>, O extends IOptions<E> = {}>(
  effect: E,
  inputs: any[],
  options?: O,
): ICommunicationState<E, O> {
  const defaultResult = options && options.defaultResult;
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>('initial');
  const [result, setResult] = useState<InferResult<E> | undefined>(defaultResult);

  const launchedCommunicationRef = useRef<ICancelablePromise<InferResult<E>> | null>(null);

  const cancelRequest = useCallback((setStatusCanceled: boolean = true) => {
    launchedCommunicationRef.current && launchedCommunicationRef.current.cancel();
    setStatusCanceled && setStatus('canceled');
  }, []);

  useEffect(() => () => cancelRequest(false), []);

  const resetState = useCallback(() => {
    setStatus('initial');
    setError('');
    setResult(defaultResult);
    launchedCommunicationRef.current = null;
  }, []);

  const execute = useCallback(
    (...args: InferArgs<E>) => {
      cancelRequest(false);
      options && options.resetStateOnExecute && resetState();
      setStatus('pending');

      const communication = makeCancelablePromise<InferResult<E>>(effect(...args));
      launchedCommunicationRef.current = communication;

      communication.promise
        .then(res => {
          setResult(res);
          setStatus('success');
        })
        .catch(err => {
          if (err.isCanceled) {
            return;
          }
          setError(err.message);
          setStatus('error');
        });
    },
    [inputs],
  );

  return {
    execute,
    cancelRequest,
    resetState,
    status,
    error,
    result: result as ICommunicationState<E, O>['result'],
  };
}
