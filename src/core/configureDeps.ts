import { Store as ReduxStore } from 'redux';
import { ApiRx, WsProvider } from '@polkadot/api';

import { Api } from 'services/api';
import { Store } from 'services/store';
import { LocalStorage } from 'services/storage';
import { IDependencies, IAppReduxState } from 'shared/types/app';

import { NODE_API_URL, NODE_CUSTOM_TYPES } from './constants';

export default function configureDeps(_store: ReduxStore<IAppReduxState>): IDependencies {
  const storage = new LocalStorage('v1');
  const substrateApi = ApiRx.create({
    provider: new WsProvider(NODE_API_URL),
    types: NODE_CUSTOM_TYPES,
  });
  const api = new Api(substrateApi);
  const store = new Store(substrateApi);

  return {
    store,
    storage,
    api,
  };
}
