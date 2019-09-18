import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { tKeys, useTranslate } from 'services/i18n';

import { useSubscribable } from 'shared/helpers/react';
import { GlobalLoader } from 'shared/view/elements';
import { RetryDialog } from 'shared/view/components';
import { useDeps } from 'core';

type Status = 'ready' | 'loading' | 'not-found-injected-web3';

interface IOwnProps {
  children: React.ReactNode;
}

type IProps = IOwnProps & RouteComponentProps;

const LoadingContainer = (props: IProps) => {
  const { store } = useDeps();
  const ready = useSubscribable(store.ready, false);
  const injectedWeb3Extensions = useSubscribable(store.app.injectedWeb3Extensions, []);
  const { t } = useTranslate();

  const status: Status = React.useMemo<Status>(() => {
    if (!ready) {
      return 'loading';
    }
    if (!injectedWeb3Extensions.length) {
      return 'not-found-injected-web3';
    }
    return 'ready';
  }, [ready, injectedWeb3Extensions]);

  const reloadPage = React.useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <>
      {status === 'ready'
        ? props.children
        : <GlobalLoader description={t(tKeys.shared.makeSureUseExtension.getKey())} />
      }
      <RetryDialog
        isOpened={status === 'not-found-injected-web3'}
        title={t(tKeys.shared.noConnection.getKey())}
        buttonText={t(tKeys.shared.retry.getKey())}
        onRetry={reloadPage}
      >
        {t(tKeys.shared.needUseExtension.getKey())}
      </RetryDialog>
    </>
  );
};

export default (
  withRouter(LoadingContainer)
);
