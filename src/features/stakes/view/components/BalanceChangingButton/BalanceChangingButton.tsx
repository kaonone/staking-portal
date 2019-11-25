import React from 'react';

import { ITranslateKey } from 'services/i18n';
import { ModalButton } from 'shared/view/components';

interface IContentProps {
  address: string;
  onCancel(): void;
}

interface IProps {
  address: string;
  ModalContent: React.ComponentType<IContentProps>;
  text: ITranslateKey;
  disabled?: boolean;
}

export function BalanceChangingButton(props: IProps) {
  const { address, ModalContent: Form, text, disabled } = props;

  return (
    <ModalButton color="primary" variant="contained" content={text} disabled={disabled} fullWidth>
      {({ closeModal }) => <Form onCancel={closeModal} address={address} />}
    </ModalButton>
  );
}
