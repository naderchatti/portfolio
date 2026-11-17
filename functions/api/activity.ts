/**
 * Cloudflare Pages Function for `/api/activity`: the last year of GitHub contributions, in the same shape as
 * `content/activity.generated.json`, parsed from the public profile calendar (no token; private contributions
 * are included as anonymous counts, matching the profile graph).
 * Cached at the edge with the Workers Cache API; the page falls back to the committed snapshot on any error.
 */
import { contributionsUrl, parseContributions, type ParsedCalendar } from '../../lib/activity/parse-contributions';

const USER = 'naderchatti';
const TIMEOUT_MS = 5000;
const CACHE_CONTROL = 'public, max-age=3600, s-maxage=21600, stale-while-revalidate=86400';

function json(body: unknown, status: number, cacheControl: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': cacheControl },
  });
}

async function fetchCalendar(): Promise<ParsedCalendar | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(contributionsUrl(USER), {
      headers: { Accept: 'text/html', 'User-Agent': 'naderchatti-portfolio' },
      signal: controller.signal,
    });
    if (!response.ok) return null;
    return parseContributions(await response.text());
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export const onRequest: PagesFunction = async ({ request, waitUntil }) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD', 'Cache-Control': 'no-store' } });
  }

  const cache = caches.default;
  // Versioned key so entries cached by the previous (GraphQL) implementation are never served.
  const keyUrl = new URL(request.url);
  keyUrl.searchParams.set('v', 'html-1');
  const cacheKey = new Request(keyUrl.toString(), { method: 'GET' });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const calendar = await fetchCalendar();
  if (!calendar) return json({ error: 'upstream unavailable' }, 502, 'no-store');

  const response = json(
    {
      user: USER,
      generatedAt: new Date().toISOString(),
      total: calendar.total,
      weeks: calendar.weeks,
    },
    200,
    CACHE_CONTROL
  );
  waitUntil(cache.put(cacheKey, response.clone()));
  return response;
};
