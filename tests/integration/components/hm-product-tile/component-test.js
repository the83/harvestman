import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hm-product-tile', 'Integration | Component | hm product tile', {
  integration: true
});

test('it displays a product', function(assert) {
  assert.expect(3);

  let product = {
    images: [{
      url: 'foo.jpg'
    }],
    name: 'foo name',
    briefDescription: 'foo briefDescription'
  };

  this.set('product', product);
  this.render(hbs`{{hm-product-tile product=product}}`);

  assert.equal(this.$('img').attr('src'), product.images[0].url);
  assert.equal(this.$('.title').text().trim(), product.name);
  assert.equal(this.$('p').text().trim(), product.briefDescription);
});
