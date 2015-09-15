import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var products = this.store.query('product', {});
    return Ember.RSVP.hash({
      products: products,
      isIndex: true
    });
  }
});
