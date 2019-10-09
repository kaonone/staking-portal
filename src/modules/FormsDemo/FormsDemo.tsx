import * as React from 'react';
import { Route } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import FormsDemo from './view/FormsDemo/FormsDemo';

export const FormsDemoModule: IModule = {
  getRoutes() {
    return [
      <Route exact key="FormsDemo" path={routes['forms-demo'].getRoutePath()} component={FormsDemo} />,
    ];
  },
};
