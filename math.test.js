const test = require('node:test');
const assert = require('node:assert');
const { add } = require('./math');

test('add returns the sum', () => {
  assert.strictEqual(add(2, 3), 5);
});
