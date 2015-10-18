import Ember from 'ember';

export default Ember.Component.extend({
  selectedTab: 'description',
  showDescription: Ember.computed.equal('selectedTab', 'description'),
  showSpecs: Ember.computed.equal('selectedTab', 'specs'),
  showManual: Ember.computed.equal('selectedTab', 'manual'),
  showWhereToBuy: Ember.computed.equal('selectedTab', 'whereToBuy')
});
