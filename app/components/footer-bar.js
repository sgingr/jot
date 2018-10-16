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
    | addClick
    |----------------------------------------------------------
    */
    addClick() {
      let obj = this;
      //Add a new note
      if(obj.transition.activePage === 'notesPage') {
        obj.transition.transition('newNotePage', 'notesPage');
      } else if(obj.transition.activePage === 'categoriesPage') {

      } else if(obj.transition.activePage === 'newNotePage') {
        obj.postNewNote();
      }
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
