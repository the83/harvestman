import { moduleForModel, test } from 'ember-qunit';

moduleForModel('product', 'Unit | Model | product', {
  // Specify the other units that are required for this test.
  needs: ['model:image']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
