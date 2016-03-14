import Ember from 'ember';

export default Ember.Component.extend({
  selectedTab: 'description',
  showDescription: Ember.computed.equal('selectedTab', 'description'),
  showFeatures: Ember.computed.equal('selectedTab', 'features'),
  showManual: Ember.computed.equal('selectedTab', 'manual'),
  showWhereToBuy: Ember.computed.equal('selectedTab', 'whereToBuy')
});
