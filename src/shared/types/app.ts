import { ReactElement } from 'react';
import { RouteProps } from 'react-router';
import { Store as ReduxStore, Reducer, ActionCreator, Action } from 'redux';
import { SagaIterator } from 'redux-saga';
import { Observable } from 'rxjs';
import { ApiRx } from '@polkadot/api';

import * as i18nNS from 'services/i18n/namespace';
import { LocalStorage } from 'services/storage';
import { Store } from 'services/store';

export interface IModule {
  getRoutes?(): ReactElement<RouteProps> | Array<ReactElement<RouteProps>>;
  getReduxEntry?(): IReduxEntry;
}

export interface IAppData {
  modules: IModule[];
  store: ReduxStore<IAppReduxState>;
  deps: IDependencies;
}

export interface IDependencies {
  store: Store;
  storage: LocalStorage;
  polkaApi: Observable<ApiRx>;
}

export type IDictionary<T, S extends keyof any = string> = {
  [key in S]: T;
};

export interface IReduxEntry {
  reducers?: { [key in keyof IAppReduxState]?: Reducer<IAppReduxState[key]> };
  sagas?: Array<(deps: IDependencies) => () => SagaIterator>;
}

export interface IFeatureEntry<
  C extends Record<keyof C, React.ReactType<any>> | void,
  A extends Record<keyof A, ActionCreator<Action>> | void,
  S extends Record<keyof S, (state: any, ...args: any[]) => any> | void,
  > extends IReduxEntry {
  actions?: A;
  selectors?: S;
  containers?: C;
}

export interface IAppReduxState {
  // services
  i18n: i18nNS.IReduxState;
  // features
}

export type RootSaga = (deps: IDependencies) => () => SagaIterator;

export type Lang = 'en' | 'he';

export type Uid = number;
