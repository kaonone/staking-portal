import { ApiRx } from '@polkadot/api';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { AppStore } from './App';

// tslint:disable: member-ordering
export class Store {
  public readonly ready = new BehaviorSubject<boolean>(false);

  public readonly app = new AppStore(this._api);

  // tslint:enable: member-ordering
  public constructor(private readonly _api: Observable<ApiRx>) {
    combineLatest(
      this._api,
      this.app.ready.asObservable(),
      (api, appReady) => !!api && appReady,
    ).subscribe(ready => this.ready.next(ready));
  }
}
