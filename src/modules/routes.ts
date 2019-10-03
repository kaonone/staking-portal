import build from 'shared/helpers/buildRouteTree';

const rawTree = {
  validators: null,
  stakes: null,
};

const routes = build(rawTree);

export default routes;
