import React from 'react';

import { ITranslateKey } from 'services/i18n';
import { ModalButton } from 'shared/view/components';

interface IProps {
  address: string;
  modalContent: React.JSXElementConstructor<any>;
  text: ITranslateKey;
  disabled?: boolean;
}

export function BalanceChangingButton(props: IProps) {
  const { address, modalContent: Form, text, disabled } = props;

  return (
    <ModalButton color="primary" variant="contained" content={text} disabled={disabled} fullWidth>
      {({ closeModal }) => <Form onCancel={closeModal} address={address} />}
    </ModalButton>
  );
}
