import Devise from 'ember-simple-auth/authenticators/devise';
import config from 'harvestman/config/environment';

export default Devise.extend({
  serverTokenEndpoint: `${config.backendHost}/users/sign_in`
});
