import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hm-page-display', 'Integration | Component | hm page display', {
  integration: true
});

test('it displays the edit page', function(assert) {
  assert.expect(2);
  let page = {
    title: 'foo title',
    id: 666,
    content: 'foo content'
  };

  this.set('page', page);
  this.render(hbs`{{hm-page-display page=page}}`);
  assert.equal(this.$('h5').text().trim(), 'foo title');
  assert.equal(this.$('#page-content').text().trim(), 'foo content');
});
