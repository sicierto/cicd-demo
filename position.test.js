const test = require('node:test');
const assert = require('node:assert');
const { positionSize, targetPrice } = require('./public/position.js');

test('long: risking 1% of $10,000 with a $5 stop buys 20 tokens', () => {
  const r = positionSize(10000, 1, 100, 95);
  assert.strictEqual(r.riskAmount, 100);
  assert.strictEqual(r.tokens, 20);
  assert.strictEqual(r.positionValue, 2000);
  assert.strictEqual(r.direction, 'long');
});

test('short: a stop above entry is treated as a short', () => {
  const r = positionSize(10000, 1, 100, 105);
  assert.strictEqual(r.tokens, 20);
  assert.strictEqual(r.direction, 'short');
});

test('flags when the position needs leverage', () => {
  const r = positionSize(1000, 2, 100, 99);
  assert.strictEqual(r.positionValue, 2000);
  assert.strictEqual(r.leverageNeeded, 2);
});

test('profit targets move the right way for longs and shorts', () => {
  assert.strictEqual(targetPrice(100, 95, 2), 110);
  assert.strictEqual(targetPrice(100, 105, 2), 90);
});

test('rejects bad input', () => {
  assert.throws(() => positionSize(10000, 1, 100, 100));
  assert.throws(() => positionSize(0, 1, 100, 95));
  assert.throws(() => positionSize(10000, 150, 100, 95));
  assert.throws(() => positionSize(10000, 1, NaN, 95));
});
