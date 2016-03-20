import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  model: function() {
    let products = this.store.query('product', {});
    return Ember.RSVP.hash({
      products: products,
      isIndex: true,
      isAuthenticated: this.get('session.isAuthenticated')
    });
  }
});
