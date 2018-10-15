export function initialize(application) {
  application.inject('route', 'transition', 'service:transition');
  application.inject('controller', 'transition', 'service:transition');
  application.inject('component', 'transition', 'service:transition');
}

export default {
  initialize
};
