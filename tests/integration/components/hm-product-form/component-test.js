import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hm-product-form', 'Integration | Component | hm product form', {
  integration: true
});

test('it displays the product form', function(assert) {
  assert.expect(5);
  let product = {
    images: [],
    name: 'foo name',
    modelNumber: 'foo-model-number',
    briefDescription: 'foo brief description',
    description: 'foo description',
    manual: 'foo manual',
  };

  this.set('product', product);
  this.render(hbs`{{hm-product-form product=product}}`);
  assert.equal(this.$('#product-name').val(), product.name);
  assert.equal(this.$('#product-model-number').val(), product.modelNumber);
  assert.equal(this.$('#product-brief-description').val(), product.briefDescription);
  assert.equal(this.$('#product-description').val(), product.description);
  assert.equal(this.$('#product-manual').val(), product.manual);
});
