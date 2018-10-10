import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  sortedCategories: computed('model.categories', function() {
    if(this.model.categories) {
      return this.model.categories.sortBy('name');
    }
  }),
  transitionClass: 'animated slideInLeft',

  actions: {
    categoryClick(cat) {
      let obj = this;
      obj.router.transitionTo('notes', { queryParams: { user: obj.model.user, category: cat.id } });
    }
  }
});
