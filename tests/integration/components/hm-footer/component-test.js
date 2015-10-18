import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hm-footer', 'Integration | Component | hm footer', {
  integration: true
});

test('it displays the copyright', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{hm-footer}}`);

  assert.equal(
    this.$().text().trim(),
    '© 2015 Copyright Industrial Music Electronics'
  );
});
