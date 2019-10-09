import build, { getParam } from 'shared/helpers/buildRouteTree';

const rawTree = {
  'forms-demo': null,
  validators: null,
  stakes: null,
  stake: {
    address: getParam(null),
  },
};

const routes = build(rawTree);

export default routes;
