import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  pageId: 'newNotePage',
  isActive: computed('transition.activePage', function() {
    return this.transition.activePage === this.pageId;
  }),
});
