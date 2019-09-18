import * as React from 'react';
import { Route } from 'react-router-dom';

import routes from 'modules/routes';
import { IModule } from 'shared/types/app';

import Validators from './view/Validators/Validators';

export const ValidatorsModule: IModule = {
  getRoutes() {
    return [
      <Route exact key="Validators" path={routes.validators.getRoutePath()} component={Validators} />,
    ];
  },
};
