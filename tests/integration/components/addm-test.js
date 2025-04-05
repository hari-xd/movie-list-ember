import { module, test } from 'qunit';
import { setupRenderingTest } from 'ecom/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | addm', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Addm />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Addm>
        template block text
      </Addm>
    `);

    assert.dom().hasText('template block text');
  });
});
