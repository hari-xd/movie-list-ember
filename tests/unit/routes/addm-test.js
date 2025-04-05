import { module, test } from 'qunit';
import { setupTest } from 'ecom/tests/helpers';

module('Unit | Route | addm', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:addm');
    assert.ok(route);
  });
});
