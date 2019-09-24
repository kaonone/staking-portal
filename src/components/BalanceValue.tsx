import BN from 'bn.js';
import * as React from 'react';
import { formatBalance } from '@polkadot/util';

interface IProps {
  input: string | number | BN;
  withSi?: boolean;
  decimals?: number;
}

function BalanceValue(props: IProps) {
  const { input, decimals, withSi } = props;

  return <>{formatBalance(input, withSi, decimals)}</>;
}

export default BalanceValue;
