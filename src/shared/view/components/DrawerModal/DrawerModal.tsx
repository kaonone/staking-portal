import * as React from 'react';

import { provideStyles, StylesProps } from './DrawerModal.style';
import { useTranslate, tKeys } from 'services/i18n';
import { Button, Drawer, Hint } from 'shared/view/elements';
import { Alert } from 'shared/view/elements/Icons';

interface IOwnProps {
  title: string;
  open: boolean;
  actions: Array<React.ReactElement<any>>;
  hint?: string;

  onClose(): void;
}

type IProps = IOwnProps & StylesProps;

class DrawerModal extends React.Component<IProps> {
  public render() {
    const { classes, children, onClose, open, actions, hint, title } = this.props;
    const { t } = useTranslate();

    return (
      <Drawer
        onClose={onClose}
        open={open}
        anchor="right"
      >
        <div className={classes.root}>
          <div className={classes.title}>{title}</div>
          <div className={classes.content}>{children}</div>
          {hint && (
            <Hint>
              <Alert className={classes.hintIcon} />
              {hint}
            </Hint>
          )}
          <div className={classes.actions}>
            {actions.map((action, i) => <div className={classes.action} key={i}>{action}</div>)}
            <Button variant="outlined" className={classes.cancelButton} onClick={onClose} fullWidth>
              {t(tKeys.shared.cancel.getKey())}
            </Button>
          </div>
        </div>
      </Drawer>
    );
  }
}

export { IProps };
export default provideStyles(DrawerModal);
