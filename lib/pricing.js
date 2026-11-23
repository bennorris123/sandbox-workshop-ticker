// All money is handled as integer cents.

function applyDiscount(cents, percent) {
  if (typeof percent !== 'number' || percent < 0 || percent > 100) {
    throw new RangeError('percent must be a number from 0 to 100');
  }
  // Support fractional percentages (e.g. 12.5%). Floor so we never overcharge.
  return Math.floor(cents - (cents * percent) / 100);
}

function formatCents(cents) {
  return '$' + (cents / 100).toFixed(2);
}

module.exports = { applyDiscount, formatCents };
