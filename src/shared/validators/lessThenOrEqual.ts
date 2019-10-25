import BN from 'bn.js';
import { formatBalance } from '@polkadot/util';
import { tKeys, ITranslateKey } from 'services/i18n';

export const lessThenOrEqual = (value: number | BN) => (currentValue: string): ITranslateKey | undefined => {
  const isValid = BN.isBN(value) ? value.gte(new BN(currentValue)) : Number(currentValue) <= value;

  return isValid
    ? undefined
    : {
        key: tKeys.shared.validation.lessThenOrEqual.getKey(),
        params: { value: formatBalance(value) },
      };
};
