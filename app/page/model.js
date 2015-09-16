import DS from 'ember-data';
var attr = DS.attr;

export default DS.Model.extend({
  permalink: attr('string'),
  title: attr('string'),
  content: attr('string')
});
