import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  model: function(params) {
    let page;
    if(params.page_id) {
      page = this.store.find('page', params.page_id);
     } else {
      page = this.store.createRecord('page');
    }

    return Ember.RSVP.hash({
      page: page,
      isAuthenticated: this.get('session.isAuthenticated')
    });
  },
  actions: {
    save: function() {
      let model;
      model = this.currentModel;
      model.page.save().then((response) => {
        let parent = this.container.lookup("route:page");
        parent.refresh().then(() => {
          this.container.lookup('router:main').transitionTo('page.show', response.id);
        });
      });
    }
  }
});
