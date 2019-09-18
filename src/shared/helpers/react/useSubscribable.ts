import { Subscribable } from 'rxjs';
import { useState, useEffect } from 'react';

function useSubscribable<T>(target: Subscribable<T>): T | undefined;
function useSubscribable<T>(target: Subscribable<T>, fallback: T): T;
function useSubscribable<T>(target: Subscribable<T>, fallback?: T): T | undefined {
  const [value, setValue] = useState<T | undefined>(fallback);

  useEffect(() => {
    const subscribtion = target.subscribe(setValue);
    return subscribtion.unsubscribe;
  }, [target]);

  return value;
}

export { useSubscribable };
