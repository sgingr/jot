import Component from '@ember/component';
import { computed, set, observer } from '@ember/object';
import { later } from '@ember/runloop';

export default Component.extend({
  /*
  |----------------------------------------------------------
  | Properties
  |----------------------------------------------------------
  */
  pageName: 'notesPage',
  pageId: 'notesPage',
  sortedNotes: computed('model.notes', 'model.notes.[]', function() {
    if(this.model.notes) {
      return this.model.notes.sortBy('sortKey').reverseObjects();
    }
    return [];
  }),
  isActive: computed('transition.activePage', function() {
    return this.transition.activePage === this.pageId;
  }),
  transitionClass: 'slideInLeft',
  notes: null,

  /*
  |----------------------------------------------------------
  | Properties
  |----------------------------------------------------------
  */

  /*
  |----------------------------------------------------------
  | actions
  |----------------------------------------------------------
  */
  actions: {
    /*
    |----------------------------------------------------------
    | deleteNoteModal
    |----------------------------------------------------------
    */
    deleteNoteModal() {
      let obj = this;
      obj.closeNewNoteModal();
    },

    /*
    |----------------------------------------------------------
    | showNote
    |----------------------------------------------------------
    */
    showNote(noteObj, event) {
      let obj = this;
      event.preventDefault();
      let id = 'note-list-item-' + noteObj.id;
      let elem = document.getElementById(id);
      elem.classList.toggle('note-is-collapsed');
      elem.classList.toggle('note-is-expanded');
      elem.classList.toggle('showNote');
      set(noteObj, 'expanded', !noteObj.expanded);
    },

    /*
    |----------------------------------------------------------
    | inputBlur
    |----------------------------------------------------------
    */
    inputBlur(noteObj) {
      let obj = this;
      let elem = document.getElementById('note-list-content-' + noteObj.id);

      if(elem) {
        //Post update if it changed
        let newContent = elem.innerHTML;
        if(noteObj.content.trim() !== newContent.trim()) {
          //set(noteObj, 'content', newContent);
          obj.postUpdateNote(noteObj);
        }
      }
    },

    /*
    |----------------------------------------------------------
    | showNoteMenuPage
    |----------------------------------------------------------
    */
    showNoteMenuPage() {
      let obj = this;
      obj.set('wrapper.page', 'noteMenuPage');
      obj.transition.transition('noteMenuPage', 'notesPage');
    },

  },

  /*
  |----------------------------------------------------------
  | closeNewNoteModal
  |----------------------------------------------------------
  */
  closeNewNoteModal() {
    let obj = this;
    let modal = document.getElementById('newNoteModal');
    modal.classList.remove("slideInLeft");
    modal.classList.add("slideOutRight");
    later(function() {
      obj.set('showNewNoteModal', false);
    },1000);
  },

  /*
  |----------------------------------------------------------
  | postUpdateNote
  |----------------------------------------------------------
  */
  postUpdateNote(noteObj) {
    let obj = this;
    obj.data.postNoteUpdate(obj.model.user, noteObj).then((data) => {
      set(noteObj, 'sortKey', data[0].sortKey);
      set(noteObj, 'lastModify', data[0].lastModify);
    });
  },

  trimLeadingTrailing() {

  }
});
