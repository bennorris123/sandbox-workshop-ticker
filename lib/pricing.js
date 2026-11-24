// All money is handled as integer cents.

function applyDiscount(cents, percent) {
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
    throw new RangeError('percent must be a number from 0 to 100');
  }
  // Fractional percentages are allowed (e.g. 12.5%), but keep the existing
  // half-up rounding so whole-percent values such as applyDiscount(1001, 50)
  // still round to 501 instead of flooring to 500.
  return Math.round((cents * (100 - percent)) / 100);
}

function formatCents(cents) {
  return '$' + (cents / 100).toFixed(2);
}

module.exports = { applyDiscount, formatCents };
