/**
 * Parses GitHub's public contributions fragment (`https://github.com/users/<user>/contributions`) into the
 * shape of `content/activity.generated.json`. Unlike the GraphQL API with a public-read-only token, this page
 * includes private contributions as anonymous counts, so its total matches the public profile graph.
 * Plain string parsing (no DOM): shared by `functions/api/activity.ts` (Workers) and `scripts/github-activity.mjs`.
 */
type ParsedDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type ParsedCalendar = { total: number; weeks: { days: ParsedDay[] }[] };

export const contributionsUrl = (user: string) => `https://github.com/users/${encodeURIComponent(user)}/contributions`;

const CELL = /<td\b[^>]*\bclass="ContributionCalendar-day"[^>]*>/g;
const TOOLTIP = /<tool-tip\b([^>]*)>([^<]*)<\/tool-tip>/g;
const TOTAL = /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/;

function attr(tag: string, name: string): string | undefined {
  return new RegExp(`\\b${name}="([^"]*)"`).exec(tag)?.[1];
}

/** Returns null when the page does not look like a contributions calendar. */
export function parseContributions(html: string): ParsedCalendar | null {
  const totalMatch = TOTAL.exec(html);
  if (!totalMatch) return null;
  const total = Number(totalMatch[1].replace(/,/g, ''));
  if (!Number.isInteger(total) || total < 0) return null;

  const counts = new Map<string, number>();
  for (const [, attrs, text] of html.matchAll(TOOLTIP)) {
    const id = attr(attrs, 'for');
    if (!id) continue;
    const trimmed = text.trim();
    if (/^No contributions\b/.test(trimmed)) counts.set(id, 0);
    else {
      const match = /^([\d,]+)\s+contributions?\b/.exec(trimmed);
      if (match) counts.set(id, Number(match[1].replace(/,/g, '')));
    }
  }

  const days: ParsedDay[] = [];
  for (const [tag] of html.matchAll(CELL)) {
    const date = attr(tag, 'data-date');
    const id = attr(tag, 'id');
    const level = Number(attr(tag, 'data-level'));
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !id) return null;
    const count = counts.get(id);
    if (count === undefined || !(level === 0 || level === 1 || level === 2 || level === 3 || level === 4)) return null;
    days.push({ date, count, level });
  }
  if (days.length === 0) return null;
  days.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  // Weeks run Sunday → Saturday, like GitHub's calendar (the first and last may be partial).
  const weeks: { days: ParsedDay[] }[] = [];
  for (const day of days) {
    const sunday = new Date(`${day.date}T00:00:00Z`).getUTCDay() === 0;
    if (sunday || weeks.length === 0) weeks.push({ days: [] });
    weeks[weeks.length - 1].days.push(day);
  }
  return { total, weeks };
}
