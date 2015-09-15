import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var product;
    if(params.product_id) {
      product = this.store.find('product', params.product_id);
     } else {
      product = this.store.createRecord('product');
    }

    return Ember.RSVP.hash({
      product: product
    });
  },
  actions: {
    save: function() {
      var model;
      model = this.currentModel;
      model.product.save().then((response) => {
        var parent = this.container.lookup("route:product");
        parent.refresh().then(() => {
          this.container.lookup('router:main').transitionTo('product.show', response.id);
        });
      });
    }
  }
});
