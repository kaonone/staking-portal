import { Observable, BehaviorSubject } from 'rxjs';
import { ApiRx } from '@polkadot/api';
import { SubmittableExtrinsic, SubmittableResultImpl } from '@polkadot/api/types';
import { web3FromAddress } from '@polkadot/extension-dapp';

import { makeSubmittableExtrinsic } from './makeSubmittableExtrinsic';
import {
  Extrinsic,
  EndpointWithRequest,
  EndpointWithoutRequest,
  Endpoint,
  Request,
  ISubmittedExtrinsic,
} from './types';

export class ExtrinsicApi {
  private _extrinsicsQueue = new BehaviorSubject<ISubmittedExtrinsic[]>([]);

  constructor(private _substrateApi: Observable<ApiRx>) {}

  public getExtrinsicsQueue$(): Observable<ISubmittedExtrinsic[]> {
    return this._extrinsicsQueue;
  }

  public async handleExtrinsicSending<E extends EndpointWithRequest>(
    from: string,
    endpoint: E,
    request: Request<E>,
  ): Promise<void>;
  public async handleExtrinsicSending<E extends EndpointWithoutRequest>(from: string, endpoint: E): Promise<void>;
  public async handleExtrinsicSending<E extends Endpoint>(
    from: string,
    endpoint: E,
    request?: Request<E>,
  ): Promise<void> {
    const extrinsic = await makeSubmittableExtrinsic(this._substrateApi, endpoint, request);
    const result = await this._signAndSendExtrinsic(extrinsic.submittable, from);
    this._pushExtrinsicToQueue(extrinsic, result);
    await result.toPromise();
  }

  private async _signAndSendExtrinsic(
    extrinsic: SubmittableExtrinsic<'rxjs'>,
    fromAddress: string,
  ): Promise<Observable<SubmittableResultImpl>> {
    await this._setSigner(fromAddress);
    return extrinsic.signAndSend(fromAddress);
  }

  private async _setSigner(fromAddress: string) {
    const substrateApi = await this._substrateApi.toPromise();
    const substrateWeb3 = await web3FromAddress(fromAddress);
    substrateApi.setSigner(substrateWeb3.signer);
  }

  private _pushExtrinsicToQueue(extrinsic: Extrinsic, result: Observable<SubmittableResultImpl>) {
    const queue = this._extrinsicsQueue.getValue();
    this._extrinsicsQueue.next([...queue, { extrinsic, result }]);
  }
}
