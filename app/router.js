import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index');
  this.resource('product', { path: '/products'});
  this.route('product.new', { path: '/products/new'});
  this.route('product.edit', { path: '/products/:product_id/edit'});
  this.route('product.show', { path: '/products/:product_id'});

  this.route('page.show', { path: '/pages/:page_id' });
  this.route('page.edit', { path: '/pages/:page_id/edit' });
  this.resource('page', { path: '/pages'}, function() {
    this.route('new');
  });

  this.resource('home', { path: '/' }, function() {});
  this.resource('about', { path: '/pages/about' }, function() {});
  this.resource('media', { path: '/media' }, function() {});
  this.resource('news', { path: '/news' }, function() {});
  this.resource('firmware', { path: '/pages/firmware' }, function() {});
  this.resource('systems', { path: '/systems' }, function() {});
  this.route('login');
});

export default Router;
