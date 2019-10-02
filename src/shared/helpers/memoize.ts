import { memoizeWith, always } from 'ramda';

const initial = Symbol('initial');

export default function memoize(by?: (...args: any[]) => string) {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    if (typeof descriptor.value === 'function') {
      return _memoizeMethod(target, name, descriptor.value, descriptor, by);
    } else if (typeof descriptor.get === 'function') {
      return _memoizeGetter(target, name, descriptor.get, descriptor);
    } else {
      throw new Error('@memoize decorator can be applied to methods or getters, got ' + String(descriptor.value) + ' instead');
    }
  };
}

function _memoizeGetter(
  target: any,
  name: string,
  getter: () => any,
  descriptor: PropertyDescriptor,
) {
  const memoizedName = Symbol(`_memoized_${name}`);
  target[memoizedName] = initial;

  return {
    ...descriptor,
    get() {
      if (this[memoizedName] === initial) {
        this[memoizedName] = memoizeWith(always('result'), getter.bind(this));
      }
      return this[memoizedName]();
    },
  };
}

function _memoizeMethod(
  target: any,
  name: string,
  method: (...args: []) => any,
  descriptor: PropertyDescriptor,
  by?: (...args: any[]) => string,
) {
  const memoizedName = Symbol(`_memoized_${name}`);
  target[memoizedName] = initial;
  return {
    ...descriptor,
    value(...args: []) {
      if (this[memoizedName] === initial) {
        this[memoizedName] = memoizeWith(by || always('result'), method.bind(this));
      }
      return this[memoizedName](...args);
    },
  };
}
