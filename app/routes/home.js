import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({

  /*
  |----------------------------------------------------------
  | Query Params
  |----------------------------------------------------------
  */
  queryParams: {
    user: {
      refreshModel: true
    },
  },

  /*
  |----------------------------------------------------------
  | Model Hook
  |----------------------------------------------------------
  */
  model(params) {
    let obj = this;

    let items = {
      user: params.user,
      categories: obj.data.getCategoryList(params.user)
    };

    return RSVP.hash(items)
  },

  /*
  |----------------------------------------------------------
  | afterModel
  |----------------------------------------------------------
  */
  afterModel(model) {
    let obj = this;
    obj.set('wrapper.user', model.user);
    obj.set('wrapper.label', 'Categories');
    obj.set('wrapper.icon', 'fa fa-home');
    obj.set('wrapper.showBackButton', false);
  }

});
