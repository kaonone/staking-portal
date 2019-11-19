import { ITranslateKey } from 'services/i18n';

// tslint:disable-next-line: max-line-length
// https://github.com/microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work

export class TranslatableError extends Error {
  constructor(public key: ITranslateKey) {
    super(JSON.stringify(key, null, 2));

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, TranslatableError.prototype);
  }
}
