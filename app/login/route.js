import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

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
        Materialize.toast(`UNAUTHORIZED`, 4000, 'error-message');
      });
    }
  }
});
