import DS from 'ember-data';
import Ember from 'ember';

export default DS.ActiveModelAdapter.extend({
  headers: function() {
    return {
      "X-XSRF-TOKEN": decodeURIComponent(Ember.get(document.cookie.match(/XSRF\-TOKEN\=([^;]*)/), "1"))
    };
  }.property().volatile()
});
