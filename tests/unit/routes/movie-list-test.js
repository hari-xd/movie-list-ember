import { module, test } from 'qunit';
import { setupTest } from 'ecom/tests/helpers';

module('Unit | Route | movie-list', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:movie-list');
    assert.ok(route);
  });
});
