import * as React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '../elements';

interface IProps {
  isOpened: boolean;
  title: string;
  buttonText: string;
  children: string;
  onRetry(): void;
}

function RetryDialog(props: IProps) {
  const { buttonText, children, isOpened, onRetry, title } = props;
  return (
    <Dialog
      open={isOpened}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRetry} color="primary">
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RetryDialog;
