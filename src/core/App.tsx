import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { MuiThemeProvider } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import 'normalize.css';

import { I18nProvider } from 'services/i18n';
import { IAppData, IModule, IDependencies } from 'shared/types/app';
import { BaseStyles, theme } from 'shared/styles';
import { Snackbar } from 'shared/view/components';
import { ExtrinsicNotifications } from 'features/extrinsicNotifications';

import createRoutes from './routes';
import { DepsContext } from './DepsReactContext';

interface IAppProps {
  modules: IModule[];
  deps: IDependencies;
}

export function App({ modules, store, deps }: IAppData & IAppProps) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Snackbar>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DepsContext.Provider value={deps}>
              <I18nProvider>
                <MuiThemeProvider theme={theme}>
                  <BaseStyles />
                  <ExtrinsicNotifications />
                  {createRoutes(modules)}
                </MuiThemeProvider>
              </I18nProvider>
            </DepsContext.Provider>
          </MuiPickersUtilsProvider>
        </Snackbar>
      </BrowserRouter>
    </Provider>
  );
}
