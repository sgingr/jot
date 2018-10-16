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
  | getCategoryList
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

  /*
  |----------------------------------------------------------
  | getNoteList
  |----------------------------------------------------------
  */
  getNoteList(userId, categoryId) {
    let obj = this;
    let url = config.noteListUrl + '?user=' + userId + '&category=' + categoryId;
    return fetch(url).then((data) => {
      return data;
    });
  },

  /*
  |----------------------------------------------------------
  | getCategoryDetails
  |----------------------------------------------------------
  */
  getCategoryDetails(categoryId) {
    let obj = this;
    return obj.categoryData.findBy('id', parseInt(categoryId));
  },

  /*
  |----------------------------------------------------------
  | postNoteUpdate
  |----------------------------------------------------------
  */
  postNoteUpdate(userId, noteObj) {
    let obj = this;
    let url = config.noteUpdateUrl + '?user=' + userId;
    let postData = {
      id: noteObj.id,
      content: noteObj.content
    };
    return fetch(url, {
      method: 'POST',
      data: postData,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(postData)
    }).then((data) => {
      return data;
    }).catch((err) => {
      return data;
    });
  },

  /*
  |----------------------------------------------------------
  | postNote
  |----------------------------------------------------------
  */
  postNote(userId, noteObj) {
    let obj = this;
    let url = config.noteAddUrl + '?user=' + userId;
    let json = JSON.stringify(noteObj);
    return fetch(url, {
      method: 'POST',
      data: noteObj,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: json
    }).then((data) => {
      return data;
    }).catch((err) => {
      return data;
    });
  },


});
