import Component from '@ember/component';
import { set, computed } from '@ember/object';

export default Component.extend({
  pageId: 'noteMenuPage',
  isActive: computed('transition.activePage', function() {
    return this.transition.activePage === this.pageId;
  }),

  actions: {
    closeModal() {
      let obj = this;
      if(obj.postData) {
        obj.data.postNoteMetaUpdate(obj.model.user, obj.model.activeNote).then((data) => {
          set(obj.model.activeNote, 'sortKey', data[0].sortKey);
          set(obj.model.activeNote, 'lastModify', data[0].lastModify);
          set(obj.model.activeNote, 'statusClass', data[0].statusClass);
          obj.transition.transition('notesPage', 'noteMenuPage');
        });
      } else {
        obj.transition.transition('notesPage', 'noteMenuPage');
      }
      obj.set('postData', false);
    },
    setStatus(status) {
      let obj = this;
      obj.set('postData', true);
      set(obj.model.activeNote, 'statusId', status.id);
    },
    toggleFlagged() {
      let obj = this;
      obj.set('postData', true);
      set(obj.model.activeNote, 'flagged', (obj.model.activeNote.flagged === 0) ? 1 : 0);
    },
    toggleActive() {
      let obj = this;
      obj.set('postData', true);
      set(obj.model.activeNote, 'active', (obj.model.activeNote.active === 0) ? 1 : 0);
    }
  }

});
