/**
 * Cloudflare Pages Function for `/api/activity`: the last year of public GitHub contributions, in the same
 * shape as `content/activity.generated.json` (mapping ported from `scripts/github-activity.mjs`).
 * Cached at the edge with the Workers Cache API; the page falls back to the committed snapshot on any error.
 */
type Env = { GITHUB_TOKEN: string };

const USER = 'naderchatti';
const TIMEOUT_MS = 5000;
const CACHE_CONTROL = 'public, max-age=3600, s-maxage=21600, stale-while-revalidate=86400';

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;

type Calendar = {
  totalContributions: number;
  weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[];
};

type GraphQLResponse = {
  data?: { user?: { contributionsCollection?: { contributionCalendar?: Calendar } } | null };
};

function json(body: unknown, status: number, cacheControl: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': cacheControl },
  });
}

async function fetchCalendar(token: string): Promise<Calendar | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'naderchatti-portfolio',
      },
      body: JSON.stringify({ query: QUERY, variables: { login: USER } }),
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const body = (await response.json()) as GraphQLResponse;
    const calendar = body.data?.user?.contributionsCollection?.contributionCalendar;
    return calendar && Array.isArray(calendar.weeks) ? calendar : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export const onRequest: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD', 'Cache-Control': 'no-store' } });
  }
  if (!env.GITHUB_TOKEN) return json({ error: 'not configured' }, 503, 'no-store');

  const cache = caches.default;
  const cacheKey = new Request(new URL(request.url).toString(), { method: 'GET' });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const calendar = await fetchCalendar(env.GITHUB_TOKEN);
  if (!calendar) return json({ error: 'upstream unavailable' }, 502, 'no-store');

  const response = json(
    {
      user: USER,
      generatedAt: new Date().toISOString(),
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((week) => ({
        days: week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: LEVELS[day.contributionLevel] ?? 0,
        })),
      })),
    },
    200,
    CACHE_CONTROL
  );
  waitUntil(cache.put(cacheKey, response.clone()));
  return response;
};
