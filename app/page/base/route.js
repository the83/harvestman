import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var page;
    if(params.page_id) {
      page = this.store.find('page', params.page_id);
     } else {
      page = this.store.createRecord('page');
    }

    return Ember.RSVP.hash({
      page: page
    });
  },
  actions: {
    save: function() {
      var model;
      model = this.currentModel;
      model.page.save().then((response) => {
        var parent = this.container.lookup("route:page");
        parent.refresh().then(() => {
          this.container.lookup('router:main').transitionTo('page.show', response.id);
        });
      });
    }
  }
});
