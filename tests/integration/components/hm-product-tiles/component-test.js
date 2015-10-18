import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hm-product-tiles', 'Integration | Component | hm product tiles', {
  integration: true
});

test('it displays an array of products', function(assert) {
  assert.expect(3);

  let products = [
    { name: 'first name' },
    { name: 'second name' }
  ];

  this.set('products', products);
  this.render(hbs`{{hm-product-tiles products=products}}`);

  let titles = this.$('.title');
  assert.equal(titles.length, 2);
  assert.equal($(titles[0]).text().trim(), products[0].name);
  assert.equal($(titles[1]).text().trim(), products[1].name);
});
