import Component from '@ember/component';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';

export default Component.extend({
  pageName: 'categories',
  pageId: 'categoriesPage',
  showBadges: false,
  isActive: computed('transition.activePage', function() {
    return this.transition.activePage === this.pageId;
  }),
  sortedCategories: computed('model.categories', function() {
    if(this.model.categories && Array.isArray(this.model.categories)) {
      return this.model.categories.sortBy('name');
    }
  }),

  actions: {
    categoryClick(cat) {
      let obj = this;
      obj.data.getNoteList(obj.model.user, cat.id).then((data) => {
        obj.set('model.notes', data);
        obj.set('model.categoryInfo', obj.data.getCategoryDetails(cat.id));
        obj.set('wrapper.page', 'notesPage');
        obj.set('wrapper.label', obj.model.categoryInfo.name);
        obj.set('wrapper.iconClass', obj.model.categoryInfo.iconClass);
        obj.set('wrapper.showBackButton', true);
        obj.transition.transition('notesPage', obj.pageId);
      });
    }
  }
});
