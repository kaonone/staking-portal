import * as React from 'react';
import { Route } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import Demo from './view/Demo/Demo';

export const DemoModule: IModule = {
  getRoutes() {
    return [
      <Route exact key="Demo" path={routes.demo.getRoutePath()} component={Demo} />,
    ];
  },
};
