import DS from 'ember-data';
var attr = DS.attr;

export default DS.Model.extend({
  name: attr('string'),
  modelNumber: attr('string'),
  description: attr('string'),
  briefDescription: attr('string'),
  manual: attr('string'),
  images: DS.hasMany('image', { async: 'false' }),
  features: attr('string')
});
