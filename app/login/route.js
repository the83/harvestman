import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
const { service } = Ember.inject;

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  model() {
    return Ember.Object.create({
      identification: null,
      password: null
    });
  },
  session: Ember.inject.service(),
  actions: {
    authenticate: function() {
      let identification = this.modelFor('login').get('identification');
      let password = this.modelFor('login').get('password');

      return this.get('session').authenticate('authenticator:devise', identification, password).catch((reason) => {
        this.set('errorMessage', reason.error);
      });
    }
  }
});
