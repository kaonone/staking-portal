import * as React from 'react';
import { Route } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import Stakes from './view/Stakes/Stakes';

export const StakesModule: IModule = {
  getRoutes() {
    return [
      <Route exact key="Stakes" path={routes.stakes.getRoutePath()} component={Stakes} />,
    ];
  },
};
