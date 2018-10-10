export function initialize(application) {
  application.inject('route', 'wrapper', 'service:wrapper');
  application.inject('controller', 'wrapper', 'service:wrapper');
  application.inject('component', 'wrapper', 'service:wrapper');
}

export default {
  initialize
};
