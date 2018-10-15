import Component from '@ember/component';

export default Component.extend({

  actions: {
    addClick() {
      let obj = this;
      //Add a new note
      if(obj.transition.activePage === 'notesPage') {
        obj.transition.transition('newNotePage', 'notesPage');
      } else if(obj.transition.activePage === 'categoriesPage') {

      }
    }
  }
});
