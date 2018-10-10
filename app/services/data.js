import Service from '@ember/service';
import fetch from 'ember-fetch/ajax';
import config from '../config/environment';
//import CategoryAdapter from '../adapters/category';

export default Service.extend({
  /*
  |----------------------------------------------------------
  | AdapterObjects
  |----------------------------------------------------------
  */
  categoryData: [],

  /*
  |----------------------------------------------------------
  | Methods
  |----------------------------------------------------------
  */
  getCategoryList(userId) {
    let obj = this;
    let url = config.categoryListUrl + '?user=' + userId;
    return fetch(url).then((data) => {
      obj.set('categoryData', data);
      return data;
    });
  },

  getNoteList(userId, categoryId) {
    let obj = this;
    let url = config.noteListUrl + '?user=' + userId + '&category=' + categoryId;
    return fetch(url).then((data) => {
      return data;
    });
  },

  getCategoryDetails(categoryId) {
    let obj = this;
    return obj.categoryData.findBy('id', parseInt(categoryId));
  }


});
