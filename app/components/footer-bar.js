import Component from '@ember/component';

export default Component.extend({

  /*
  |----------------------------------------------------------
  | Actions
  |----------------------------------------------------------
  */
  actions: {
    /*
    |----------------------------------------------------------
    | addCategory
    |----------------------------------------------------------
    */
    addCategory() {
      let obj = this;

    },

    /*
    |----------------------------------------------------------
    | postNewNote
    |----------------------------------------------------------
    */
    postNewNote() {
      let obj = this;
      obj.postNewNote();
    },

    /*
    |----------------------------------------------------------
    | goToNewNotePage
    |----------------------------------------------------------
    */
    goToNewNotePage() {
      let obj = this;
      obj.set('wrapper.page', 'newNotePage');
      obj.transition.transition('newNotePage', 'notesPage');
    },

    /*
    |----------------------------------------------------------
    | trashClick
    |----------------------------------------------------------
    */
    trashClick() {
      let obj = this;
      if(obj.transition.activePage === 'newNotePage') {
        obj.goToNotes();
      }
    },

    /*
    |----------------------------------------------------------
    | collapseAll
    |----------------------------------------------------------
    */
    collapseAll() {
      let obj = this;
      let elems = document.getElementsByClassName('note-is-expanded');
      for(var i=elems.length - 1; i >= 0; i--) {
        elems[i].classList.toggle('note-is-collapsed');
        elems[i].classList.toggle('note-is-expanded');
      }
      obj.model.notes.setEach('expanded', false);
    },

    /*
    |----------------------------------------------------------
    | expandAll
    |----------------------------------------------------------
    */
    expandAll() {
      let obj = this;
      let elems = document.getElementsByClassName('note-is-collapsed');
      for(var i=elems.length - 1; i >= 0; i--) {
        elems[i].classList.toggle('note-is-expanded');
        elems[i].classList.toggle('note-is-collapsed');
      }
      obj.model.notes.setEach('expanded', true);
    }
  },

  /*
  |----------------------------------------------------------
  | goToNotes
  |----------------------------------------------------------
  */
  goToNotes() {
    let obj = this;
    let titleElem = document.getElementById('newNoteTitleInput');
    let bodyElem = document.getElementById('newNoteBodyInput');
    if(titleElem && bodyElem) {
      titleElem.value = null;
      bodyElem.innerHTML = null;
    }
    obj.transition.transition('notesPage', 'newNotePage');
  },

  /*
  |----------------------------------------------------------
  | postNewNote
  |----------------------------------------------------------
  */
  postNewNote() {
    let obj = this;
    let titleElem = document.getElementById('newNoteTitleInput');
    let bodyElem = document.getElementById('newNoteBodyInput');

    if(titleElem && bodyElem) {
      let titleContent = titleElem.value;
      let bodyContent = bodyElem.innerHTML;
      let noteObj = {
        categoryId: obj.model.categoryInfo.id,
        noteTitle: titleContent,
        content: bodyContent
      };
      obj.data.postNote(obj.model.user, noteObj).then((data) => {
        obj.model.notes.pushObject(data[0]);
        obj.goToNotes();
      });
    }
  }
});
