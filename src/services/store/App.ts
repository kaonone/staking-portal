import { BehaviorSubject } from 'rxjs';
import { InjectedExtension, InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { web3Enable, web3AccountsSubscribe } from '@polkadot/extension-dapp';

export class AppStore {
  public readonly ready = new BehaviorSubject<boolean>(false);
  public readonly injectedWeb3Extensions = new BehaviorSubject<InjectedExtension[]>([]);
  public readonly accounts = new BehaviorSubject<InjectedAccountWithMeta[]>([]);

  public constructor() {
    web3Enable('Akropolis Network Dapp')
      .then(injected => {
        this.injectedWeb3Extensions.next(injected);
        web3AccountsSubscribe(accounts => this.accounts.next(accounts));
      })
      .finally(() => this.ready.next(true));
  }
}
