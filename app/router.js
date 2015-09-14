import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('product', { path: '/products'}, function() {
    this.route('show', { path: ':product_id' });
  });
  this.resource('page', { path: '/pages' }, function() {
  });
});

export default Router;
