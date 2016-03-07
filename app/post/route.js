import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var posts = this.store.query('post', {});
    return Ember.RSVP.hash({
      posts: posts,
      isIndex: true
    });
  }
});
