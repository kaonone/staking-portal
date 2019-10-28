import BN from 'bn.js';

export function max(firstNumber: BN, secondNumber: BN): BN {
  return firstNumber.gt(secondNumber) ? firstNumber : secondNumber;
}
