import { toBaseUnit } from 'shared/helpers/toBaseUnit';

export const calculateNumberFromDecimals = (amount: string, decimals: number, baseDecimals: number) => {
  const totalDecimals = baseDecimals + decimals;
  return toBaseUnit(amount, totalDecimals).toString();
};
