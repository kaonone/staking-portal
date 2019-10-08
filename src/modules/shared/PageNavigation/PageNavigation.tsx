import * as React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import routes from 'modules/routes';
import { Tabs, Tab } from 'shared/view/elements';

function PageNavigation() {
  return (
    <Route path="/:page" >
      {({ match }) => (
        <Tabs
          value={match && match.params.page}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            component={Link}
            label="My stakes"
            value={routes.stakes.getElementKey()}
            to={routes.stakes.getRedirectPath()}
          />
          <Tab
            component={Link}
            label="Validators"
            value={routes.validators.getElementKey()}
            to={routes.validators.getRedirectPath()}
          />
        </Tabs>
      )}
    </Route>
  );
}

export default PageNavigation;
