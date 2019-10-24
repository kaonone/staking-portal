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
  const [extrinsic] = useSubscribable(() => api.getExtrinsic$(), []);

  const showNotifications = React.useCallback(
    async (submittedExtrinsic: NonNullable<typeof extrinsic>) => {
      const method = submittedExtrinsic.extrinsic.method;
      const pendingNotificationKey = enqueueSnackbar(t(tKeys[method].pending.getKey()), {
        persist: true,
        variant: 'info',
      });

      try {
        await submittedExtrinsic.promise;
        enqueueSnackbar(t(tKeys[method].success.getKey()), { variant: 'success' });
      } catch {
        enqueueSnackbar(t(tKeys[method].error.getKey()), { variant: 'error' });
      } finally {
        pendingNotificationKey && closeSnackbar(pendingNotificationKey);
      }
    },
    [enqueueSnackbar, closeSnackbar],
  );

  React.useEffect(() => {
    extrinsic && showNotifications(extrinsic);
  }, [extrinsic]);

  return <></>;
}

export default ExtrinsicNotifications;
