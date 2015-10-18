import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hm-product-display', 'Integration | Component | hm product display', {
  integration: true
});

test('it displays a product', function(assert) {
  assert.expect(3);
  let product = {
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
  this.render(hbs`{{hm-product-display product=product}}`);

  assert.equal(this.$('.product-name').text().trim(), product.name);
  assert.equal(this.$('.model-number').text().trim(), `model ${product.modelNumber}`);
  assert.equal(this.$('#description').text().trim(), product.description);
});
