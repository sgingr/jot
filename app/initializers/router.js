export function initialize(application) {
  application.inject('route', 'router', 'service:router');
  application.inject('controller', 'router', 'service:router');
  application.inject('component', 'router', 'service:router');
}

export default {
  initialize
};
