import { module, test } from 'qunit';
import { setupTest } from 'ecom/tests/helpers';

module('Unit | Controller | display-movies', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:display-movies');
    assert.ok(controller);
  });
});
