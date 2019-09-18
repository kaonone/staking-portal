import build from 'shared/helpers/buildRouteTree';

const rawTree = {
  validators: null,
};

const routes = build(rawTree);

export default routes;
