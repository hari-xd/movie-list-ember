import { module, test } from 'qunit';
import { setupTest } from 'ecom/tests/helpers';

module('Unit | Controller | addm', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:addm');
    assert.ok(controller);
  });
});
