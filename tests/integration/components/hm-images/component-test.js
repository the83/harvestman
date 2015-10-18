import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('hm-images', 'Integration | Component | hm images', {
  integration: true
});

test('it displays an array of images', function(assert) {
  assert.expect(3);
  let images = [
    { url: 'foo.jpg' },
    { url: 'bar.jpg' }
  ];

  this.set('images', images);
  this.render(hbs`{{hm-images images=images}}`);

  let renderedImages = this.$('img');
  assert.equal(renderedImages.length, 2);
  assert.equal(Ember.$(renderedImages[0]).attr('src'), 'foo.jpg');
  assert.equal(Ember.$(renderedImages[1]).attr('src'), 'bar.jpg');
});
