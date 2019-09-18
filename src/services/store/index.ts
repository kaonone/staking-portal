import { ApiRx, WsProvider } from '@polkadot/api';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { NODE_API_URL, NODE_CUSTOM_TYPES } from 'core/constants';
import { AppStore } from './App';

export class Store {
  public app = new AppStore();

  public readonly ready = new BehaviorSubject<boolean>(false);
  private readonly api: BehaviorSubject<ApiRx | null> = new BehaviorSubject(null);

  public constructor() {
    ApiRx.create({
      provider: new WsProvider(NODE_API_URL),
      types: NODE_CUSTOM_TYPES,
    }).subscribe(api => this.api.next(api));

    combineLatest(
      this.api.asObservable(),
      this.app.ready.asObservable(),
      (api, appReady) => !!api && appReady,
    ).subscribe(ready => this.ready.next(ready));
  }
}
