import Component from '@ember/component';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';

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
  maxNoteHeight: 1000,
  showNewCategoryText: false,
  showNewNoteModal: false,

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
    showNote(idx) {
      let obj = this;

      let elem = document.getElementById('note-btn-' + idx);
      let note = elem.nextElementSibling;
      if (note.style.maxHeight){
        note.style.maxHeight = null;
      } else {
        //note.style.maxHeight = note.scrollHeight + "px";
        note.style.maxHeight = obj.maxNoteHeight + "px";
      }
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
        obj.set('newNoteCategoryText', null);
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
  }
});
