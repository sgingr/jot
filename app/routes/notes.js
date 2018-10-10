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
    category: {
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
      category: params.category,
      categoryInfo: obj.data.getCategoryDetails(params.category),
      notes: obj.data.getNoteList(params.user, params.category)
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
    obj.set('wrapper.label', model.categoryInfo.name);
    obj.set('wrapper.showBackButton', true);
  }

});
