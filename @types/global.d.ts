// Global definitions (you shouldn't import it, it is global scope)
/* tslint:disable */

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module '*.scss';
declare module '*.png';
declare module 'decko';
declare module 'react-hot-loader';
declare module 'enzyme-adapter-react-16';
declare module 'jss-compose';

declare module 'postcss-reporter';
declare module 'postcss-easy-import';
declare module 'postcss-scss';
declare module 'stylelint';
declare module 'doiuse';

declare module 'webpack-isomorphic-dev-middleware';
declare module 'thread-loader';
declare module 'react-jss-hmr/webpack';
declare module 'circular-dependency-plugin';
declare module 'filemanager-webpack-plugin';
declare module 'react-minimal-pie-chart';
