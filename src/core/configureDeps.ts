import { Store as ReduxStore } from 'redux';
import { ApiRx, WsProvider } from '@polkadot/api';

import { Store } from 'services/store';
import { LocalStorage } from 'services/storage';
import { IDependencies, IAppReduxState } from 'shared/types/app';

import { NODE_API_URL, NODE_CUSTOM_TYPES } from './constants';

export default function configureDeps(_store: ReduxStore<IAppReduxState>): IDependencies {
  const storage = new LocalStorage('v1');
  const polkaApi = ApiRx.create({
    provider: new WsProvider(NODE_API_URL),
    types: NODE_CUSTOM_TYPES,
  });
  const store = new Store(polkaApi);

  return {
    store,
    storage,
    polkaApi,
  };
}
