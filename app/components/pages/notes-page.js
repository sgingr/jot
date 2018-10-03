import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  /*
  |----------------------------------------------------------
  | Properties
  |----------------------------------------------------------
  */
  displayNotes: computed('notes.[]', function() {
    return this.notes.sortBy('id').reverseObjects();
  }),
  noteActionDisabled: computed('activeNote', function() {
    return (!this.activeNote);
  }),
  notes: null,
  newNoteText: null,
  newNoteTitle: null,
  newNoteCategoryId: null,
  noteId: 4,
  modalTitle: null,
  activeNote: null,

  /*
  |----------------------------------------------------------
  | Properties
  |----------------------------------------------------------
  */
  init() {
    this._super(...arguments);
    let obj = this;
    obj.notes = [{
      id: 1,
      categoryId: '2',
      category: 'Work',
      iconClass: 'ion-hammer',
      title: 'Password for DSCA LDAP',
      desc: "Changed 7/21/2018\n ^Y%T$R#Essaqw"
    }, {
      id: 2,
      categoryId: '1',
      category: 'Idea',
      iconClass: 'ion-lightbulb',
      title: 'Clowns are crazy',
      desc: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
    }, {
      id: 3,
      categoryId: '4',
      category: 'Quote',
      iconClass: 'ion-quote',
      title: 'Deer Hunting',
      desc: "\"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.\"\n -Harper"
    }, {
      id: 4,
      categoryId: '1',
      category: 'Idea',
      iconClass: 'ion-lightbulb',
      title: 'Wacky Fun',
      desc: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
    }];

    obj.categories = [{
      label: 'Idea',
      id: '1',
      iconClass: 'ion-lightbulb'
    }, {
      label: 'Work',
      id: '2',
      iconClass: 'ion-hammer'
    }, {
      label: 'Money',
      id: '3',
      iconClass: 'ion-social-usd'
    }, {
      label: 'Quote',
      id: '4',
      iconClass: 'ion-quote'
    }, {
      label: 'ToDo',
      id: '5',
      iconClass: 'ion-clipboard'
    }];
  },

  /*
  |----------------------------------------------------------
  | didInsertElement
  |----------------------------------------------------------
  */
  didInsertElement() {
    //Category select
    $('#notesCategorySelect').selectize({
      create: true,
      placeholder: 'Enter a Category',
      sortField: 'text'
    });

    //Show modal function
    $('#actionModal').on('show.bs.modal', function () {
      $('.modal .modal-dialog').attr('class', 'modal-dialog zoomIn animated');
    })

    //Hide modal function
    $('#actionModal').on('hide.bs.modal', function () {
      $('.modal .modal-dialog').attr('class', 'modal-dialog zoomOut animated');
    })
  },

  /*
  |----------------------------------------------------------
  | actions
  |----------------------------------------------------------
  */
  actions: {
    addNote() {
      let obj = this;
      let categoryObj = obj.categories.findBy('id', obj.newNoteCategoryId);
      let tmp = {
        id: obj.incrementProperty('noteId'),
        category: categoryObj.label,
        title: obj.newNoteTitle,
        desc: obj.newNoteText,
        categoryId: obj.newNoteCategoryId,
        iconClass: categoryObj.iconClass
      }
      obj.notes.pushObject(tmp);
      obj.set('newNoteText', null);
      obj.set('newNoteTitle', null);
      obj.set('newNoteCategoryId', null);
    },

    setActiveNote(note) {
      let obj = this;
      if(!obj.activeNote || (note.id !== obj.activeNote.id)) {
        obj.set('activeNote', note);
      } else {
        obj.set('activeNote', null);
      }
    },

    createNoteModal() {
      let obj = this;
      obj.set('modalTitle', 'Create a New Note');
      obj.set('newNoteText', null);
      obj.set('newNoteTitle', null);
      obj.set('newNoteCategoryId', null);
      $('#actionModal').modal('show');
    },

    editNoteModal() {
      let obj = this;
      console.log(obj.activeNote);
      obj.set('modalTitle', 'Do Some Editing');
      if(obj.activeNote) {
        obj.set('newNoteText', obj.activeNote.desc);
        obj.set('newNoteTitle', obj.activeNote.title);
        obj.set('newNoteCategoryId', obj.activeNote.categoryId);
        $('#actionModal').modal('show');
      }
    },

    editNote() {
      let obj = this;
      let note = obj.notes.objectAt(obj.notes.in)
    },

    deleteNoteModal() {
      let obj = this;
      obj.set('modalTitle', 'Trash This Note');
    }
  }
});
