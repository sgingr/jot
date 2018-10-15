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
  displayNotes: computed('notes.[]', function() {
    return this.notes.sortBy('id').reverseObjects();
  }),
  noteActionDisabled: computed('activeNote', function() {
    return (!this.activeNote);
  }),
  headerLabel: computed('model.category', function() {
    if(this.data.categoryData) {
      return this.data.categoryData.name;
    }
  }),
  headerIcon: computed('model.category', function() {
    if(this.data.categoryData) {
      return this.data.categoryData.icon_class;
    }
  }),
  isActive: computed('transition.activePage', function() {
    return this.transition.activePage === this.pageId;
  }),
  transitionClass: 'slideInLeft',
  notes: null,
  newNoteText: null,
  newNoteTitle: null,
  newNoteCategoryId: null,
  noteId: 4,
  modalTitle: null,
  activeNote: null,
  maxNoteHeight: 1000,
  showNewCategoryText: false,
  showNewNoteModal: false,

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
        //console.log(newContent.trim());
        //console.log(noteObj.desc.trim());
        if(noteObj.content.trim() !== newContent.trim()) {
          set(noteObj, 'content', newContent);
          obj.postUpdateNote(noteObj);
        }
      }
    }

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
  | postNewNote
  |----------------------------------------------------------
  */
  postNewNote(item) {
    let obj = this;
    console.log('new Note POST: ');
    console.log(item);
  },

  /*
  |----------------------------------------------------------
  | postUpdateNote
  |----------------------------------------------------------
  */
  postUpdateNote(item) {
    let obj = this;
    console.log('update Note POST: ');
    console.log(item);
    obj.data.postNoteUpdate(obj.model.user, item).then((data) => {
      console.log('Post was good...');
    });
  },

  trimLeadingTrailing() {

  }
});
