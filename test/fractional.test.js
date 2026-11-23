const test = require('node:test');
const assert = require('node:assert');
const { applyDiscount } = require('../lib/pricing');

test('supports fractional discounts', () => {
  assert.strictEqual(applyDiscount(1000, 12.5), 875);
});
