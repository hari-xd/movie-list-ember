import { module, test } from 'qunit';
import { setupTest } from 'ecom/tests/helpers';

module('Unit | Service | movie-data', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:movie-data');
    assert.ok(service);
  });
});
