import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('product', { path: '/products'}, function() {
    this.route('new');
    this.route('edit', { path: ':product_id/edit' });
    this.route('show', { path: ':product_id' });
  });
  this.resource('home', { path: '/' }, function() {});
  this.resource('page', { path: '/pages' }, function() {});
  this.resource('about', { path: '/about' }, function() {});
  this.resource('media', { path: '/media' }, function() {});
  this.resource('news', { path: '/news' }, function() {});
  this.resource('firmware', { path: '/firmware' }, function() {});
  this.resource('systems', { path: '/systems' }, function() {});
});

export default Router;
