import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var pages = this.store.query('page', {});
    return Ember.RSVP.hash({
      pages: pages
    });
  }
});
