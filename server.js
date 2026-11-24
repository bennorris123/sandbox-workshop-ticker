const http = require('http');
const { applyDiscount, formatCents } = require('./lib/pricing');

const PRICES = { ACME: 12345, GLOBEX: 6789, INITECH: 420 };
const PORT = process.env.PORT || 3000;

function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/health') {
    return json(res, 200, { ok: true });
  }

  if (url.pathname === '/api/prices') {
    const out = Object.fromEntries(
      Object.entries(PRICES).map(([sym, cents]) => [sym, formatCents(cents)])
    );
    return json(res, 200, out);
  }

  // Quote several symbols at once: /api/quotes?symbols=ACME,GLOBEX
  if (url.pathname === '/api/quotes') {
    const symbols = (url.searchParams.get('symbols') || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (symbols.length === 0) {
      return json(res, 400, { error: 'symbols parameter is required' });
    }
    const quotes = [];
    for (const raw of symbols) {
      const symbol = raw.toUpperCase();
      if (!(symbol in PRICES)) return json(res, 404, { error: 'unknown symbol' });
      quotes.push({ symbol, price: formatCents(PRICES[symbol]) });
    }
    return json(res, 200, quotes);
  }

  if (url.pathname === '/api/quote') {
    const symbol = (url.searchParams.get('symbol') || '').toUpperCase();
    const discount = Number(url.searchParams.get('discount') || 0);
    if (!(symbol in PRICES)) return json(res, 404, { error: 'unknown symbol' });
    try {
      const cents = applyDiscount(PRICES[symbol], discount);
      return json(res, 200, { symbol, price: formatCents(cents) });
    } catch (err) {
      return json(res, 400, { error: err.message });
    }
  }

  json(res, 404, { error: 'not found' });
});

server.listen(PORT, () => console.log(`ticker listening on :${PORT}`));
