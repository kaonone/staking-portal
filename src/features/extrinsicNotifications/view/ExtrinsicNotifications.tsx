import React from 'react';
import { useSnackbar } from 'notistack';
import { useDeps } from 'core';
import { useTranslate, tKeys as tKeysAll } from 'services/i18n';
import { useSubscribable } from 'shared/helpers/react';

function ExtrinsicNotifications() {
  const { t } = useTranslate();
  const tKeys = tKeysAll.features.notifications;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { api } = useDeps();
  const [transaction] = useSubscribable(() => api.getExtrinsic$(), []);

  React.useEffect(() => {
    if (transaction) {
      const showNotification = async () => {
        const method = transaction.extrinsic.method;
        const currentSnackbar = enqueueSnackbar(t(tKeys[method].pending.getKey()), { persist: true, variant: 'info' });

        try {
          await transaction.promise;
          enqueueSnackbar(t(tKeys[method].success.getKey()), { variant: 'success' });
        } catch {
          enqueueSnackbar(t(tKeys[method].error.getKey()), { variant: 'error' });
        } finally {
          currentSnackbar && closeSnackbar(currentSnackbar);
        }
      };

      showNotification();
    }
  }, [transaction]);

  return <></>;
}

export default ExtrinsicNotifications;
