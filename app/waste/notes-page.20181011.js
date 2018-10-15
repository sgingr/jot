import Component from '@ember/component';
import { computed, set } from '@ember/object';
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
    showNote(idx, noteObj) {
      let obj = this;

      let elem = document.getElementById('note-btn-' + idx);
      let note = elem.nextElementSibling;
      let noteBody = note.firstElementChild;
      if (note.style.maxHeight){
        note.style.maxHeight = null;
        //Post update if it changed
        let newContent = noteBody.innerHTML;
        //console.log(newContent.trim());
        //console.log(noteObj.desc.trim());
        if(noteObj.content.trim() !== newContent.trim()) {
          set(noteObj, 'desc', newContent);
          obj.postUpdateNote(noteObj);
        }

      } else {
        //note.style.maxHeight = note.scrollHeight + "px";
        note.style.maxHeight = obj.maxNoteHeight + "px";
        //console.log(noteBody);
        //console.dir(noteBody);
        //console.log('text is = ' + noteBody.textContent);
        //console.log(noteBody.innerHTML);
      }
      //console.log(obj.notes);
    },

    /*
    |----------------------------------------------------------
    | toggleNewCategoryText
    |----------------------------------------------------------
    */
    toggleNewCategoryText() {
      let obj = this;
      obj.toggleProperty('showNewCategoryText');
    },

    /*
    |----------------------------------------------------------
    | showNewNoteModal
    |----------------------------------------------------------
    */
    showNewNoteModal() {
      let obj = this;
      if(obj.showNewNoteModal) {
        let categoryObj = obj.categories.findBy('id', obj.newNoteCategoryId);
        let newNoteBody = document.getElementById('newNoteBodyInput');
        let tmp = {
          id: obj.incrementProperty('noteId'),
          category: categoryObj.label,
          title: obj.newNoteTitle,
          desc: newNoteBody.innerHTML,
          categoryId: obj.newNoteCategoryId,
          iconClass: categoryObj.iconClass
        }
        obj.notes.pushObject(tmp);
        obj.postNewNote(tmp);
        obj.set('newNoteText', null);
        obj.set('newNoteTitle', null);
        obj.set('newNoteCategoryId', null);
        obj.set('newNoteCategoryText', null);
        newNoteBody.innerHTML = null;
        obj.closeNewNoteModal();
      } else {
        obj.set('showNewNoteModal', true);
      }
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
  },

  trimLeadingTrailing() {

  }
});
