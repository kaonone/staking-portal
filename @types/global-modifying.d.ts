import { InjectedWindowProvider } from '@polkadot/extension-inject/types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(): any;
    injectedWeb3: Record<string, InjectedWindowProvider>
  }
}
