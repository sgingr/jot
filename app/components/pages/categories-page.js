import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  pageName: 'categories',
  pageId: 'categoriesPage',
  isActive: computed('transition.activePage', function() {
    return this.transition.activePage === this.pageId;
  }),
  sortedCategories: computed('model.categories', function() {
    if(this.model.categories && Array.isArray(this.model.categories)) {
      return this.model.categories.sortBy('name');
    }
  }),
  transitionInClass: 'slideInLeft',

  actions: {
    categoryClick(cat) {
      let obj = this;
      //obj.router.transitionTo('notes', { queryParams: { user: obj.model.user, category: cat.id } });
      obj.data.getNoteList(obj.model.user, cat.id).then((data) => {
        obj.set('model.notes', data);
        obj.set('model.categoryInfo', obj.data.getCategoryDetails(cat.id));
        obj.set('wrapper.label', obj.model.categoryInfo.name);
        obj.set('wrapper.showBackButton', true);
        obj.transition.transition('notesPage', obj.pageId);
      });
    }
  }
});
