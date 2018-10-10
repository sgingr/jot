import EmberObject from '@ember/object';
import fetch from 'ember-fetch/ajax';

export default EmberObject.extend({

  /*
  |----------------------------------------------------------
  | getData
  |----------------------------------------------------------
  */
  getData(userId) {
    let obj = this;
    let url = obj.url + '?user=' + userId;
    return fetch(obj.url).then((data) => {
      return data;
    });
  }

});
