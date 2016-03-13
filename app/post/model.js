import DS from 'ember-data';

export default DS.Model.extend({
  permalink: DS.attr('string'),
  title: DS.attr('string'),
  content: DS.attr('string'),
  images: DS.hasMany('image', { async: 'false' })
});
