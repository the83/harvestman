import Ember from 'ember';

export default Ember.Component.extend({
  selectedTab: 'description',
  showDescription: Ember.computed('selectedTab', function() {
    return this.selectedTab === 'description'
  }),
  showSpecs: Ember.computed('selectedTab', function() {
    return this.selectedTab === 'specs'
  }),
  showManual: Ember.computed('selectedTab', function() {
    return this.selectedTab === 'manual'
  }),
  showWhereToBuy: Ember.computed('selectedTab', function() {
    return this.selectedTab === 'whereToBuy'
  })
});
