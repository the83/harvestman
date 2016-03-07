import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var post;
    if(params.post_id) {
      post = this.store.find('post', params.post_id);
     } else {
      post = this.store.createRecord('post');
    }

    return Ember.RSVP.hash({
      store: this.store,
      post: post
    });
  },
  actions: {
    save: function() {
      var model;
      model = this.currentModel;
      model.post.save().then((response) => {
        var parent = this.container.lookup("route:post");
        parent.refresh().then(() => {
          this.container.lookup('router:main').transitionTo('post.show', response.id);
        });
      });
    }
  }
});
