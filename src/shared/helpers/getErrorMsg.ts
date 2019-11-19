import { ITranslateKey } from 'services/i18n';
import { TranslatableError } from 'shared/errors';

/**
 * @summary
 * Checks error, caught in try/catch block and returns correct error representation of that
 */
function getErrorMsg(error: any): ITranslateKey {
  if (error instanceof TranslatableError) {
    return error.key;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

export default getErrorMsg;
