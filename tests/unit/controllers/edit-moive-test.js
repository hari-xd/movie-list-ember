import { module, test } from 'qunit';
import { setupTest } from 'ecom/tests/helpers';

module('Unit | Controller | edit-moive', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:edit-moive');
    assert.ok(controller);
  });
});
