/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {});

  app.import('bower_components/rails-csrf/dist/named-amd/main.js', {
    'rails-csrf': [
      'service'
    ]
  });
  return app.toTree();
};
