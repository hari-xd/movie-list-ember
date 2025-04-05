import { module, test } from 'qunit';
import { setupTest } from 'ecom/tests/helpers';

module('Unit | Route | movies/new', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:movies/new');
    assert.ok(route);
  });
});
