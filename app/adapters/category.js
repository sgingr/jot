import BaseAdapter from './base-adapter';
import config from '../config/environment';

export default BaseAdapter.extend({
  url: config.categoryListUrl,
});
