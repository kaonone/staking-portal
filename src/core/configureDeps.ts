import { Store as ReduxStore } from 'redux';

import { LocalStorage } from 'services/storage';
import { IDependencies, IAppReduxState } from 'shared/types/app';
import { Store } from 'services/store';

export default function configureDeps(_store: ReduxStore<IAppReduxState>): IDependencies {
  const storage = new LocalStorage('v1');
  const store = new Store();

  return {
    storage,
    store,
  };
}
