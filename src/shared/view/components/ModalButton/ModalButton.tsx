import * as React from 'react';
import { GetProps } from '_helpers';
import { DialogProps } from '@material-ui/core/Dialog';
import { makeStyles } from 'shared/styles';
import { Button, Dialog, DialogContent } from '../../elements';

interface IChildrenProps {
  closeModal(): void;
}

type ButtonProps = Pick<GetProps<typeof Button>, 'variant' | 'color'>;

interface IProps extends ButtonProps {
  dialogMaxWidth?: DialogProps['maxWidth'];
  content: React.ReactNode;
  children: React.ReactNode | ((props: IChildrenProps) => React.ReactNode);
}

function ModalButton(props: IProps) {
  const classes = useStyles();
  const { children, content, dialogMaxWidth, ...rest } = props;
  const [isOpened, setIsOpened] = React.useState(false);

  const openModal = React.useCallback(() => setIsOpened(true), []);
  const closeModal = React.useCallback(() => setIsOpened(false), []);

  return (
    <>
      <Button {...rest} onClick={openModal}>
        {content}
      </Button>
      <Dialog fullWidth maxWidth={dialogMaxWidth || 'sm'} open={isOpened} onClose={closeModal}>
        <DialogContent className={classes.dialogContent}>
          {typeof children === 'function' ? children({ closeModal }) : children}
        </DialogContent>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  dialogContent: {
    padding: theme.spacing(2.5),
  },
}));

export default ModalButton;
