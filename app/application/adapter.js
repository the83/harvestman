import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from 'harvestman/config/environment';

export default DS.ActiveModelAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:devise',
  host: config.backendHost,
  namespace: 'api',
  headers: function() {
    return {
      "X-XSRF-TOKEN": decodeURIComponent(Ember.get(document.cookie.match(/XSRF\-TOKEN\=([^;]*)/), "1"))
    };
  }.property().volatile()
});
