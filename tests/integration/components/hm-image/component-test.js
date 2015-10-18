import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hm-image', 'Integration | Component | hm image', {
  integration: true
});

test('it displays an image', function(assert) {
  assert.expect(1);
  this.set('url', 'foobar.jpg');
  this.render(hbs`{{hm-image url=url}}`);
  assert.equal(this.$('img').attr('src'), 'foobar.jpg');
});
