import { BehaviorSubject, Observable } from 'rxjs';
import { InjectedExtension, InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { web3Enable, web3AccountsSubscribe } from '@polkadot/extension-dapp';
import { ApiRx } from '@polkadot/api';
import { formatBalance } from '@polkadot/util';

import { callPolkaApi } from 'services/api';

export class AppStore {
  public readonly ready = new BehaviorSubject<boolean>(false);
  public readonly injectedWeb3Extensions = new BehaviorSubject<InjectedExtension[]>([]);
  public readonly accounts = new BehaviorSubject<InjectedAccountWithMeta[]>([]);

  public constructor(private readonly _api: Observable<ApiRx>) {
    Promise.all([
      web3Enable('Akropolis Network Dapp')
        .then(injected => {
          this.injectedWeb3Extensions.next(injected);
          web3AccountsSubscribe(accounts => this.accounts.next(accounts));
        }),
      this.setBalanceFormatterDefaults(),
    ])
      .finally(() => this.ready.next(true));
  }

  private async setBalanceFormatterDefaults() {
    const props = await callPolkaApi(this._api, 'rpc.system.properties').toPromise();

    formatBalance.setDefaults({
      decimals: props.tokenDecimals,
      unit: props.tokenSymbol,
    });
  }
}
