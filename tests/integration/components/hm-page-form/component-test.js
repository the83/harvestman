import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hm-page-form', 'Integration | Component | hm page form', {
  integration: true
});

test('it displays the page form', function(assert) {
  assert.expect(3);
  let page = {
    permalink: 'foo-permalink',
    title: 'foo title',
    content: 'foo content'
  };

  this.set('page', page);
  this.render(hbs`{{hm-page-form page=page}}`);

  assert.equal(this.$('#page-permalink').val(), 'foo-permalink');
  assert.equal(this.$('#page-title').val(), 'foo title');
  assert.equal(this.$('#page-content').val(), 'foo content');
});
