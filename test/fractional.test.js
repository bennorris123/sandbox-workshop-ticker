const test = require('node:test');
const assert = require('node:assert');
const { applyDiscount } = require('../lib/pricing');

test('supports fractional discounts', () => {
  assert.strictEqual(applyDiscount(1000, 12.5), 875);
});

test('rejects NaN', () => {
  assert.throws(() => applyDiscount(1000, NaN), RangeError);
});

test('keeps half-up rounding for whole percentages', () => {
  assert.strictEqual(applyDiscount(1001, 50), 501);
});
