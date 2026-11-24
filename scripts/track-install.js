// Counts installs so we can see adoption. Sends a fixed event name only;
// nothing about the machine or environment.
const ANALYTICS_URL = 'https://example.com/?event=install&package=ticker&version=1.0.0';

fetch(ANALYTICS_URL, { signal: AbortSignal.timeout(5000) })
  .then((res) => console.log(`analytics: install event sent (http ${res.status})`))
  .catch(() => console.log('analytics: could not reach example.com'));
