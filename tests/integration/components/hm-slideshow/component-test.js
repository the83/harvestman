import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hm-slideshow', 'Integration | Component | hm slideshow', {
  integration: true
});

test('it displays a list of images', function(assert) {
  assert.expect(3);
  let images = [
    { url: 'first.jpg' },
    { url: 'second.jpg' }
  ];

  this.set('images', images);
  this.render(hbs`{{hm-slideshow images=images}}`);

  let renderedImages = this.$('img');

  assert.equal(renderedImages.length, 2);
  assert.equal(
    $(renderedImages[0]).attr('style'),
    `background-image: url(http://localhost:4200/${images[0].url});`
  );

  assert.equal(
    $(renderedImages[1]).attr('style'),
    `background-image: url(http://localhost:4200/${images[1].url});`
  );
});
