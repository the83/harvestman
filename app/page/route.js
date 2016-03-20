import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    var pages = this.store.query('page', {});
    return Ember.RSVP.hash({
      pages: pages
    });
  }
});
