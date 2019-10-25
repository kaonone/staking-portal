import { Observable, from, fromEventPattern, defer, ReplaySubject, combineLatest } from 'rxjs';
import { switchMap, retry, map } from 'rxjs/operators';
import BN from 'bn.js';
import { identity } from 'ramda';
import { ApiRx } from '@polkadot/api';
import { DerivedSessionInfo, DerivedRecentlyOffline } from '@polkadot/api-derive/types';
import { web3Enable, web3AccountsSubscribe } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import { memoize, delay } from 'shared/helpers';
import { callPolkaApi } from './callPolkaApi';
import { IStakingLedger, IDerivedStaking, IChainProperties } from './callPolkaApi/types';
import { ExtrinsicApi, ISubmittedExtrinsic, Payee } from './ExtrinsicApi';

export class Api {
  private _extrinsicApi = new ExtrinsicApi(this._substrateApi);
  constructor(private _substrateApi: Observable<ApiRx>) {}

  public getExtrinsic$(): Observable<ISubmittedExtrinsic> {
    return this._extrinsicApi.getExtrinsic$();
  }

  public async createStake(fromAddress: string, value: BN): Promise<void> {
    await this._extrinsicApi.handleExtrinsicSending(fromAddress, 'staking.bond', {
      controller: fromAddress,
      payee: Payee.staked,
      value,
    });
  }

  public async depositToStake(fromAddress: string, maxAdditionalValue: BN): Promise<void> {
    await this._extrinsicApi.handleExtrinsicSending(fromAddress, 'staking.bondExtra', {
      maxAdditionalValue,
    });
  }

  public async withdrawFromStake(fromAddress: string, amount: BN): Promise<void> {
    await this._extrinsicApi.handleExtrinsicSending(fromAddress, 'staking.unbond', {
      value: amount,
    });
  }

  public async editNominees(fromAddress: string, nextNominees: string[]): Promise<void> {
    await this._extrinsicApi.handleExtrinsicSending(fromAddress, 'staking.nominate', {
      nextNominees,
    });
  }

  public async stopNominating(fromAddress: string): Promise<void> {
    await this._extrinsicApi.handleExtrinsicSending(fromAddress, 'staking.chill');
  }

  public async redeem(fromAddress: string): Promise<void> {
    await this._extrinsicApi.handleExtrinsicSending(fromAddress, 'staking.withdrawUnbonded');
  }

  // TODO need to update stream after stopNominating
  @memoize()
  public getValidators$(): Observable<string[]> {
    // TODO Need to rewrite this after migrating to Substrate v2.
    // In Substrate v2, `query.session.validators` returns an array of stash addresses
    return callPolkaApi(this._substrateApi, 'query.session.validators').pipe(
      switchMap(validatorControllers =>
        combineLatest(validatorControllers.map(controller => this.getStakingLedger$(controller))),
      ),
      map(ledgers => ledgers.filter((ledger): ledger is IStakingLedger => !!ledger).map(ledger => ledger.stash)),
    );
  }

  @memoize()
  public checkStakeExisting$(controllerAddress: string): Observable<boolean> {
    return this.getStakingLedger$(controllerAddress).pipe(map(ledger => !!ledger));
  }

  @memoize(identity)
  public getStakingLedger$(controllerAddress: string): Observable<IStakingLedger | null> {
    return callPolkaApi(this._substrateApi, 'query.staking.ledger', controllerAddress);
  }

  @memoize(identity)
  public getStakingInfo$(stashAddress: string): Observable<IDerivedStaking> {
    return callPolkaApi(this._substrateApi, 'derive.staking.info', stashAddress);
  }

  @memoize(identity)
  public getChainProps$(): Observable<IChainProperties> {
    return callPolkaApi(this._substrateApi, 'rpc.system.properties');
  }

  @memoize()
  public getSessionInfo$(): Observable<DerivedSessionInfo> {
    return callPolkaApi(this._substrateApi, 'derive.session.info');
  }

  @memoize()
  public getValidatorOfflineInfo$(): Observable<DerivedRecentlyOffline> {
    return callPolkaApi(this._substrateApi, 'derive.staking.recentlyOffline');
  }

  @memoize()
  public getSubstrateAccounts$(): Observable<InjectedAccountWithMeta[]> {
    const accounts$ = new ReplaySubject<InjectedAccountWithMeta[]>();

    defer(() =>
      from(
        (async () => {
          const injected = await web3Enable('Akropolis Staking Portal');
          if (!injected.length) {
            await delay(1000);
          }
          return injected;
        })(),
      ),
    )
      .pipe(
        switchMap(injectedExtensions =>
          injectedExtensions.length
            ? fromEventPattern<InjectedAccountWithMeta[]>(
                emitter => web3AccountsSubscribe(emitter),
                (_, signal: ReturnType<typeof web3AccountsSubscribe>) => signal.then(unsubscribe => unsubscribe()),
              )
            : new Observable<InjectedAccountWithMeta[]>(subscriber =>
                subscriber.error(new Error('Injected extensions not found')),
              ),
        ),
        retry(3),
      )
      .subscribe(accounts$);

    return accounts$;
  }
}
