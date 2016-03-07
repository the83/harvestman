import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  post: DS.belongsTo('post'),
  type: DS.attr('string')
});
