import Service from '@ember/service';
import fetch from 'ember-fetch/ajax';
import config from '../config/environment';

export default Service.extend({
  /*
  |----------------------------------------------------------
  | Init
  |----------------------------------------------------------
  */
  init() {
    let obj = this;
    obj._super(...arguments);

    obj.getStatusInfo().then((data) => {
      obj.set('statusInfo', data);
      console.log('set the status info...');
      console.log(obj.statusInfo);
    });
  },

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
  postNoteUpdate(userId, noteObj, newContent) {
    let obj = this;
    let url = config.noteUpdateUrl + '?user=' + userId;
    let postData = {
      id: noteObj.id,
      content: newContent
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
  | postNoteMetaUpdate
  |----------------------------------------------------------
  */
  postNoteMetaUpdate(userId, noteObj) {
    let obj = this;
    let url = config.noteUpdateUrl + '?user=' + userId;
    let postData = {
      id: noteObj.id,
      active: (noteObj.active) ? 1 : 0,
      flagged: noteObj.flagged,
      status_id: noteObj.statusId,
      //title: noteObj.title,
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

  /*
  |----------------------------------------------------------
  | getStatusInfo
  |----------------------------------------------------------
  */
  getStatusInfo() {
    let obj = this;
    let url = config.statusInfoUrl;
    return fetch(url).then((data) => {
      return data;
    });
  },



});
