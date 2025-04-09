import { module, test } from 'qunit';
import { setupTest } from 'ecom/tests/helpers';

module('Unit | Route | editMovie', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:edit-movie');
    assert.ok(route);
  });
});
