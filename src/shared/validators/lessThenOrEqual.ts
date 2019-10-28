import BN from 'bn.js';
import { tKeys, ITranslateKey } from 'services/i18n';

export const lessThenOrEqual = (
  value: number | BN,
  currentValue: string | number,
  formatValue?: (value: number | BN) => any,
): ITranslateKey | undefined => {
  const isValid = BN.isBN(value) ? value.gte(new BN(currentValue)) : Number(currentValue) <= value;

  return isValid
    ? undefined
    : {
        key: tKeys.shared.validation.lessThenOrEqual.getKey(),
        params: { value: formatValue ? formatValue(value) : String(value) },
      };
};
