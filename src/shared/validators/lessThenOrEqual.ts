import BN from 'bn.js';
import { tKeys, ITranslateKey } from 'services/i18n';

export function lessThenOrEqual(value: number | BN, currentValue: number): ITranslateKey | undefined {
  const isValid = BN.isBN(value)
    ? value.gte(new BN(currentValue))
    : currentValue <= value;

  return isValid ? undefined : {
    key: tKeys.shared.validation.lessThenOrEqual.getKey(),
    params: { value: new BN(value).toString() },
  };
}
