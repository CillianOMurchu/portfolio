import { module, test } from 'qunit';
import { setupTest } from 'portfolio/tests/helpers';

module('Unit | Service | spotify', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:spotify');
    assert.ok(service);
  });
});
