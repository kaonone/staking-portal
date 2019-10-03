import * as React from 'react';
import { Route } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import Stakes from './view/Stakes/Stakes';
import Stake from './view/Stake/Stake';

export const StakesModule: IModule = {
  getRoutes() {
    return [
      <Route exact key="Stakes" path={routes.stakes.getRoutePath()} component={Stakes} />,
      <Route exact key="Stake" path={routes.stake.address.getRoutePath()} component={Stake} />,
    ];
  },
};
