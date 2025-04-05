import { module, test } from 'qunit';
import { setupTest } from 'ecom/tests/helpers';

module('Unit | Route | movies/edit', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:movies/edit');
    assert.ok(route);
  });
});
