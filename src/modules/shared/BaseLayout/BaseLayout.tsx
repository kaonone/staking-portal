import * as React from 'react';
import { GetProps } from '_helpers';

import { RowsLayout } from 'shared/view/elements';

import Header from '../Header/Header';
import PageNavigation from '../PageNavigation/PageNavigation';
import { StylesProps, provideStyles } from './BaseLayout.style';

interface IOwnProps {
  title: string;
  actions?: React.ReactNode[];
  backRoutePath?: string;
  additionalHeaderContent?: React.ReactNode;
  hidePageNavigation?: boolean;
  children: React.ReactNode;
}

type IProps = IOwnProps & StylesProps;

class BaseLayout extends React.PureComponent<IProps> {
  public render() {
    const {
      children, actions, backRoutePath, title, classes, additionalHeaderContent, hidePageNavigation,
    } = this.props;
    const headerProps: GetProps<typeof Header> = {
      actions, backRoutePath, title, additionalContent: additionalHeaderContent,
    };

    return (
      <RowsLayout
        spacing={4}
        classes={{ root: classes.rootRowsLayout }}
      >
        <RowsLayout.ContentBlock>
          <Header {...headerProps} />
          {!hidePageNavigation && <PageNavigation />}
        </RowsLayout.ContentBlock>
        <RowsLayout.ContentBlock fillIn>
          {children}
        </RowsLayout.ContentBlock>
      </RowsLayout>
    );
  }
}

export { IProps };
export default provideStyles(BaseLayout);
