import Component from '@ember/component';
//import { computed } from '@ember/object';

export default Component.extend({
  /*
  mainLabel: computed('type', function() {
    if(this.type === 'home') {
      return 'Categories';
    } else if(this.type === 'notes') {
      return this.categoryName;
    }
  })
  */

  actions: {
    goHome() {
      let obj = this;
      obj.router.transitionTo('home', { queryParams: { user: obj.wrapper.user }});
    }
  }
});