import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('product', { path: '/products'});
  this.route('product.new', { path: '/products/new'});
  this.route('product.edit', { path: '/products/:product_id/edit'});
  this.route('product.show', { path: '/products/:product_id'});

  this.resource('page', { path: '/pages'}, function() {
    this.route('new');
    this.route('edit', { path: ':page_id/edit' });
    this.route('show', { path: ':page_id' });
  });

  this.resource('home', { path: '/' }, function() {});
  this.resource('about', { path: '/pages/about' }, function() {});
  this.resource('media', { path: '/media' }, function() {});
  this.resource('news', { path: '/news' }, function() {});
  this.resource('firmware', { path: '/pages/firmware' }, function() {});
  this.resource('systems', { path: '/systems' }, function() {});
});

export default Router;
