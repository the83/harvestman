"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('harvestman/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'harvestman/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);
  loadInitializers['default'](App, 'rails-csrf');

  exports['default'] = App;

});
define('harvestman/application/adapter', ['exports', 'ember-data', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, DS, DataAdapterMixin) {

  'use strict';

  exports['default'] = DS['default'].ActiveModelAdapter.extend(DataAdapterMixin['default'], {
    authorizer: 'authorizer:devise',
    namespace: 'api',
    headers: (function () {
      return {
        "X-XSRF-TOKEN": decodeURIComponent(Ember.get(document.cookie.match(/XSRF\-TOKEN\=([^;]*)/), "1"))
      };
    }).property().volatile()
  });

});
define('harvestman/application/route', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, Ember, ApplicationRouteMixin) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(ApplicationRouteMixin['default'], {
    beforeModel: function beforeModel() {
      this._super.apply(this, arguments);
      return this.csrf.fetchToken();
    }
  });

});
define('harvestman/authenticators/devise', ['exports', 'ember-simple-auth/authenticators/devise'], function (exports, Devise) {

  'use strict';

  exports['default'] = Devise['default'].extend({
    serverTokenEndpoint: 'http://localhost:3000/users/sign_in'
  });

});
define('harvestman/authorizers/devise', ['exports', 'ember-simple-auth/authorizers/devise'], function (exports, Devise) {

	'use strict';

	exports['default'] = Devise['default'].extend({});

});
define('harvestman/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'harvestman/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('harvestman/components/ember-modal-dialog-positioned-container', ['exports', 'ember-modal-dialog/components/positioned-container'], function (exports, Component) {

	'use strict';

	exports['default'] = Component['default'];

});
define('harvestman/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, ember_wormhole) {

	'use strict';



	exports['default'] = ember_wormhole['default'];

});
define('harvestman/components/hm-file-uploader/component', ['exports', 'ember-uploader', 'ember'], function (exports, EmberUploader, Ember) {

  'use strict';

  exports['default'] = EmberUploader['default'].FileField.extend({
    filesDidChange: function filesDidChange(files) {
      var _this = this;

      var CustomUploader = EmberUploader['default'].Uploader.extend({
        headers: {},
        _ajax: function _ajax(settings) {
          settings = Ember['default'].merge(settings, this.getProperties('headers'));
          return this._super(settings);
        }
      });

      var uploadUrl = 'api/v1/' + this.get('objectType') + '/' + this.get('objectId') + '/images';
      var uploader = CustomUploader.create({
        url: uploadUrl,
        headers: {
          "X-XSRF-TOKEN": decodeURIComponent(Ember['default'].get(document.cookie.match(/XSRF\-TOKEN\=([^;]*)/), "1"))
        },
        paramName: 'image'
      });

      if (!Ember['default'].isEmpty(files)) {
        uploader.upload(files[0]).then(function (response) {
          _this.get('model.images').pushObject(_this.get('store').createRecord('image', response.image));
        });
      }
    }
  });

});
define('harvestman/components/hm-file-uploader/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "harvestman/components/hm-file-uploader/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[1,0],[1,9]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('harvestman/components/hm-footer/component', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

});
define('harvestman/components/hm-footer/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "harvestman/components/hm-footer/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("footer");
        dom.setAttribute(el1,"class","page-footer");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container");
        var el3 = dom.createTextNode("\n    © 2015 Copyright Industrial Music Electronics\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('harvestman/components/hm-image/component', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

});
define('harvestman/components/hm-image/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "harvestman/components/hm-image/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","card");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","card-image");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("img");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1, 1]);
        var morphs = new Array(1);
        morphs[0] = dom.createAttrMorph(element0, 'src');
        return morphs;
      },
      statements: [
        ["attribute","src",["get","url",["loc",[null,[3,15],[3,18]]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('harvestman/components/hm-images/component', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

});
define('harvestman/components/hm-images/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 6,
              "column": 2
            }
          },
          "moduleName": "harvestman/components/hm-images/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col s2");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["inline","hm-image",[],["url",["subexpr","@mut",[["get","image.url",["loc",[null,[4,21],[4,30]]]]],[],[]]],["loc",[null,[4,6],[4,32]]]]
        ],
        locals: ["image"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "harvestman/components/hm-images/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("row");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        return morphs;
      },
      statements: [
        ["block","each",[["get","images",["loc",[null,[2,10],[2,16]]]]],[],0,null,["loc",[null,[2,2],[6,11]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('harvestman/components/hm-page-display/component', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

});
define('harvestman/components/hm-page-display/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 4
            },
            "end": {
              "line": 9,
              "column": 40
            }
          },
          "moduleName": "harvestman/components/hm-page-display/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Edit");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 18,
            "column": 0
          }
        },
        "moduleName": "harvestman/components/hm-page-display/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col s12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h5");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col s12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"id","page-content");
        dom.setAttribute(el2,"class","col s12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1, 1]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 1]),1,1);
        morphs[2] = dom.createUnsafeMorphAt(dom.childAt(fragment, [4, 1]),1,1);
        return morphs;
      },
      statements: [
        ["content","page.title",["loc",[null,[3,8],[3,22]]]],
        ["block","link-to",["page.edit",["get","page.id",["loc",[null,[9,27],[9,34]]]]],[],0,null,["loc",[null,[9,4],[9,52]]]],
        ["content","page.content",["loc",[null,[15,4],[15,22]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('harvestman/components/hm-page-form/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    actions: {
      save: function save() {
        this.sendAction();
      }
    }
  });

});
define('harvestman/components/hm-page-form/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 31,
            "column": 0
          }
        },
        "moduleName": "harvestman/components/hm-page-form/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        dom.setAttribute(el1,"id","page-form");
        dom.setAttribute(el1,"class","nested-form");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","input-field col s12");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"class","active");
        dom.setAttribute(el4,"for","page-permalink");
        var el5 = dom.createTextNode("Permalink");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","input-field col s12");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"class","active");
        dom.setAttribute(el4,"for","page-title");
        var el5 = dom.createTextNode("Title");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","input-field col s12");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"class","active");
        dom.setAttribute(el4,"for","page-content");
        var el5 = dom.createTextNode("Content");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","input-field col s12");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","btn");
        dom.setAttribute(el4,"type","submit");
        dom.setAttribute(el4,"id","save-button");
        var el5 = dom.createTextNode("\n        Submit\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [7, 1, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 1]),1,1);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3, 1]),1,1);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [5, 1]),1,1);
        morphs[3] = dom.createElementMorph(element1);
        return morphs;
      },
      statements: [
        ["inline","input",[],["type","text","id","page-permalink","value",["subexpr","@mut",[["get","page.permalink",["loc",[null,[4,52],[4,66]]]]],[],[]]],["loc",[null,[4,6],[4,68]]]],
        ["inline","input",[],["type","text","id","page-title","value",["subexpr","@mut",[["get","page.title",["loc",[null,[11,48],[11,58]]]]],[],[]]],["loc",[null,[11,6],[11,60]]]],
        ["inline","textarea",[],["id","page-content","class","materialize-textarea","value",["subexpr","@mut",[["get","page.content",["loc",[null,[18,70],[18,82]]]]],[],[]]],["loc",[null,[18,6],[18,84]]]],
        ["element","action",["save"],[],["loc",[null,[25,57],[25,74]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('harvestman/components/hm-product-display/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    selectedTab: 'description',
    showDescription: Ember['default'].computed.equal('selectedTab', 'description'),
    showSpecs: Ember['default'].computed.equal('selectedTab', 'specs'),
    showManual: Ember['default'].computed.equal('selectedTab', 'manual'),
    showWhereToBuy: Ember['default'].computed.equal('selectedTab', 'whereToBuy')
  });

});
define('harvestman/components/hm-product-display/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 4
            },
            "end": {
              "line": 12,
              "column": 85
            }
          },
          "moduleName": "harvestman/components/hm-product-display/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Edit");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 25,
              "column": 2
            },
            "end": {
              "line": 31,
              "column": 2
            }
          },
          "moduleName": "harvestman/components/hm-product-display/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
          morphs[2] = dom.createMorphAt(fragment,5,5,contextualElement);
          morphs[3] = dom.createMorphAt(fragment,7,7,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","md-tab",[],["value","description","title","Description"],["loc",[null,[27,4],[27,54]]]],
          ["inline","md-tab",[],["value","specs","title","Specs"],["loc",[null,[28,4],[28,42]]]],
          ["inline","md-tab",[],["value","manual","title","Manual"],["loc",[null,[29,4],[29,44]]]],
          ["inline","md-tab",[],["value","whereToBuy","title","Where to Buy"],["loc",[null,[30,4],[30,54]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 34,
              "column": 2
            },
            "end": {
              "line": 38,
              "column": 2
            }
          },
          "moduleName": "harvestman/components/hm-product-display/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"id","description");
          dom.setAttribute(el1,"class","col s12 show-newlines");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createUnsafeMorphAt(dom.childAt(fragment, [1, 1]),0,0);
          return morphs;
        },
        statements: [
          ["content","product.description",["loc",[null,[36,9],[36,34]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 39,
              "column": 2
            },
            "end": {
              "line": 42,
              "column": 2
            }
          },
          "moduleName": "harvestman/components/hm-product-display/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"id","specs");
          dom.setAttribute(el1,"class","col s12");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child4 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 43,
              "column": 2
            },
            "end": {
              "line": 47,
              "column": 2
            }
          },
          "moduleName": "harvestman/components/hm-product-display/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"id","manual");
          dom.setAttribute(el1,"class","col s12 show-newlines");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createUnsafeMorphAt(dom.childAt(fragment, [1, 1]),0,0);
          return morphs;
        },
        statements: [
          ["content","product.manual",["loc",[null,[45,9],[45,29]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child5 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 48,
              "column": 2
            },
            "end": {
              "line": 52,
              "column": 2
            }
          },
          "moduleName": "harvestman/components/hm-product-display/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"id","manual");
          dom.setAttribute(el1,"class","col s12");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createTextNode("$$$$$");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 54,
            "column": 0
          }
        },
        "moduleName": "harvestman/components/hm-product-display/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col s6 product-name");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h5");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col s6 right model-number");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h5");
        var el4 = dom.createTextNode("model ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col s12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col s12 product-image");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","center-align");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("row");
        dom.setAttribute(el1,"class","clickable");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("row");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(fragment, [8]);
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 1]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3, 1]),1,1);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [2, 1]),1,1);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [4, 1, 1]),1,1);
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [6]),1,1);
        morphs[5] = dom.createMorphAt(element1,1,1);
        morphs[6] = dom.createMorphAt(element1,2,2);
        morphs[7] = dom.createMorphAt(element1,3,3);
        morphs[8] = dom.createMorphAt(element1,4,4);
        return morphs;
      },
      statements: [
        ["content","product.name",["loc",[null,[3,8],[3,24]]]],
        ["content","product.modelNumber",["loc",[null,[6,14],[6,37]]]],
        ["block","link-to",["product.edit",["get","product.id",["loc",[null,[12,30],[12,40]]]]],["id","edit-product-btn","class","btn-flat"],0,null,["loc",[null,[12,4],[12,97]]]],
        ["inline","hm-slideshow",[],["images",["subexpr","@mut",[["get","product.images",["loc",[null,[19,28],[19,42]]]]],[],[]]],["loc",[null,[19,6],[19,44]]]],
        ["block","md-tabs",[],["selected",["subexpr","@mut",[["get","selectedTab",["loc",[null,[26,13],[26,24]]]]],[],[]]],1,null,["loc",[null,[25,2],[31,14]]]],
        ["block","if",[["get","showDescription",["loc",[null,[34,8],[34,23]]]]],[],2,null,["loc",[null,[34,2],[38,9]]]],
        ["block","if",[["get","showSpecs",["loc",[null,[39,8],[39,17]]]]],[],3,null,["loc",[null,[39,2],[42,9]]]],
        ["block","if",[["get","showManual",["loc",[null,[43,8],[43,18]]]]],[],4,null,["loc",[null,[43,2],[47,9]]]],
        ["block","if",[["get","showWhereToBuy",["loc",[null,[48,8],[48,22]]]]],[],5,null,["loc",[null,[48,2],[52,9]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5]
    };
  }()));

});
define('harvestman/components/hm-product-form/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    actions: {
      save: function save() {
        this.sendAction();
      }
    }
  });

});
define('harvestman/components/hm-product-form/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 51,
            "column": 0
          }
        },
        "moduleName": "harvestman/components/hm-product-form/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        dom.setAttribute(el1,"id","product-form");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col s12");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","input-field col s6");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"class","active");
        dom.setAttribute(el4,"for","product-name");
        var el5 = dom.createTextNode("Product Name");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","input-field col s6");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"class","active");
        dom.setAttribute(el4,"for","product-model-number");
        var el5 = dom.createTextNode("Model Number");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","input-field col s12");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"class","active");
        dom.setAttribute(el4,"for","product-brief-description");
        var el5 = dom.createTextNode("Brief Description");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","input-field col s12");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"class","active");
        dom.setAttribute(el4,"for","product-description");
        var el5 = dom.createTextNode("Description");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","input-field col s12");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"class","active");
        dom.setAttribute(el4,"for","product-manual");
        var el5 = dom.createTextNode("Manual");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","input-field col s12");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","btn");
        dom.setAttribute(el4,"type","submit");
        dom.setAttribute(el4,"id","save-button");
        var el5 = dom.createTextNode("\n        Submit\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [5]);
        var element2 = dom.childAt(element0, [13, 1, 1]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(element0,1,1);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3, 1]),1,1);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [1]),1,1);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [3]),1,1);
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [7, 1]),1,1);
        morphs[5] = dom.createMorphAt(dom.childAt(element0, [9, 1]),1,1);
        morphs[6] = dom.createMorphAt(dom.childAt(element0, [11, 1]),1,1);
        morphs[7] = dom.createElementMorph(element2);
        return morphs;
      },
      statements: [
        ["inline","hm-images",[],["images",["subexpr","@mut",[["get","product.images",["loc",[null,[2,21],[2,35]]]]],[],[]]],["loc",[null,[2,2],[2,37]]]],
        ["inline","hm-file-uploader",[],["store",["subexpr","@mut",[["get","store",["loc",[null,[6,31],[6,36]]]]],[],[]],"model",["subexpr","@mut",[["get","product",["loc",[null,[6,43],[6,50]]]]],[],[]],"objectId",["subexpr","@mut",[["get","product.id",["loc",[null,[6,60],[6,70]]]]],[],[]],"objectType","products"],["loc",[null,[6,6],[6,94]]]],
        ["inline","input",[],["type","text","id","product-name","value",["subexpr","@mut",[["get","product.name",["loc",[null,[12,50],[12,62]]]]],[],[]]],["loc",[null,[12,6],[12,64]]]],
        ["inline","input",[],["type","text","id","product-model-number","value",["subexpr","@mut",[["get","product.modelNumber",["loc",[null,[17,58],[17,77]]]]],[],[]]],["loc",[null,[17,6],[17,79]]]],
        ["inline","input",[],["type","text","id","product-brief-description","value",["subexpr","@mut",[["get","product.briefDescription",["loc",[null,[24,63],[24,87]]]]],[],[]]],["loc",[null,[24,6],[24,89]]]],
        ["inline","textarea",[],["id","product-description","class","materialize-textarea","value",["subexpr","@mut",[["get","product.description",["loc",[null,[31,77],[31,96]]]]],[],[]]],["loc",[null,[31,6],[31,98]]]],
        ["inline","textarea",[],["id","product-manual","class","materialize-textarea","value",["subexpr","@mut",[["get","product.manual",["loc",[null,[38,72],[38,86]]]]],[],[]]],["loc",[null,[38,6],[38,88]]]],
        ["element","action",["save"],[],["loc",[null,[45,57],[45,74]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('harvestman/components/hm-product-tile/component', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

});
define('harvestman/components/hm-product-tile/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 10,
              "column": 2
            }
          },
          "moduleName": "harvestman/components/hm-product-tile/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","card-image");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("img");
          dom.setAttribute(el2,"class","responsive-img");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","card-content");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","title");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1]);
          var element1 = dom.childAt(fragment, [3]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'src');
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
          morphs[2] = dom.createMorphAt(dom.childAt(element1, [3]),0,0);
          return morphs;
        },
        statements: [
          ["attribute","src",["get","product.images.firstObject.url",["loc",[null,[4,40],[4,70]]]]],
          ["content","product.name",["loc",[null,[7,25],[7,41]]]],
          ["content","product.briefDescription",["loc",[null,[8,9],[8,37]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 0
          }
        },
        "moduleName": "harvestman/components/hm-product-tile/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","card clickable product-tile");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        return morphs;
      },
      statements: [
        ["block","link-to",["product.show",["get","product.id",["loc",[null,[2,28],[2,38]]]]],[],0,null,["loc",[null,[2,2],[10,14]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('harvestman/components/hm-product-tiles/component', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

});
define('harvestman/components/hm-product-tiles/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 2
            },
            "end": {
              "line": 12,
              "column": 2
            }
          },
          "moduleName": "harvestman/components/hm-product-tiles/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","col s3");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["inline","hm-product-tile",[],["product",["subexpr","@mut",[["get","product",["loc",[null,[10,32],[10,39]]]]],[],[]]],["loc",[null,[10,6],[10,41]]]]
        ],
        locals: ["product"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "harvestman/components/hm-product-tiles/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col s12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h5");
        var el4 = dom.createTextNode("Products");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("row");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        return morphs;
      },
      statements: [
        ["block","each",[["get","products",["loc",[null,[8,10],[8,18]]]]],[],0,null,["loc",[null,[8,2],[12,11]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('harvestman/components/hm-slideshow/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    uiSetup: (function () {
      this._initSlider();
    }).on('didRender'),

    _initSlider: function _initSlider() {
      var slider = Ember['default'].$('.slider');
      if (slider.find('img').attr('src').match(/data/)) {
        return;
      }

      // for some reason reinitializing the slider doesn't GC the indicators
      Ember['default'].$('.indicators').remove();
      slider.slider({
        height: 300,
        indicators: false
      });
    }
  });

});
define('harvestman/components/hm-slideshow/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 4
            },
            "end": {
              "line": 7,
              "column": 4
            }
          },
          "moduleName": "harvestman/components/hm-slideshow/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("img");
          dom.setAttribute(el2,"class","responsive-img");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'src');
          return morphs;
        },
        statements: [
          ["attribute","src",["get","image.url",["loc",[null,[5,42],[5,51]]]]]
        ],
        locals: ["image"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "harvestman/components/hm-slideshow/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","slider");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","slides");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1]),1,1);
        return morphs;
      },
      statements: [
        ["block","each",[["get","images",["loc",[null,[3,12],[3,18]]]]],[],0,null,["loc",[null,[3,4],[7,13]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('harvestman/components/labeled-radio-button', ['exports', 'ember-radio-button/components/labeled-radio-button'], function (exports, LabeledRadioButton) {

	'use strict';

	exports['default'] = LabeledRadioButton['default'];

});
define('harvestman/components/materialize-badge', ['exports', 'ember', 'harvestman/components/md-badge'], function (exports, Ember, MaterializeBadge) {

  'use strict';

  exports['default'] = MaterializeBadge['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-badge}} has been deprecated. Please use {{md-badge}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-button-submit', ['exports', 'ember', 'harvestman/components/md-btn-submit'], function (exports, Ember, MaterializeButtonSubmit) {

  'use strict';

  exports['default'] = MaterializeButtonSubmit['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-button-submit}} has been deprecated. Please use {{md-btn-submit}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-button', ['exports', 'ember', 'harvestman/components/md-btn'], function (exports, Ember, MaterializeButton) {

  'use strict';

  exports['default'] = MaterializeButton['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-button}} has been deprecated. Please use {{md-btn}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-card-action', ['exports', 'ember', 'harvestman/components/md-card-action'], function (exports, Ember, MaterializeCardAction) {

  'use strict';

  exports['default'] = MaterializeCardAction['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-card-action}} has been deprecated. Please use {{md-card-action}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-card-content', ['exports', 'ember', 'harvestman/components/md-card-content'], function (exports, Ember, MaterializeCardContent) {

  'use strict';

  exports['default'] = MaterializeCardContent['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-card-content}} has been deprecated. Please use {{md-card-content}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-card-panel', ['exports', 'ember', 'harvestman/components/md-card-panel'], function (exports, Ember, MaterializeCardPanel) {

  'use strict';

  exports['default'] = MaterializeCardPanel['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-card-panel}} has been deprecated. Please use {{md-card-panel}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-card-reveal', ['exports', 'ember', 'harvestman/components/md-card-reveal'], function (exports, Ember, MaterializeCardReveal) {

  'use strict';

  exports['default'] = MaterializeCardReveal['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-card-reveal}} has been deprecated. Please use {{md-card-reveal}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-card', ['exports', 'ember', 'harvestman/components/md-card'], function (exports, Ember, MaterializeCard) {

  'use strict';

  exports['default'] = MaterializeCard['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-card}} has been deprecated. Please use {{md-card}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-checkbox', ['exports', 'ember', 'harvestman/components/md-check'], function (exports, Ember, materializeCheckbox) {

  'use strict';

  exports['default'] = materializeCheckbox['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-checkbox}} has been deprecated. Please use {{md-check}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-checkboxes', ['exports', 'ember', 'harvestman/components/md-checks'], function (exports, Ember, materializeCheckboxes) {

  'use strict';

  exports['default'] = materializeCheckboxes['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-checkboxes}} has been deprecated. Please use {{md-checks}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-collapsible-card', ['exports', 'ember', 'harvestman/components/md-card-collapsible'], function (exports, Ember, MaterializeCollapsibleCard) {

  'use strict';

  exports['default'] = MaterializeCollapsibleCard['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-collapsible-card}} has been deprecated. Please use {{md-card-collapsible}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-collapsible', ['exports', 'ember', 'harvestman/components/md-collapsible'], function (exports, Ember, MaterializeCollapsible) {

  'use strict';

  exports['default'] = MaterializeCollapsible['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-collapsible}} has been deprecated. Please use {{md-collapsible}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-copyright', ['exports', 'ember', 'harvestman/components/md-copyright'], function (exports, Ember, materializeCopyright) {

  'use strict';

  exports['default'] = materializeCopyright['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-copyright}} has been deprecated. Please use {{md-copyright}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-date-input', ['exports', 'ember', 'harvestman/components/md-input-date'], function (exports, Ember, materializeDateInput) {

  'use strict';

  exports['default'] = materializeDateInput['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-date-input}} has been deprecated. Please use {{md-input-date}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-input-field', ['exports', 'ember', 'harvestman/components/md-input-field'], function (exports, Ember, materializeInputField) {

  'use strict';

  exports['default'] = materializeInputField['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-input-field}} has been deprecated. Please use {{md-input-field}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-input', ['exports', 'ember', 'harvestman/components/md-input'], function (exports, Ember, materializeInput) {

  'use strict';

  exports['default'] = materializeInput['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-input}} has been deprecated. Please use {{md-input}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-loader', ['exports', 'ember', 'harvestman/components/md-loader'], function (exports, Ember, materializeLoader) {

  'use strict';

  exports['default'] = materializeLoader['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-loader}} has been deprecated. Please use {{md-loader}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-modal', ['exports', 'ember', 'harvestman/components/md-modal'], function (exports, Ember, MaterializeModal) {

  'use strict';

  exports['default'] = MaterializeModal['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-modal}} has been deprecated. Please use {{md-modal}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-navbar', ['exports', 'ember', 'harvestman/components/md-navbar'], function (exports, Ember, MaterializeNavBar) {

  'use strict';

  exports['default'] = MaterializeNavBar['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-navbar}} has been deprecated. Please use {{md-navbar}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-pagination', ['exports', 'ember', 'harvestman/components/md-pagination'], function (exports, Ember, materializePagination) {

  'use strict';

  exports['default'] = materializePagination['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-pagination}} has been deprecated. Please use {{md-pagination}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-parallax', ['exports', 'ember', 'harvestman/components/md-parallax'], function (exports, Ember, materializeParallax) {

  'use strict';

  exports['default'] = materializeParallax['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-parallax}} has been deprecated. Please use {{md-parallax}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-radio', ['exports', 'ember', 'harvestman/components/md-radio'], function (exports, Ember, materializeRadio) {

  'use strict';

  exports['default'] = materializeRadio['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-radio}} has been deprecated. Please use {{md-radio}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-radios', ['exports', 'ember', 'harvestman/components/md-radios'], function (exports, Ember, materializeRadios) {

  'use strict';

  exports['default'] = materializeRadios['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-radios}} has been deprecated. Please use {{md-radios}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-range', ['exports', 'ember', 'harvestman/components/md-range'], function (exports, Ember, materializeRange) {

  'use strict';

  exports['default'] = materializeRange['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-range}} has been deprecated. Please use {{md-range}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-select', ['exports', 'ember', 'harvestman/components/md-select'], function (exports, Ember, materializeSelect) {

  'use strict';

  exports['default'] = materializeSelect['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-select}} has been deprecated. Please use {{md-select}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-switch', ['exports', 'ember', 'harvestman/components/md-switch'], function (exports, Ember, materializeSwitch) {

  'use strict';

  exports['default'] = materializeSwitch['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-switch}} has been deprecated. Please use {{md-switch}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-switches', ['exports', 'ember', 'harvestman/components/md-switches'], function (exports, Ember, materializeSwitches) {

  'use strict';

  exports['default'] = materializeSwitches['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-switches}} has been deprecated. Please use {{md-switches}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-tabs-tab', ['exports', 'ember', 'harvestman/components/md-tab'], function (exports, Ember, materializeTabsTab) {

  'use strict';

  exports['default'] = materializeTabsTab['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-tabs-tab}} has been deprecated. Please use {{md-tab}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-tabs', ['exports', 'ember', 'harvestman/components/md-tabs'], function (exports, Ember, materializeTabs) {

  'use strict';

  exports['default'] = materializeTabs['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-tabs}} has been deprecated. Please use {{md-tabs}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/materialize-textarea', ['exports', 'ember', 'harvestman/components/md-textarea'], function (exports, Ember, materializeTextarea) {

  'use strict';

  exports['default'] = materializeTextarea['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      Ember['default'].deprecate("{{materialize-textarea}} has been deprecated. Please use {{md-textarea}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });

});
define('harvestman/components/md-badge', ['exports', 'ember-cli-materialize/components/md-badge'], function (exports, materializeBadge) {

	'use strict';

	exports['default'] = materializeBadge['default'];

});
define('harvestman/components/md-btn-dropdown', ['exports', 'ember-cli-materialize/components/md-btn-dropdown'], function (exports, MaterializeButtonDropdown) {

	'use strict';

	exports['default'] = MaterializeButtonDropdown['default'];

});
define('harvestman/components/md-btn-submit', ['exports', 'ember-cli-materialize/components/md-btn-submit'], function (exports, MaterializeButtonSubmit) {

	'use strict';

	exports['default'] = MaterializeButtonSubmit['default'];

});
define('harvestman/components/md-btn', ['exports', 'ember-cli-materialize/components/md-btn'], function (exports, MaterializeButton) {

	'use strict';

	exports['default'] = MaterializeButton['default'];

});
define('harvestman/components/md-card-action', ['exports', 'ember-cli-materialize/components/md-card-action'], function (exports, MaterializeCardAction) {

	'use strict';

	exports['default'] = MaterializeCardAction['default'];

});
define('harvestman/components/md-card-collapsible', ['exports', 'ember-cli-materialize/components/md-card-collapsible'], function (exports, MaterializeCollapsibleCard) {

	'use strict';

	exports['default'] = MaterializeCollapsibleCard['default'];

});
define('harvestman/components/md-card-content', ['exports', 'ember-cli-materialize/components/md-card-content'], function (exports, MaterializeCardContent) {

	'use strict';

	exports['default'] = MaterializeCardContent['default'];

});
define('harvestman/components/md-card-panel', ['exports', 'ember-cli-materialize/components/md-card-panel'], function (exports, MaterializeCardPanel) {

	'use strict';

	exports['default'] = MaterializeCardPanel['default'];

});
define('harvestman/components/md-card-reveal', ['exports', 'ember-cli-materialize/components/md-card-reveal'], function (exports, MaterializeCardReveal) {

	'use strict';

	exports['default'] = MaterializeCardReveal['default'];

});
define('harvestman/components/md-card', ['exports', 'ember-cli-materialize/components/md-card'], function (exports, MaterializeCard) {

	'use strict';

	exports['default'] = MaterializeCard['default'];

});
define('harvestman/components/md-check', ['exports', 'ember-cli-materialize/components/md-check'], function (exports, materializeCheckbox) {

	'use strict';

	exports['default'] = materializeCheckbox['default'];

});
define('harvestman/components/md-checks-check', ['exports', 'ember-cli-materialize/components/md-checks-check'], function (exports, md_checks_check) {

	'use strict';



	exports['default'] = md_checks_check['default'];

});
define('harvestman/components/md-checks', ['exports', 'ember-cli-materialize/components/md-checks'], function (exports, materializeCheckboxes) {

	'use strict';

	exports['default'] = materializeCheckboxes['default'];

});
define('harvestman/components/md-collapsible', ['exports', 'ember-cli-materialize/components/md-collapsible'], function (exports, MaterializeCollapsible) {

	'use strict';

	exports['default'] = MaterializeCollapsible['default'];

});
define('harvestman/components/md-collection', ['exports', 'ember-cli-materialize/components/md-collection'], function (exports, md_collection) {

	'use strict';



	exports['default'] = md_collection['default'];

});
define('harvestman/components/md-copyright', ['exports', 'ember-cli-materialize/components/md-copyright'], function (exports, materializeCopyright) {

	'use strict';

	exports['default'] = materializeCopyright['default'];

});
define('harvestman/components/md-fixed-btn', ['exports', 'ember-cli-materialize/components/md-fixed-btn'], function (exports, md_fixed_btn) {

	'use strict';



	exports['default'] = md_fixed_btn['default'];

});
define('harvestman/components/md-fixed-btns', ['exports', 'ember-cli-materialize/components/md-fixed-btns'], function (exports, md_fixed_btns) {

	'use strict';



	exports['default'] = md_fixed_btns['default'];

});
define('harvestman/components/md-input-date', ['exports', 'ember-cli-materialize/components/md-input-date'], function (exports, materializeDateInput) {

	'use strict';

	exports['default'] = materializeDateInput['default'];

});
define('harvestman/components/md-input-field', ['exports', 'ember-cli-materialize/components/md-input-field'], function (exports, materializeInputField) {

	'use strict';

	exports['default'] = materializeInputField['default'];

});
define('harvestman/components/md-input', ['exports', 'ember-cli-materialize/components/md-input'], function (exports, materializeInput) {

	'use strict';

	exports['default'] = materializeInput['default'];

});
define('harvestman/components/md-loader', ['exports', 'ember-cli-materialize/components/md-loader'], function (exports, materializeLoader) {

	'use strict';

	exports['default'] = materializeLoader['default'];

});
define('harvestman/components/md-modal-container', ['exports', 'ember-cli-materialize/components/md-modal-container'], function (exports, mdModalContainer) {

	'use strict';

	exports['default'] = mdModalContainer['default'];

});
define('harvestman/components/md-modal', ['exports', 'ember-cli-materialize/components/md-modal'], function (exports, materializeModal) {

	'use strict';

	exports['default'] = materializeModal['default'];

});
define('harvestman/components/md-navbar', ['exports', 'ember-cli-materialize/components/md-navbar'], function (exports, MaterializeNavBar) {

	'use strict';

	exports['default'] = MaterializeNavBar['default'];

});
define('harvestman/components/md-pagination', ['exports', 'ember-cli-materialize/components/md-pagination'], function (exports, materializePagination) {

	'use strict';

	exports['default'] = materializePagination['default'];

});
define('harvestman/components/md-parallax', ['exports', 'ember-cli-materialize/components/md-parallax'], function (exports, materializeParallax) {

	'use strict';

	exports['default'] = materializeParallax['default'];

});
define('harvestman/components/md-radio', ['exports', 'ember-cli-materialize/components/md-radio'], function (exports, materializeRadio) {

	'use strict';

	exports['default'] = materializeRadio['default'];

});
define('harvestman/components/md-radios-radio', ['exports', 'ember-cli-materialize/components/md-radios-radio'], function (exports, md_radios_radio) {

	'use strict';



	exports['default'] = md_radios_radio['default'];

});
define('harvestman/components/md-radios', ['exports', 'ember-cli-materialize/components/md-radios'], function (exports, materializeRadios) {

	'use strict';

	exports['default'] = materializeRadios['default'];

});
define('harvestman/components/md-range', ['exports', 'ember-cli-materialize/components/md-range'], function (exports, materializeRange) {

	'use strict';

	exports['default'] = materializeRange['default'];

});
define('harvestman/components/md-select', ['exports', 'ember-cli-materialize/components/md-select'], function (exports, materializeSelect) {

	'use strict';

	exports['default'] = materializeSelect['default'];

});
define('harvestman/components/md-switch', ['exports', 'ember-cli-materialize/components/md-switch'], function (exports, materializeSwitch) {

	'use strict';

	exports['default'] = materializeSwitch['default'];

});
define('harvestman/components/md-switches-switch', ['exports', 'ember-cli-materialize/components/md-switches-switch'], function (exports, md_switches_switch) {

	'use strict';



	exports['default'] = md_switches_switch['default'];

});
define('harvestman/components/md-switches', ['exports', 'ember-cli-materialize/components/md-switches'], function (exports, materializeSwitches) {

	'use strict';

	exports['default'] = materializeSwitches['default'];

});
define('harvestman/components/md-tab', ['exports', 'ember-cli-materialize/components/md-tab'], function (exports, materializeTabsTab) {

	'use strict';

	exports['default'] = materializeTabsTab['default'];

});
define('harvestman/components/md-table-col', ['exports', 'ember-cli-materialize/components/md-table-col'], function (exports, md_table_col) {

	'use strict';



	exports['default'] = md_table_col['default'];

});
define('harvestman/components/md-table', ['exports', 'ember-cli-materialize/components/md-table'], function (exports, md_table) {

	'use strict';



	exports['default'] = md_table['default'];

});
define('harvestman/components/md-tabs', ['exports', 'ember-cli-materialize/components/md-tabs'], function (exports, materializeTabs) {

	'use strict';

	exports['default'] = materializeTabs['default'];

});
define('harvestman/components/md-textarea', ['exports', 'ember-cli-materialize/components/md-textarea'], function (exports, materializeTextarea) {

	'use strict';

	exports['default'] = materializeTextarea['default'];

});
define('harvestman/components/modal-dialog', ['exports', 'ember-modal-dialog/components/modal-dialog'], function (exports, Component) {

	'use strict';

	exports['default'] = Component['default'];

});
define('harvestman/components/photo-swipe', ['exports', 'ember-cli-photoswipe/components/photo-swipe'], function (exports, PhotoSwipe) {

	'use strict';

	exports['default'] = PhotoSwipe['default'];

});
define('harvestman/components/radio-button-input', ['exports', 'ember-radio-button/components/radio-button-input'], function (exports, RadioButtonInput) {

	'use strict';

	exports['default'] = RadioButtonInput['default'];

});
define('harvestman/components/radio-button', ['exports', 'ember-radio-button/components/radio-button'], function (exports, RadioButton) {

	'use strict';

	exports['default'] = RadioButton['default'];

});
define('harvestman/controllers/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    session: Ember['default'].inject.service('session'),
    actions: {
      invalidateSession: function invalidateSession() {
        this.get('session').invalidate();
      }
    }
  });

});
define('harvestman/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('harvestman/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('harvestman/image/model', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    url: DS['default'].attr('string'),
    product: DS['default'].belongsTo('product'),
    type: DS['default'].attr('string')
  });

});
define('harvestman/initializers/add-modals-container', ['exports', 'ember-modal-dialog/initializers/add-modals-container'], function (exports, initialize) {

  'use strict';

  exports['default'] = {
    name: 'add-modals-container',
    initialize: initialize['default']
  };

});
define('harvestman/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'harvestman/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('harvestman/initializers/ember-simple-auth', ['exports', 'ember', 'harvestman/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, Ember, ENV, Configuration, setupSession, setupSessionService) {

  'use strict';

  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry) {
      var config = ENV['default']['ember-simple-auth'] || {};
      config.baseURL = ENV['default'].baseURL;
      Configuration['default'].load(config);

      setupSession['default'](registry);
      setupSessionService['default'](registry);
    }
  };

});
define('harvestman/initializers/export-application-global', ['exports', 'ember', 'harvestman/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('harvestman/initializers/key-responder', ['exports', 'ember', 'harvestman/instance-initializers/key-responder'], function (exports, Ember, keyResponderInstanceInitializer) {

  'use strict';

  var EMBER_VERSION_REGEX = /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:(?:\-(alpha|beta)\.([0-9]+)(?:\.([0-9]+))?)?)?(?:\+(canary))?(?:\.([0-9abcdef]+))?(?:\-([A-Za-z0-9\.\-]+))?(?:\+([A-Za-z0-9\.\-]+))?$/;

  /**
   * VERSION_INFO[i] is as follows:
   *
   * 0  complete version string
   * 1  major version
   * 2  minor version
   * 3  trivial version
   * 4  pre-release type (optional: "alpha" or "beta" or undefined for stable releases)
   * 5  pre-release version (optional)
   * 6  pre-release sub-version (optional)
   * 7  canary (optional: "canary", or undefined for stable releases)
   * 8  SHA (optional)
   */
  var VERSION_INFO = EMBER_VERSION_REGEX.exec(Ember['default'].VERSION);

  exports['default'] = {
    name: 'ember-key-responder',

    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      var registry = !!arguments[1] ? arguments[0] : application.registry;

      var isPre111 = parseInt(VERSION_INFO[1], 10) < 2 && parseInt(VERSION_INFO[2], 10) < 12;
      var container = application.__container__;

      application.inject('view', 'keyResponder', 'key-responder:main');
      application.inject('component', 'keyResponder', 'key-responder:main');

      //TextField/TextArea are currently uninjectable, so we're going to hack our
      //way in
      Ember['default'].TextSupport.reopen({
        keyResponder: Ember['default'].computed(function () {
          return this.registry.lookup('key-responder:main');
        }).readOnly()
      });

      // Set up a handler on the document for keyboard events that are not
      // handled by Ember's event dispatcher.
      Ember['default'].$(document).on('keyup.outside_ember_event_delegation', null, function (event) {

        if (Ember['default'].$(event.target).closest('.ember-view').length === 0) {
          var keyResponder = container.lookup('key-responder:main');
          var currentKeyResponder = keyResponder.get('current');
          if (currentKeyResponder && currentKeyResponder.get('isVisible')) {
            return currentKeyResponder.respondToKeyEvent(event, currentKeyResponder);
          }
        }

        return true;
      });

      if (isPre111) {
        // For versions before 1.12.0, we have to call the instanceInitializer
        keyResponderInstanceInitializer['default'].initialize(registry, application);
      }
    }
  };

});
define('harvestman/initializers/md-settings', ['exports', 'harvestman/config/environment', 'ember-cli-materialize/services/md-settings'], function (exports, config, MaterializeSettings) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var materializeDefaults = config['default'].materializeDefaults;

    application.register('config:materialize', materializeDefaults, { instantiate: false });
    application.register('service:materialize-settings', MaterializeSettings['default']);
    application.inject('service:materialize-settings', 'materializeDefaults', 'config:materialize');
  }

  exports['default'] = {
    name: 'md-settings',
    initialize: initialize
  };

});
define('harvestman/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, setupSessionRestoration) {

  'use strict';

  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(instance) {
      setupSessionRestoration['default'](instance);
    }
  };

});
define('harvestman/instance-initializers/key-responder', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var Mixin = Ember['default'].Mixin;
  var on = Ember['default'].on;

  var ApplicationViewMixin = Mixin.create({
    delegateToKeyResponder: on('keyUp', function (event) {
      var currentKeyResponder = this.get('keyResponder.current');
      if (currentKeyResponder && currentKeyResponder.get('isVisible')) {
        // check to see if the event target is the keyResponder or the
        // keyResponders parents.  if so, no need to dispatch as it has
        // already had a chance to handle this event.
        var id = '#' + currentKeyResponder.get('elementId');
        if (Ember['default'].$(event.target).closest(id).length === 1) {
          return true;
        }
        return currentKeyResponder.respondToKeyEvent(event, currentKeyResponder);
      }
      return true;
    })
  });

  exports['default'] = {
    name: 'ember-key-responder-instance',

    initialize: function initialize() {
      // Handle 1.12.x case, where signature is
      //  initialize(instance) {...}
      var instance = arguments[1] || arguments[0];
      var container = !!arguments[1] ? arguments[0] : instance.container;

      // Set up a handler on the ApplicationView for keyboard events that were
      // not handled by the current KeyResponder yet
      var ApplicationView = container.lookupFactory ? container.lookupFactory('view:application') : instance.resolveRegistration('view:application');

      ApplicationView = ApplicationView.extend(ApplicationViewMixin);
    }
  };

});
define('harvestman/key-responder', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var get = Ember['default'].get;

  /*
    Holds a stack of key responder views. With this we can neatly handle
    restoring the previous key responder when some modal UI element is closed.
    There are a few simple rules that governs the usage of the stack:
     - mouse click does .replace (this should also be used for programmatically taking focus when not a modal element)
     - opening a modal UI element does .push
     - closing a modal element does .pop

    Also noteworthy is that a view will be signaled that it loses the key focus
    only when it's popped off the stack, not when something is pushed on top. The
    idea is that when a modal UI element is opened, we know that the previously
    focused view will re-gain the focus as soon as the modal element is closed.
    So if the previously focused view was e.g. in the middle of some edit
    operation, it shouldn't cancel that operation.
  */
  var KeyResponder = Ember['default'].ArrayProxy.extend({
    init: function init() {
      this.set('isActive', true);
      this.set('content', Ember['default'].A());
      this._super.apply(this, arguments);
    },

    current: Ember['default'].computed.readOnly('lastObject'),
    pushView: function pushView(view, wasTriggeredByFocus) {
      if (!Ember['default'].isNone(view)) {
        view.trigger('willBecomeKeyResponder', wasTriggeredByFocus);
        this.pushObject(view);
        view.trigger('didBecomeKeyResponder', wasTriggeredByFocus);
      }
      return view;
    },

    resume: function resume() {
      this.set('isActive', true);
    },

    pause: function pause() {
      this.set('isActive', false);
    },

    popView: function popView(wasTriggeredByFocus) {
      if (get(this, 'length') > 0) {
        var view = get(this, 'current');
        if (view) {
          view.trigger('willLoseKeyResponder', wasTriggeredByFocus);
        }
        view = this.popObject();
        if (view) {
          view.trigger('didLoseKeyResponder', wasTriggeredByFocus);
        }
        return view;
      } else {
        return undefined;
      }
    },

    replaceView: function replaceView(view, wasTriggeredByFocus) {
      if (get(this, 'current') !== view) {
        this.popView(wasTriggeredByFocus);
        return this.pushView(view, wasTriggeredByFocus);
      }
    }
  });

  exports['default'] = KeyResponder;

  var KEY_EVENTS = {
    8: 'deleteBackward',
    9: 'insertTab',
    13: 'insertNewline',
    27: 'cancel',
    32: 'insertSpace',
    37: 'moveLeft',
    38: 'moveUp',
    39: 'moveRight',
    40: 'moveDown',
    46: 'deleteForward'
  };

  var MODIFIED_KEY_EVENTS = {
    8: 'deleteForward',
    9: 'insertBacktab',
    37: 'moveLeftAndModifySelection',
    38: 'moveUpAndModifySelection',
    39: 'moveRightAndModifySelection',
    40: 'moveDownAndModifySelection'
  };

  var KeyResponderSupportViewMixin = Ember['default'].Mixin.create({
    // Set to true in your view if you want to accept key responder status (which
    // is needed for handling key events)
    acceptsKeyResponder: false,
    canBecomeKeyResponder: Ember['default'].computed('acceptsKeyResponder', 'disabled', 'isVisible', function () {
      return get(this, 'acceptsKeyResponder') && !get(this, 'disabled') && get(this, 'isVisible');
    }).readOnly(),

    becomeKeyResponderViaMouseDown: Ember['default'].on('mouseDown', function (evt) {
      var responder = this.get('keyResponder');
      if (responder === undefined) {
        return;
      }

      Ember['default'].run.later(function () {
        responder._inEventBubblingPhase = undefined;
      }, 0);

      if (responder._inEventBubblingPhase === undefined) {
        responder._inEventBubblingPhase = true;
        this.becomeKeyResponder(false);
      }
    }),

    /*
      Sets this view as the target of key events. Call this if you need to make
      this happen programmatically.  This gets also called on mouseDown if the
      view handles that, returns true and doesn't have property
      'acceptsKeyResponder'
      set to false. If mouseDown returned true but 'acceptsKeyResponder' is
      false, this call is propagated to the parent view.
       If called with no parameters or with replace = true, the current key
      responder is first popped off the stack and this view is then pushed. See
      comments for Ember.KeyResponderStack above for more insight.
    */
    becomeKeyResponder: function becomeKeyResponder(replace, wasTriggeredByFocus) {
      if (wasTriggeredByFocus === undefined) {
        wasTriggeredByFocus = false;
      }

      var keyResponder = get(this, 'keyResponder');

      if (!keyResponder) {
        return;
      }

      if (get(keyResponder, 'current') === this) {
        return;
      }

      if (get(this, 'canBecomeKeyResponder')) {
        if (replace === undefined || replace === true) {
          return keyResponder.replaceView(this, wasTriggeredByFocus);
        } else {
          return keyResponder.pushView(this, wasTriggeredByFocus);
        }
      } else {
        var parent = get(this, 'parentView');

        if (parent && parent.becomeKeyResponder) {
          return parent.becomeKeyResponder(replace, wasTriggeredByFocus);
        }
      }
    },

    becomeKeyResponderViaFocus: function becomeKeyResponderViaFocus() {
      return this.becomeKeyResponder(true, true);
    },

    /*
      Resign key responder status by popping the head off the stack. The head
      might or might not be this view, depending on whether user clicked anything
      since this view became the key responder. The new key responder
      will be the next view in the stack, if any.
    */
    resignKeyResponder: function resignKeyResponder(wasTriggeredByFocus) {
      if (wasTriggeredByFocus === undefined) {
        wasTriggeredByFocus = false;
      }

      var keyResponder = get(this, 'keyResponder');

      if (!keyResponder) {
        return;
      }

      keyResponder.popView(wasTriggeredByFocus);
    },

    resignKeyResponderViaFocus: function resignKeyResponderViaFocus() {
      return this.resignKeyResponder(true);
    },

    respondToKeyEvent: function respondToKeyEvent(event) {
      Ember['default'].run(this, function () {
        if (get(this, 'keyResponder.isActive')) {
          if (get(this, 'keyResponder.current.canBecomeKeyResponder')) {
            get(this, 'keyResponder.current').interpretKeyEvents(event);
          }
        }
      });
    },

    interpretKeyEvents: function interpretKeyEvents(event) {
      var mapping = event.shiftKey ? MODIFIED_KEY_EVENTS : KEY_EVENTS;
      var eventName = mapping[event.keyCode];

      if (eventName && this.has(eventName)) {
        return this.trigger(eventName, event);
      }

      return false;
    }
  });

  Ember['default'].View.reopen(KeyResponderSupportViewMixin);
  Ember['default'].Component.reopen(KeyResponderSupportViewMixin);

  var KeyResponderInputSupport = Ember['default'].Mixin.create({
    acceptsKeyResponder: true,
    init: function init() {
      this._super.apply(this, arguments);
      this.on('focusIn', this, this.becomeKeyResponderViaFocus);
      this.on('focusOut', this, this.resignKeyResponderViaBlur);
    },

    didBecomeKeyResponder: function didBecomeKeyResponder(wasTriggeredByFocus) {
      if (!wasTriggeredByFocus && this._state === 'inDOM') {
        this.$().focus();
      }
    },

    didLoseKeyResponder: function didLoseKeyResponder(wasTriggeredByFocus) {
      if (!wasTriggeredByFocus && this._state === 'inDOM') {
        this.$().blur();
      }
    }
  });

  Ember['default'].TextSupport.reopen(KeyResponderInputSupport);
  Ember['default'].Checkbox.reopen(KeyResponderInputSupport);
  Ember['default'].Select.reopen(KeyResponderInputSupport);

  exports.KEY_EVENTS = KEY_EVENTS;
  exports.MODIFIED_KEY_EVENTS = MODIFIED_KEY_EVENTS;
  exports.KeyResponderInputSupport = KeyResponderInputSupport;

});
define('harvestman/login/route', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, Ember, UnauthenticatedRouteMixin) {

  'use strict';

  var service = Ember['default'].inject.service;

  exports['default'] = Ember['default'].Route.extend(UnauthenticatedRouteMixin['default'], {
    model: function model() {
      return Ember['default'].Object.create({
        identification: null,
        password: null
      });
    },
    session: Ember['default'].inject.service(),
    actions: {
      authenticate: function authenticate() {
        var _this = this;

        var identification = this.modelFor('login').get('identification');
        var password = this.modelFor('login').get('password');

        return this.get('session').authenticate('authenticator:devise', identification, password)['catch'](function (reason) {
          _this.set('errorMessage', reason.error);
        });
      }
    }
  });

});
define('harvestman/login/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 22,
            "column": 0
          }
        },
        "moduleName": "harvestman/login/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col s12");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","identification");
        var el5 = dom.createTextNode("E-mail");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col s12");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        dom.setAttribute(el4,"for","password");
        var el5 = dom.createTextNode("Password");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","col s12");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"type","submit");
        var el5 = dom.createTextNode("Log in");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(3);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1, 1]),4,4);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [3, 1]),4,4);
        return morphs;
      },
      statements: [
        ["element","action",["authenticate"],["on","submit"],["loc",[null,[1,6],[1,43]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.identification",["loc",[null,[5,20],[5,40]]]]],[],[]],"placeholder","E-mail","type","text","name","email"],["loc",[null,[5,6],[5,88]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","model.password",["loc",[null,[12,20],[12,34]]]]],[],[]],"placeholder","Password","type","password","name","password"],["loc",[null,[12,6],[12,91]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('harvestman/page/adapter', ['exports', 'harvestman/application/adapter'], function (exports, ApplicationAdapter) {

  'use strict';

  exports['default'] = ApplicationAdapter['default'].extend({
    namespace: 'api/v1'
  });

});
define('harvestman/page/base/route', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model(params) {
      var page;
      if (params.page_id) {
        page = this.store.find('page', params.page_id);
      } else {
        page = this.store.createRecord('page');
      }

      return Ember['default'].RSVP.hash({
        page: page
      });
    },
    actions: {
      save: function save() {
        var _this = this;

        var model;
        model = this.currentModel;
        model.page.save().then(function (response) {
          var parent = _this.container.lookup("route:page");
          parent.refresh().then(function () {
            _this.container.lookup('router:main').transitionTo('page.show', response.id);
          });
        });
      }
    }
  });

});
define('harvestman/page/edit/route', ['exports', 'harvestman/page/base/route'], function (exports, BaseRoute) {

	'use strict';

	exports['default'] = BaseRoute['default'].extend({});

});
define('harvestman/page/edit/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "harvestman/page/edit/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Edit Page");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        return morphs;
      },
      statements: [
        ["inline","hm-page-form",[],["page",["subexpr","@mut",[["get","model.page",["loc",[null,[2,20],[2,30]]]]],[],[]],"action","save"],["loc",[null,[2,0],[2,46]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('harvestman/page/model', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var attr = DS['default'].attr;

  exports['default'] = DS['default'].Model.extend({
    permalink: attr('string'),
    title: attr('string'),
    content: attr('string')
  });

});
define('harvestman/page/new/route', ['exports', 'harvestman/page/base/route'], function (exports, BaseRoute) {

	'use strict';

	exports['default'] = BaseRoute['default'].extend({});

});
define('harvestman/page/new/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "harvestman/page/new/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col s12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h5");
        var el4 = dom.createTextNode("Create New Page");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        return morphs;
      },
      statements: [
        ["inline","hm-page-form",[],["page",["subexpr","@mut",[["get","model.page",["loc",[null,[6,20],[6,30]]]]],[],[]],"action","save"],["loc",[null,[6,0],[6,46]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('harvestman/page/route', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      var pages = this.store.query('page', {});
      return Ember['default'].RSVP.hash({
        pages: pages
      });
    }
  });

});
define('harvestman/page/show/route', ['exports', 'harvestman/page/base/route'], function (exports, BaseRoute) {

	'use strict';

	exports['default'] = BaseRoute['default'].extend({});

});
define('harvestman/page/show/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "harvestman/page/show/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["inline","hm-page-display",[],["page",["subexpr","@mut",[["get","model.page",["loc",[null,[1,23],[1,33]]]]],[],[]]],["loc",[null,[1,0],[1,35]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('harvestman/page/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.7",
            "loc": {
              "source": null,
              "start": {
                "line": 5,
                "column": 8
              },
              "end": {
                "line": 7,
                "column": 8
              }
            },
            "moduleName": "harvestman/page/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
            return morphs;
          },
          statements: [
            ["content","page.title",["loc",[null,[6,10],[6,24]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 6
            },
            "end": {
              "line": 8,
              "column": 6
            }
          },
          "moduleName": "harvestman/page/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","link-to",["page.show",["get","page.id",["loc",[null,[5,31],[5,38]]]]],["class","collection-item"],0,null,["loc",[null,[5,8],[7,20]]]]
        ],
        locals: ["page"],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 4
            },
            "end": {
              "line": 10,
              "column": 57
            }
          },
          "moduleName": "harvestman/page/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Add New Page");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "harvestman/page/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"id","product-list");
        dom.setAttribute(el2,"class","col s3 sidebar");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","collection");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col s9");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]),1,1);
        morphs[1] = dom.createMorphAt(element1,3,3);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
        return morphs;
      },
      statements: [
        ["block","each",[["get","model.pages",["loc",[null,[4,14],[4,25]]]]],[],0,null,["loc",[null,[4,6],[8,15]]]],
        ["block","link-to",["page.new"],["id","new-page-btn"],1,null,["loc",[null,[10,4],[10,69]]]],
        ["content","outlet",["loc",[null,[13,4],[13,14]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('harvestman/product/adapter', ['exports', 'harvestman/application/adapter'], function (exports, ApplicationAdapter) {

  'use strict';

  exports['default'] = ApplicationAdapter['default'].extend({
    namespace: 'api/v1'
  });

});
define('harvestman/product/base/route', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model(params) {
      var product;
      if (params.product_id) {
        product = this.store.find('product', params.product_id);
      } else {
        product = this.store.createRecord('product');
      }

      return Ember['default'].RSVP.hash({
        store: this.store,
        product: product
      });
    },
    actions: {
      save: function save() {
        var _this = this;

        var model;
        model = this.currentModel;
        model.product.save().then(function (response) {
          var parent = _this.container.lookup("route:product");
          parent.refresh().then(function () {
            _this.container.lookup('router:main').transitionTo('product.show', response.id);
          });
        });
      }
    }
  });

});
define('harvestman/product/edit/route', ['exports', 'harvestman/product/base/route'], function (exports, BaseRoute) {

	'use strict';

	exports['default'] = BaseRoute['default'].extend({});

});
define('harvestman/product/edit/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "harvestman/product/edit/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col s12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h5");
        var el4 = dom.createTextNode("Edit Product");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col s12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2, 1]),1,1);
        return morphs;
      },
      statements: [
        ["inline","hm-product-form",[],["store",["subexpr","@mut",[["get","model.store",["loc",[null,[8,28],[8,39]]]]],[],[]],"product",["subexpr","@mut",[["get","model.product",["loc",[null,[8,48],[8,61]]]]],[],[]],"action","save"],["loc",[null,[8,4],[8,77]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('harvestman/product/model', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var attr = DS['default'].attr;

  exports['default'] = DS['default'].Model.extend({
    name: attr('string'),
    modelNumber: attr('string'),
    description: attr('string'),
    briefDescription: attr('string'),
    manual: attr('string'),
    images: DS['default'].hasMany('image', { async: 'false' })
  });

});
define('harvestman/product/new/route', ['exports', 'harvestman/product/base/route'], function (exports, BaseRoute) {

	'use strict';

	exports['default'] = BaseRoute['default'].extend({});

});
define('harvestman/product/new/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "harvestman/product/new/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col s12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h5");
        var el4 = dom.createTextNode("Create New Product");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1]),3,3);
        return morphs;
      },
      statements: [
        ["inline","hm-product-form",[],["product",["subexpr","@mut",[["get","model.product",["loc",[null,[4,30],[4,43]]]]],[],[]],"action","save"],["loc",[null,[4,4],[4,59]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('harvestman/product/route', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      var products = this.store.query('product', {});
      return Ember['default'].RSVP.hash({
        products: products,
        isIndex: true
      });
    }
  });

});
define('harvestman/product/serializer', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].ActiveModelSerializer.extend(DS['default'].EmbeddedRecordsMixin, {
    isNewSerializerAPI: true,
    attrs: {
      images: { embedded: 'always' }
    }
  });

});
define('harvestman/product/show/route', ['exports', 'harvestman/product/base/route'], function (exports, BaseRoute) {

	'use strict';

	exports['default'] = BaseRoute['default'].extend({});

});
define('harvestman/product/show/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "harvestman/product/show/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col s12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1]),1,1);
        return morphs;
      },
      statements: [
        ["inline","hm-product-display",[],["product",["subexpr","@mut",[["get","model.product",["loc",[null,[3,33],[3,46]]]]],[],[]]],["loc",[null,[3,4],[3,48]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('harvestman/product/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "harvestman/product/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col s12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element0,1,1);
        morphs[1] = dom.createMorphAt(element0,3,3);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[3,4],[3,14]]]],
        ["inline","hm-product-tiles",[],["products",["subexpr","@mut",[["get","model.products",["loc",[null,[4,32],[4,46]]]]],[],[]]],["loc",[null,[4,4],[4,48]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('harvestman/router', ['exports', 'ember', 'harvestman/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('index');
    this.resource('product', { path: '/products' });
    this.route('product.new', { path: '/products/new' });
    this.route('product.edit', { path: '/products/:product_id/edit' });
    this.route('product.show', { path: '/products/:product_id' });

    this.route('page.show', { path: '/pages/:page_id' });
    this.route('page.edit', { path: '/pages/:page_id/edit' });
    this.resource('page', { path: '/pages' }, function () {
      this.route('new');
    });

    this.resource('home', { path: '/' }, function () {});
    this.resource('about', { path: '/pages/about' }, function () {});
    this.resource('media', { path: '/media' }, function () {});
    this.resource('news', { path: '/news' }, function () {});
    this.resource('firmware', { path: '/pages/firmware' }, function () {});
    this.resource('systems', { path: '/systems' }, function () {});
    this.route('login');
  });

  exports['default'] = Router;

});
define('harvestman/routes/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend();

});
define('harvestman/services/md-settings', ['exports', 'ember-cli-materialize/services/md-settings'], function (exports, md_settings) {

	'use strict';



	exports['default'] = md_settings['default'];

});
define('harvestman/services/modal-dialog', ['exports', 'ember-modal-dialog/services/modal-dialog'], function (exports, Service) {

	'use strict';

	exports['default'] = Service['default'];

});
define('harvestman/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, SessionService) {

	'use strict';

	exports['default'] = SessionService['default'];

});
define('harvestman/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, Adaptive) {

	'use strict';

	exports['default'] = Adaptive['default'].extend();

});
define('harvestman/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 6
            },
            "end": {
              "line": 6,
              "column": 6
            }
          },
          "moduleName": "harvestman/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.setAttribute(el1,"src","assets/images/logo.png");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 4
            },
            "end": {
              "line": 10,
              "column": 4
            }
          },
          "moduleName": "harvestman/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","link-to",["about","about"],[],["loc",[null,[9,6],[9,33]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 4
            },
            "end": {
              "line": 13,
              "column": 4
            }
          },
          "moduleName": "harvestman/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","link-to",["Products","product"],[],["loc",[null,[12,6],[12,38]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 4
            },
            "end": {
              "line": 16,
              "column": 4
            }
          },
          "moduleName": "harvestman/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","link-to",["Systems","systems"],[],["loc",[null,[15,6],[15,37]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child4 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 4
            },
            "end": {
              "line": 19,
              "column": 4
            }
          },
          "moduleName": "harvestman/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","link-to",["News","news"],[],["loc",[null,[18,6],[18,31]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child5 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 4
            },
            "end": {
              "line": 22,
              "column": 4
            }
          },
          "moduleName": "harvestman/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","link-to",["Media","media"],[],["loc",[null,[21,6],[21,33]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child6 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 4
            },
            "end": {
              "line": 25,
              "column": 4
            }
          },
          "moduleName": "harvestman/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","link-to",["Firmware","firmware"],[],["loc",[null,[24,6],[24,39]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child7 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 4
            },
            "end": {
              "line": 32,
              "column": 4
            }
          },
          "moduleName": "harvestman/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","#");
          var el3 = dom.createTextNode("\n        Logout\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [
          ["element","action",["invalidateSession"],[],["loc",[null,[28,18],[28,48]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 41,
            "column": 0
          }
        },
        "moduleName": "harvestman/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("header");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"id","nav-mobile");
        dom.setAttribute(el2,"class","side-nav fixed");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","logo");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("main");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","section");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(10);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]),1,1);
        morphs[1] = dom.createMorphAt(element1,3,3);
        morphs[2] = dom.createMorphAt(element1,4,4);
        morphs[3] = dom.createMorphAt(element1,5,5);
        morphs[4] = dom.createMorphAt(element1,6,6);
        morphs[5] = dom.createMorphAt(element1,7,7);
        morphs[6] = dom.createMorphAt(element1,8,8);
        morphs[7] = dom.createMorphAt(element1,9,9);
        morphs[8] = dom.createMorphAt(dom.childAt(fragment, [2, 1]),1,1);
        morphs[9] = dom.createMorphAt(fragment,4,4,contextualElement);
        return morphs;
      },
      statements: [
        ["block","link-to",["home"],[],0,null,["loc",[null,[4,6],[6,18]]]],
        ["block","link-to",["page.show","about"],["tagName","li"],1,null,["loc",[null,[8,4],[10,16]]]],
        ["block","link-to",["product"],["tagName","li"],2,null,["loc",[null,[11,4],[13,16]]]],
        ["block","link-to",["systems"],["tagName","li"],3,null,["loc",[null,[14,4],[16,16]]]],
        ["block","link-to",["news"],["tagName","li"],4,null,["loc",[null,[17,4],[19,16]]]],
        ["block","link-to",["media"],["tagName","li"],5,null,["loc",[null,[20,4],[22,16]]]],
        ["block","link-to",["page.show","firmware"],["tagName","li"],6,null,["loc",[null,[23,4],[25,16]]]],
        ["block","if",[["get","session.isAuthenticated",["loc",[null,[26,10],[26,33]]]]],[],7,null,["loc",[null,[26,4],[32,11]]]],
        ["content","outlet",["loc",[null,[37,4],[37,14]]]],
        ["content","md-modal-container",["loc",[null,[40,0],[40,22]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5, child6, child7]
    };
  }()));

});
define('harvestman/templates/components/labeled-radio-button', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 0
          }
        },
        "moduleName": "harvestman/templates/components/labeled-radio-button.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["inline","radio-button",[],["radioClass",["subexpr","@mut",[["get","radioClass",["loc",[null,[2,15],[2,25]]]]],[],[]],"radioId",["subexpr","@mut",[["get","radioId",["loc",[null,[3,12],[3,19]]]]],[],[]],"changed","innerRadioChanged","disabled",["subexpr","@mut",[["get","disabled",["loc",[null,[5,13],[5,21]]]]],[],[]],"groupValue",["subexpr","@mut",[["get","groupValue",["loc",[null,[6,15],[6,25]]]]],[],[]],"name",["subexpr","@mut",[["get","name",["loc",[null,[7,9],[7,13]]]]],[],[]],"required",["subexpr","@mut",[["get","required",["loc",[null,[8,13],[8,21]]]]],[],[]],"value",["subexpr","@mut",[["get","value",["loc",[null,[9,10],[9,15]]]]],[],[]]],["loc",[null,[1,0],[9,17]]]],
        ["content","yield",["loc",[null,[11,0],[11,9]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('harvestman/templates/components/modal-dialog', ['exports', 'ember-modal-dialog/templates/components/modal-dialog'], function (exports, template) {

	'use strict';

	exports['default'] = template['default'];

});
define('harvestman/templates/components/photo-swipe', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 29,
              "column": 10
            },
            "end": {
              "line": 31,
              "column": 10
            }
          },
          "moduleName": "harvestman/templates/components/photo-swipe.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","pswp__button pswp__button--close");
          dom.setAttribute(el1,"title","Close (Esc)");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 33,
              "column": 10
            },
            "end": {
              "line": 35,
              "column": 10
            }
          },
          "moduleName": "harvestman/templates/components/photo-swipe.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","pswp__button pswp__button--share");
          dom.setAttribute(el1,"title","Share");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 37,
              "column": 10
            },
            "end": {
              "line": 39,
              "column": 10
            }
          },
          "moduleName": "harvestman/templates/components/photo-swipe.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","pswp__button pswp__button--fs");
          dom.setAttribute(el1,"title","Toggle fullscreen");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 41,
              "column": 10
            },
            "end": {
              "line": 43,
              "column": 10
            }
          },
          "moduleName": "harvestman/templates/components/photo-swipe.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","pswp__button pswp__button--zoom");
          dom.setAttribute(el1,"title","Zoom in/out");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 74,
            "column": 0
          }
        },
        "moduleName": "harvestman/templates/components/photo-swipe.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" Root element of PhotoSwipe. Must have class pswp. ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","pswp");
        dom.setAttribute(el1,"tabindex","-1");
        dom.setAttribute(el1,"role","dialog");
        dom.setAttribute(el1,"aria-hidden","true");
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" Background of PhotoSwipe.\n    It's a separate element, as animating opacity is faster than rgba(). ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pswp__bg");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" Slides wrapper with overflow:hidden. ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","pswp__scroll-wrap");
        var el3 = dom.createTextNode("\n\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","pswp__container");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment(" don't modify these 3 pswp__item elements, data is added later on ");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__item");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__item");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__item");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","pswp__ui pswp__ui--hidden");
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__top-bar");
        var el5 = dom.createTextNode("\n\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("  Controls are self-explanatory. Order can be changed. ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","pswp__counter");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment(" Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","pswp__preloader");
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","pswp__preloader__icn");
        var el7 = dom.createTextNode("\n              ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","pswp__preloader__cut");
        var el8 = dom.createTextNode("\n                ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8,"class","pswp__preloader__donut");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__share-modal pswp__share-modal--hidden pswp__single-tap");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","pswp__share-tooltip");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","pswp__button pswp__button--arrow--left");
        dom.setAttribute(el4,"title","Previous (arrow left)");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","pswp__button pswp__button--arrow--right");
        dom.setAttribute(el4,"title","Next (arrow right)");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","pswp__caption");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","pswp__caption__center");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [4, 7, 7, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(element0,5,5);
        morphs[2] = dom.createMorphAt(element0,7,7);
        morphs[3] = dom.createMorphAt(element0,9,9);
        morphs[4] = dom.createMorphAt(element0,11,11);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[1,0],[1,9]]]],
        ["block","unless",[["get","options.hideClose",["loc",[null,[29,20],[29,37]]]]],[],0,null,["loc",[null,[29,10],[31,21]]]],
        ["block","unless",[["get","options.hideShare",["loc",[null,[33,20],[33,37]]]]],[],1,null,["loc",[null,[33,10],[35,21]]]],
        ["block","unless",[["get","options.hideToggleFullScreen",["loc",[null,[37,20],[37,48]]]]],[],2,null,["loc",[null,[37,10],[39,21]]]],
        ["block","unless",[["get","options.hideZoomInOut",["loc",[null,[41,20],[41,41]]]]],[],3,null,["loc",[null,[41,10],[43,21]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  }()));

});
define('harvestman/templates/components/radio-button', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 15,
              "column": 0
            }
          },
          "moduleName": "harvestman/templates/components/radio-button.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(4);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createAttrMorph(element0, 'for');
          morphs[2] = dom.createMorphAt(element0,1,1);
          morphs[3] = dom.createMorphAt(element0,3,3);
          return morphs;
        },
        statements: [
          ["attribute","class",["concat",["ember-radio-button ",["subexpr","if",[["get","checked",["loc",[null,[2,40],[2,47]]]],"checked"],[],["loc",[null,[2,35],[2,59]]]]," ",["get","joinedClassNames",["loc",[null,[2,62],[2,78]]]]]]],
          ["attribute","for",["get","radioId",["loc",[null,[2,88],[2,95]]]]],
          ["inline","radio-button-input",[],["class",["subexpr","@mut",[["get","radioClass",["loc",[null,[4,14],[4,24]]]]],[],[]],"id",["subexpr","@mut",[["get","radioId",["loc",[null,[5,11],[5,18]]]]],[],[]],"disabled",["subexpr","@mut",[["get","disabled",["loc",[null,[6,17],[6,25]]]]],[],[]],"name",["subexpr","@mut",[["get","name",["loc",[null,[7,13],[7,17]]]]],[],[]],"required",["subexpr","@mut",[["get","required",["loc",[null,[8,17],[8,25]]]]],[],[]],"groupValue",["subexpr","@mut",[["get","groupValue",["loc",[null,[9,19],[9,29]]]]],[],[]],"value",["subexpr","@mut",[["get","value",["loc",[null,[10,14],[10,19]]]]],[],[]],"changed","changed"],["loc",[null,[3,4],[11,27]]]],
          ["content","yield",["loc",[null,[13,4],[13,13]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.7",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 0
            },
            "end": {
              "line": 25,
              "column": 0
            }
          },
          "moduleName": "harvestman/templates/components/radio-button.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","radio-button-input",[],["class",["subexpr","@mut",[["get","radioClass",["loc",[null,[17,12],[17,22]]]]],[],[]],"id",["subexpr","@mut",[["get","radioId",["loc",[null,[18,9],[18,16]]]]],[],[]],"disabled",["subexpr","@mut",[["get","disabled",["loc",[null,[19,15],[19,23]]]]],[],[]],"name",["subexpr","@mut",[["get","name",["loc",[null,[20,11],[20,15]]]]],[],[]],"required",["subexpr","@mut",[["get","required",["loc",[null,[21,15],[21,23]]]]],[],[]],"groupValue",["subexpr","@mut",[["get","groupValue",["loc",[null,[22,17],[22,27]]]]],[],[]],"value",["subexpr","@mut",[["get","value",["loc",[null,[23,12],[23,17]]]]],[],[]],"changed","changed"],["loc",[null,[16,2],[24,25]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 26,
            "column": 0
          }
        },
        "moduleName": "harvestman/templates/components/radio-button.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","hasBlock",["loc",[null,[1,6],[1,14]]]]],[],0,1,["loc",[null,[1,0],[25,7]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('harvestman/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function(assert) { 
    assert.ok(true, 'app.js should pass jshint.'); 
  });

});
define('harvestman/tests/application/adapter.jshint', function () {

  'use strict';

  QUnit.module('JSHint - application');
  QUnit.test('application/adapter.js should pass jshint', function(assert) { 
    assert.ok(false, 'application/adapter.js should pass jshint.\napplication/adapter.js: line 10, col 6, Missing semicolon.\napplication/adapter.js: line 9, col 42, \'Ember\' is not defined.\n\n2 errors'); 
  });

});
define('harvestman/tests/application/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - application');
  QUnit.test('application/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'application/route.js should pass jshint.'); 
  });

});
define('harvestman/tests/authenticators/devise.jshint', function () {

  'use strict';

  QUnit.module('JSHint - authenticators');
  QUnit.test('authenticators/devise.js should pass jshint', function(assert) { 
    assert.ok(true, 'authenticators/devise.js should pass jshint.'); 
  });

});
define('harvestman/tests/authorizers/devise.jshint', function () {

  'use strict';

  QUnit.module('JSHint - authorizers');
  QUnit.test('authorizers/devise.js should pass jshint', function(assert) { 
    assert.ok(true, 'authorizers/devise.js should pass jshint.'); 
  });

});
define('harvestman/tests/components/hm-file-uploader/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/hm-file-uploader');
  QUnit.test('components/hm-file-uploader/component.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/hm-file-uploader/component.js should pass jshint.'); 
  });

});
define('harvestman/tests/components/hm-footer/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/hm-footer');
  QUnit.test('components/hm-footer/component.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/hm-footer/component.js should pass jshint.'); 
  });

});
define('harvestman/tests/components/hm-image/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/hm-image');
  QUnit.test('components/hm-image/component.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/hm-image/component.js should pass jshint.'); 
  });

});
define('harvestman/tests/components/hm-images/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/hm-images');
  QUnit.test('components/hm-images/component.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/hm-images/component.js should pass jshint.'); 
  });

});
define('harvestman/tests/components/hm-page-display/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/hm-page-display');
  QUnit.test('components/hm-page-display/component.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/hm-page-display/component.js should pass jshint.'); 
  });

});
define('harvestman/tests/components/hm-page-form/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/hm-page-form');
  QUnit.test('components/hm-page-form/component.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/hm-page-form/component.js should pass jshint.'); 
  });

});
define('harvestman/tests/components/hm-product-display/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/hm-product-display');
  QUnit.test('components/hm-product-display/component.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/hm-product-display/component.js should pass jshint.'); 
  });

});
define('harvestman/tests/components/hm-product-form/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/hm-product-form');
  QUnit.test('components/hm-product-form/component.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/hm-product-form/component.js should pass jshint.'); 
  });

});
define('harvestman/tests/components/hm-product-tile/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/hm-product-tile');
  QUnit.test('components/hm-product-tile/component.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/hm-product-tile/component.js should pass jshint.'); 
  });

});
define('harvestman/tests/components/hm-product-tiles/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/hm-product-tiles');
  QUnit.test('components/hm-product-tiles/component.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/hm-product-tiles/component.js should pass jshint.'); 
  });

});
define('harvestman/tests/components/hm-slideshow/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components/hm-slideshow');
  QUnit.test('components/hm-slideshow/component.js should pass jshint', function(assert) { 
    assert.ok(true, 'components/hm-slideshow/component.js should pass jshint.'); 
  });

});
define('harvestman/tests/controllers/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/application.js should pass jshint', function(assert) { 
    assert.ok(true, 'controllers/application.js should pass jshint.'); 
  });

});
define('harvestman/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, Test) {

  'use strict';

  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;

  var TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    var authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, Test['default']);
    }
  }

  function authenticateSession(app, sessionData) {
    var container = app.__container__;

    var session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return wait();
  }

  ;

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  ;

  function invalidateSession(app) {
    var session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return wait();
  }

  ;

});
define('harvestman/tests/helpers/resolver', ['exports', 'ember/resolver', 'harvestman/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('harvestman/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('harvestman/tests/helpers/start-app', ['exports', 'ember', 'harvestman/app', 'harvestman/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('harvestman/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('harvestman/tests/image/model.jshint', function () {

  'use strict';

  QUnit.module('JSHint - image');
  QUnit.test('image/model.js should pass jshint', function(assert) { 
    assert.ok(true, 'image/model.js should pass jshint.'); 
  });

});
define('harvestman/tests/integration/components/hm-footer/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('hm-footer', 'Integration | Component | hm footer', {
    integration: true
  });

  ember_qunit.test('it displays the copyright', function (assert) {
    assert.expect(1);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 13
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'hm-footer', ['loc', [null, [1, 0], [1, 13]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '© 2015 Copyright Industrial Music Electronics');
  });

});
define('harvestman/tests/integration/components/hm-footer/component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components/hm-footer');
  QUnit.test('integration/components/hm-footer/component-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/hm-footer/component-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/integration/components/hm-image/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('hm-image', 'Integration | Component | hm image', {
    integration: true
  });

  ember_qunit.test('it displays an image', function (assert) {
    assert.expect(1);
    this.set('url', 'foobar.jpg');
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 20
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'hm-image', [], ['url', ['subexpr', '@mut', [['get', 'url', ['loc', [null, [1, 15], [1, 18]]]]], [], []]], ['loc', [null, [1, 0], [1, 20]]]]],
        locals: [],
        templates: []
      };
    })()));
    assert.equal(this.$('img').attr('src'), 'foobar.jpg');
  });

});
define('harvestman/tests/integration/components/hm-image/component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components/hm-image');
  QUnit.test('integration/components/hm-image/component-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/hm-image/component-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/integration/components/hm-images/component-test', ['ember-qunit', 'ember'], function (ember_qunit, Ember) {

  'use strict';

  ember_qunit.moduleForComponent('hm-images', 'Integration | Component | hm images', {
    integration: true
  });

  ember_qunit.test('it displays an array of images', function (assert) {
    assert.expect(3);
    var images = [{ url: 'foo.jpg' }, { url: 'bar.jpg' }];

    this.set('images', images);
    this.render(Ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 27
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'hm-images', [], ['images', ['subexpr', '@mut', [['get', 'images', ['loc', [null, [1, 19], [1, 25]]]]], [], []]], ['loc', [null, [1, 0], [1, 27]]]]],
        locals: [],
        templates: []
      };
    })()));

    var renderedImages = this.$('img');
    assert.equal(renderedImages.length, 2);
    assert.equal(Ember['default'].$(renderedImages[0]).attr('src'), 'foo.jpg');
    assert.equal(Ember['default'].$(renderedImages[1]).attr('src'), 'bar.jpg');
  });

});
define('harvestman/tests/integration/components/hm-images/component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components/hm-images');
  QUnit.test('integration/components/hm-images/component-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/hm-images/component-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/integration/components/hm-page-display/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('hm-page-display', 'Integration | Component | hm page display', {
    integration: true
  });

  ember_qunit.test('it displays the edit page', function (assert) {
    assert.expect(2);
    var page = {
      title: 'foo title',
      id: 666,
      content: 'foo content'
    };

    this.set('page', page);
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 29
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'hm-page-display', [], ['page', ['subexpr', '@mut', [['get', 'page', ['loc', [null, [1, 23], [1, 27]]]]], [], []]], ['loc', [null, [1, 0], [1, 29]]]]],
        locals: [],
        templates: []
      };
    })()));
    assert.equal(this.$('h5').text().trim(), 'foo title');
    assert.equal(this.$('#page-content').text().trim(), 'foo content');
  });

});
define('harvestman/tests/integration/components/hm-page-display/component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components/hm-page-display');
  QUnit.test('integration/components/hm-page-display/component-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/hm-page-display/component-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/integration/components/hm-page-form/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('hm-page-form', 'Integration | Component | hm page form', {
    integration: true
  });

  ember_qunit.test('it displays the page form', function (assert) {
    assert.expect(3);
    var page = {
      permalink: 'foo-permalink',
      title: 'foo title',
      content: 'foo content'
    };

    this.set('page', page);
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 26
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'hm-page-form', [], ['page', ['subexpr', '@mut', [['get', 'page', ['loc', [null, [1, 20], [1, 24]]]]], [], []]], ['loc', [null, [1, 0], [1, 26]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('#page-permalink').val(), 'foo-permalink');
    assert.equal(this.$('#page-title').val(), 'foo title');
    assert.equal(this.$('#page-content').val(), 'foo content');
  });

});
define('harvestman/tests/integration/components/hm-page-form/component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components/hm-page-form');
  QUnit.test('integration/components/hm-page-form/component-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/hm-page-form/component-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/integration/components/hm-product-display/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('hm-product-display', 'Integration | Component | hm product display', {
    integration: true
  });

  ember_qunit.test('it displays a product', function (assert) {
    assert.expect(3);
    var product = {
      id: 666,
      name: 'foo name',
      modelNumber: 'foo-model-number',
      images: [{
        url: 'foo.jpg'
      }],
      description: 'foo description',
      manual: 'foo manual'
    };

    this.set('product', product);
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 38
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'hm-product-display', [], ['product', ['subexpr', '@mut', [['get', 'product', ['loc', [null, [1, 29], [1, 36]]]]], [], []]], ['loc', [null, [1, 0], [1, 38]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('.product-name').text().trim(), product.name);
    assert.equal(this.$('.model-number').text().trim(), 'model ' + product.modelNumber);
    assert.equal(this.$('#description').text().trim(), product.description);
  });

});
define('harvestman/tests/integration/components/hm-product-display/component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components/hm-product-display');
  QUnit.test('integration/components/hm-product-display/component-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/hm-product-display/component-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/integration/components/hm-product-form/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('hm-product-form', 'Integration | Component | hm product form', {
    integration: true
  });

  ember_qunit.test('it displays the product form', function (assert) {
    assert.expect(5);
    var product = {
      images: [],
      name: 'foo name',
      modelNumber: 'foo-model-number',
      briefDescription: 'foo brief description',
      description: 'foo description',
      manual: 'foo manual'
    };

    this.set('product', product);
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 35
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'hm-product-form', [], ['product', ['subexpr', '@mut', [['get', 'product', ['loc', [null, [1, 26], [1, 33]]]]], [], []]], ['loc', [null, [1, 0], [1, 35]]]]],
        locals: [],
        templates: []
      };
    })()));
    assert.equal(this.$('#product-name').val(), product.name);
    assert.equal(this.$('#product-model-number').val(), product.modelNumber);
    assert.equal(this.$('#product-brief-description').val(), product.briefDescription);
    assert.equal(this.$('#product-description').val(), product.description);
    assert.equal(this.$('#product-manual').val(), product.manual);
  });

});
define('harvestman/tests/integration/components/hm-product-form/component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components/hm-product-form');
  QUnit.test('integration/components/hm-product-form/component-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/hm-product-form/component-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/integration/components/hm-product-tile/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('hm-product-tile', 'Integration | Component | hm product tile', {
    integration: true
  });

  ember_qunit.test('it displays a product', function (assert) {
    assert.expect(3);

    var product = {
      images: [{
        url: 'foo.jpg'
      }],
      name: 'foo name',
      briefDescription: 'foo briefDescription'
    };

    this.set('product', product);
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 35
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'hm-product-tile', [], ['product', ['subexpr', '@mut', [['get', 'product', ['loc', [null, [1, 26], [1, 33]]]]], [], []]], ['loc', [null, [1, 0], [1, 35]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$('img').attr('src'), product.images[0].url);
    assert.equal(this.$('.title').text().trim(), product.name);
    assert.equal(this.$('p').text().trim(), product.briefDescription);
  });

});
define('harvestman/tests/integration/components/hm-product-tile/component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components/hm-product-tile');
  QUnit.test('integration/components/hm-product-tile/component-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/hm-product-tile/component-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/integration/components/hm-product-tiles/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('hm-product-tiles', 'Integration | Component | hm product tiles', {
    integration: true
  });

  ember_qunit.test('it displays an array of products', function (assert) {
    assert.expect(3);

    var products = [{ name: 'first name' }, { name: 'second name' }];

    this.set('products', products);
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 38
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'hm-product-tiles', [], ['products', ['subexpr', '@mut', [['get', 'products', ['loc', [null, [1, 28], [1, 36]]]]], [], []]], ['loc', [null, [1, 0], [1, 38]]]]],
        locals: [],
        templates: []
      };
    })()));

    var titles = this.$('.title');
    assert.equal(titles.length, 2);
    assert.equal($(titles[0]).text().trim(), products[0].name);
    assert.equal($(titles[1]).text().trim(), products[1].name);
  });

});
define('harvestman/tests/integration/components/hm-product-tiles/component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components/hm-product-tiles');
  QUnit.test('integration/components/hm-product-tiles/component-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/hm-product-tiles/component-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/integration/components/hm-slideshow/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('hm-slideshow', 'Integration | Component | hm slideshow', {
    integration: true
  });

  ember_qunit.test('it displays a list of images', function (assert) {
    assert.expect(3);
    var images = [{ url: 'first.jpg' }, { url: 'second.jpg' }];

    this.set('images', images);
    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@1.13.7',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 30
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'hm-slideshow', [], ['images', ['subexpr', '@mut', [['get', 'images', ['loc', [null, [1, 22], [1, 28]]]]], [], []]], ['loc', [null, [1, 0], [1, 30]]]]],
        locals: [],
        templates: []
      };
    })()));

    var renderedImages = this.$('img');

    assert.equal(renderedImages.length, 2);
    assert.equal($(renderedImages[0]).attr('style'), 'background-image: url(http://localhost:4200/' + images[0].url + ');');

    assert.equal($(renderedImages[1]).attr('style'), 'background-image: url(http://localhost:4200/' + images[1].url + ');');
  });

});
define('harvestman/tests/integration/components/hm-slideshow/component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components/hm-slideshow');
  QUnit.test('integration/components/hm-slideshow/component-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'integration/components/hm-slideshow/component-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/login/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - login');
  QUnit.test('login/route.js should pass jshint', function(assert) { 
    assert.ok(false, 'login/route.js should pass jshint.\nlogin/route.js: line 3, col 17, \'service\' is defined but never used.\n\n1 error'); 
  });

});
define('harvestman/tests/page/adapter.jshint', function () {

  'use strict';

  QUnit.module('JSHint - page');
  QUnit.test('page/adapter.js should pass jshint', function(assert) { 
    assert.ok(true, 'page/adapter.js should pass jshint.'); 
  });

});
define('harvestman/tests/page/base/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - page/base');
  QUnit.test('page/base/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'page/base/route.js should pass jshint.'); 
  });

});
define('harvestman/tests/page/edit/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - page/edit');
  QUnit.test('page/edit/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'page/edit/route.js should pass jshint.'); 
  });

});
define('harvestman/tests/page/model.jshint', function () {

  'use strict';

  QUnit.module('JSHint - page');
  QUnit.test('page/model.js should pass jshint', function(assert) { 
    assert.ok(true, 'page/model.js should pass jshint.'); 
  });

});
define('harvestman/tests/page/new/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - page/new');
  QUnit.test('page/new/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'page/new/route.js should pass jshint.'); 
  });

});
define('harvestman/tests/page/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - page');
  QUnit.test('page/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'page/route.js should pass jshint.'); 
  });

});
define('harvestman/tests/page/show/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - page/show');
  QUnit.test('page/show/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'page/show/route.js should pass jshint.'); 
  });

});
define('harvestman/tests/product/adapter.jshint', function () {

  'use strict';

  QUnit.module('JSHint - product');
  QUnit.test('product/adapter.js should pass jshint', function(assert) { 
    assert.ok(true, 'product/adapter.js should pass jshint.'); 
  });

});
define('harvestman/tests/product/base/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - product/base');
  QUnit.test('product/base/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'product/base/route.js should pass jshint.'); 
  });

});
define('harvestman/tests/product/edit/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - product/edit');
  QUnit.test('product/edit/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'product/edit/route.js should pass jshint.'); 
  });

});
define('harvestman/tests/product/model.jshint', function () {

  'use strict';

  QUnit.module('JSHint - product');
  QUnit.test('product/model.js should pass jshint', function(assert) { 
    assert.ok(true, 'product/model.js should pass jshint.'); 
  });

});
define('harvestman/tests/product/new/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - product/new');
  QUnit.test('product/new/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'product/new/route.js should pass jshint.'); 
  });

});
define('harvestman/tests/product/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - product');
  QUnit.test('product/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'product/route.js should pass jshint.'); 
  });

});
define('harvestman/tests/product/serializer.jshint', function () {

  'use strict';

  QUnit.module('JSHint - product');
  QUnit.test('product/serializer.js should pass jshint', function(assert) { 
    assert.ok(true, 'product/serializer.js should pass jshint.'); 
  });

});
define('harvestman/tests/product/show/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - product/show');
  QUnit.test('product/show/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'product/show/route.js should pass jshint.'); 
  });

});
define('harvestman/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function(assert) { 
    assert.ok(true, 'router.js should pass jshint.'); 
  });

});
define('harvestman/tests/test-helper', ['harvestman/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('harvestman/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function(assert) { 
    assert.ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('harvestman/tests/unit/image/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('image', 'Unit | Model | image', {
    // Specify the other units that are required for this test.
    needs: ['model:product']
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('harvestman/tests/unit/image/model-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/image');
  QUnit.test('unit/image/model-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/image/model-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/unit/login/controller-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('harvestman/tests/unit/login/controller-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/login');
  QUnit.test('unit/login/controller-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/login/controller-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/unit/login/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:login', 'Unit | Route | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('harvestman/tests/unit/login/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/login');
  QUnit.test('unit/login/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/login/route-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/unit/page/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('page', 'Unit | Model | page', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('harvestman/tests/unit/page/model-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/page');
  QUnit.test('unit/page/model-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/page/model-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/unit/page/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:page', 'Unit | Route | page', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('harvestman/tests/unit/page/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/page');
  QUnit.test('unit/page/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/page/route-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/unit/product/adapter-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:product', 'Unit | Adapter | product', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

});
define('harvestman/tests/unit/product/adapter-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/product');
  QUnit.test('unit/product/adapter-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/product/adapter-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/unit/product/base/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:product/base', 'Unit | Route | product/base', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('harvestman/tests/unit/product/base/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/product/base');
  QUnit.test('unit/product/base/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/product/base/route-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/unit/product/edit/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:product/edit', 'Unit | Route | product/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('harvestman/tests/unit/product/edit/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/product/edit');
  QUnit.test('unit/product/edit/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/product/edit/route-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/unit/product/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('product', 'Unit | Model | product', {
    // Specify the other units that are required for this test.
    needs: ['model:image']
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('harvestman/tests/unit/product/model-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/product');
  QUnit.test('unit/product/model-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/product/model-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/unit/product/new/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:product/new', 'Unit | Route | product/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('harvestman/tests/unit/product/new/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/product/new');
  QUnit.test('unit/product/new/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/product/new/route-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/unit/product/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:product', 'Unit | Route | product', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('harvestman/tests/unit/product/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/product');
  QUnit.test('unit/product/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/product/route-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/unit/product/serializer-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('product', 'Unit | Serializer | product', {
    // Specify the other units that are required for this test.
    needs: ['serializer:product', 'model:image']
  });

  // Replace this with your real tests.
  ember_qunit.test('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });

});
define('harvestman/tests/unit/product/serializer-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/product');
  QUnit.test('unit/product/serializer-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/product/serializer-test.js should pass jshint.'); 
  });

});
define('harvestman/tests/unit/product/show/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:product/show', 'Unit | Route | product/show', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('harvestman/tests/unit/product/show/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/product/show');
  QUnit.test('unit/product/show/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/product/show/route-test.js should pass jshint.'); 
  });

});
define('harvestman/views/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].View.extend({});

});
define('harvestman/views/default-collection-header', ['exports', 'ember-cli-materialize/views/default-collection-header'], function (exports, default_collection_header) {

	'use strict';



	exports['default'] = default_collection_header['default'];

});
define('harvestman/views/default-column-header', ['exports', 'ember-cli-materialize/views/default-column-header'], function (exports, default_column_header) {

	'use strict';



	exports['default'] = default_column_header['default'];

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('harvestman/config/environment', ['ember'], function(Ember) {
  var prefix = 'harvestman';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("harvestman/tests/test-helper");
} else {
  require("harvestman/app")["default"].create({"name":"harvestman","version":"0.0.0+76189235"});
}

/* jshint ignore:end */
//# sourceMappingURL=harvestman.map