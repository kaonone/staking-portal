import 'reflect-metadata';
import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { App } from 'core/App';
import configureApp from 'core/configureApp';
import getEnvParams from 'core/getEnvParams';

const appData = configureApp();

async function main() {
  render(<App {...appData} />);
}

/* Start application */
main();

/* Hot Module Replacement API */
if ((module as any).hot && process.env.NODE_ENV !== 'production') {
  (module as any).hot.accept(['./core/App', './core/configureApp'], () => {
    const nextConfigureApp: typeof configureApp = require('./core/configureApp').default;
    const NextApp: typeof App = require('./core/App').App;
    const nextAppData = nextConfigureApp(appData);
    render(<NextApp {...nextAppData} />);
  });
}

function render(component: React.ReactElement<any>) {
  ReactDOM.hydrate(
    <AppContainer>{component}</AppContainer>,
    document.getElementById('root'),
  );
}

/* tslint:disable */
console.info(`%cApp version: ${getEnvParams().appVersion}`, 'background: #EBF5F8; color: gray; font-size: x-medium; border-radius: 5px; padding: 5px;');
/* tslint:enable */
