import { tKeys } from 'services/i18n';

const floatRegExp = /^-?\d+?([.]|[.]\d+)?$/;

function makeFloatDecimalsRegExp(decimals: number) {
  return new RegExp(`^-?\\d+?([.]|[.]\\d{1,${decimals}})?$`);
}

export const validateFloat = (decimals: number) => (value: string) => {
  return (
    !floatRegExp.test(value) && tKeys.shared.validation.isNumber.getKey() ||
    !makeFloatDecimalsRegExp(decimals).test(value) &&
    { key: tKeys.shared.validation.decimalsMoreThen.getKey(), params: { decimals } } ||
    undefined
  );
};
