export function initialize(application) {
  application.inject('route', 'data', 'service:data');
  application.inject('controller', 'data', 'service:data');
  application.inject('component', 'data', 'service:data');
}

export default {
  initialize
};
