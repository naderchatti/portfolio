'use client';

import { useEffect, useRef, useState } from 'react';
import { format } from '@/components/home/primitives';
import type { ContributionDay, ContributionLevel } from '@/content/activity';
import type { Locale, Messages } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/** Heatmap shades per level, light then dark (from the V2 canvas). */
const LEVEL_CLASS: Record<ContributionLevel, string> = {
  0: 'bg-[#f4f4f5] dark:bg-[#18181b]',
  1: 'bg-[#d4d4d8] dark:bg-[#3f3f46]',
  2: 'bg-[#a1a1aa] dark:bg-[#71717a]',
  3: 'bg-[#52525b] dark:bg-[#a1a1aa]',
  4: 'bg-[#09090b] dark:bg-[#fafafa]',
};

const CELL = 11;
const GAP = 3;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

type Calendar = { total: number; weeks: { days: ContributionDay[] }[] };

function utc(date: string): Date {
  return new Date(`${date}T00:00:00Z`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isDay(value: unknown): value is ContributionDay {
  if (!isRecord(value)) return false;
  const { date, count, level } = value;
  return (
    typeof date === 'string' &&
    DATE.test(date) &&
    typeof count === 'number' &&
    Number.isInteger(count) &&
    count >= 0 &&
    (level === 0 || level === 1 || level === 2 || level === 3 || level === 4)
  );
}

/** Accepts `/api/activity` only when it has the snapshot's shape and roughly the same span (52–54 weeks). */
function parseCalendar(value: unknown): Calendar | null {
  if (!isRecord(value) || typeof value.total !== 'number' || !Array.isArray(value.weeks)) return null;
  const weeks = value.weeks;
  if (weeks.length < 52 || weeks.length > 54) return null;
  const valid = weeks.every(
    (week: unknown) =>
      isRecord(week) && Array.isArray(week.days) && week.days.length > 0 && week.days.length <= 7 && week.days.every(isDay)
  );
  return valid ? { total: value.total, weeks: weeks as Calendar['weeks'] } : null;
}

type ActivityCalendarProps = {
  lang: Locale;
  m: Messages['sections']['activity'];
  regionLabel: string;
  initial: Calendar;
};

/** Static snapshot first, then swapped for the live `/api/activity` data (Pages Function) when it validates. */
export function ActivityCalendar({ lang, m, regionLabel, initial }: ActivityCalendarProps) {
  const [calendar, setCalendar] = useState<Calendar>(initial);
  const [live, setLive] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    const controller = new AbortController();
    fetch('/api/activity', { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then((response) => (response.ok ? response.json() : null))
      .then((body: unknown) => {
        const parsed = parseCalendar(body);
        if (!parsed) return;
        // Same number of columns as the snapshot, so the swap never shifts the layout.
        const length = initial.weeks.length;
        setCalendar({ total: parsed.total, weeks: parsed.weeks.length > length ? parsed.weeks.slice(-length) : parsed.weeks });
        setLive(true);
      })
      .catch(() => {
        // Silent fallback: keep the snapshot.
      });
    return () => controller.abort();
  }, [initial.weeks.length]);

  // Keep the RTL scroller pinned to the most recent weeks after the swap (scrollLeft 0 = right edge in RTL).
  useEffect(() => {
    if (live && scroller.current) scroller.current.scrollLeft = 0;
  }, [live]);

  const intlLocale = lang === 'fr' ? 'fr-FR' : 'en-US';
  const number = new Intl.NumberFormat(intlLocale);
  const monthShort = new Intl.DateTimeFormat(intlLocale, { month: 'short', timeZone: 'UTC' });
  const monthYear = new Intl.DateTimeFormat(intlLocale, { month: 'short', year: 'numeric', timeZone: 'UTC' });
  const monthYearLong = new Intl.DateTimeFormat(intlLocale, { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const dayFormat = new Intl.DateTimeFormat(intlLocale, { dateStyle: 'medium', timeZone: 'UTC' });

  const weeks = calendar.weeks;
  const firstDay = weeks[0]?.days[0];
  const lastWeek = weeks[weeks.length - 1];
  const lastDay = lastWeek?.days[lastWeek.days.length - 1];

  // Leading blanks so the first column starts on Sunday, like GitHub.
  const leading = firstDay ? utc(firstDay.date).getUTCDay() : 0;
  const cells: (ContributionDay | null)[] = [
    ...Array.from({ length: leading }, () => null),
    ...weeks.flatMap((week) => week.days),
  ];
  const columns = Math.ceil(cells.length / 7);

  // Month label on the first column of each month (skipping the last two to avoid clipping).
  const months: string[] = [];
  let previousMonth = -1;
  for (let column = 0; column < columns; column++) {
    const day = cells.slice(column * 7, column * 7 + 7).find((cell) => cell !== null);
    const month = day ? utc(day.date).getUTCMonth() : previousMonth;
    months.push(day && month !== previousMonth && column < columns - 2 ? monthShort.format(utc(day.date)) : '');
    previousMonth = month;
  }

  const from = firstDay ? utc(firstDay.date) : new Date();
  const to = lastDay ? utc(lastDay.date) : new Date();
  const gridWidth = columns * CELL + (columns - 1) * GAP;
  const fade = live ? 'motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500' : undefined;

  return (
    <>
      <div className="mb-4 flex flex-col items-center gap-1.5 text-center">
        <h2 id="activity-title" className="text-base font-semibold">
          {format(m.total, { count: number.format(calendar.total) })}
        </h2>
        <p className="font-mono text-xs text-muted-foreground">{m.note}</p>
      </div>

      {/* RTL scroller: when the grid is wider than the box it starts scrolled to the most recent weeks. */}
      <div
        ref={scroller}
        role="region"
        aria-label={regionLabel}
        tabIndex={0}
        className="max-w-full overflow-x-auto rounded-md pb-1 [direction:rtl]"
      >
        <div key={live ? 'live' : 'snapshot'} className={cn('mx-auto w-max [direction:ltr]', fade)}>
          <div
            aria-hidden="true"
            className="grid h-4 font-mono text-[11px] whitespace-nowrap text-muted-foreground"
            style={{ gridTemplateColumns: `repeat(${columns}, ${CELL}px)`, columnGap: GAP, width: gridWidth }}
          >
            {months.map((label, index) => (
              <span key={index}>{label}</span>
            ))}
          </div>
          <div
            role="img"
            aria-label={format(m.heatmapLabel, { from: monthYearLong.format(from), to: monthYearLong.format(to) })}
            className="grid grid-flow-col"
            style={{
              gridTemplateRows: `repeat(7, ${CELL}px)`,
              gridAutoColumns: `${CELL}px`,
              gap: GAP,
            }}
          >
            {cells.map((cell, index) =>
              cell ? (
                <span
                  key={cell.date}
                  title={format(m.day, { count: number.format(cell.count), date: dayFormat.format(utc(cell.date)) })}
                  className={cn('block rounded-[2px]', LEVEL_CLASS[cell.level])}
                />
              ) : (
                <span key={`blank-${index}`} />
              )
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
        <span className="font-mono text-muted-foreground">
          {monthYear.format(from)} — {monthYear.format(to)}
        </span>
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="text-muted-foreground">{m.less}</span>
          <span className="flex gap-[3px]">
            {([0, 1, 2, 3, 4] as const).map((level) => (
              <span key={level} className={cn('size-[11px] rounded-[2px]', LEVEL_CLASS[level])} />
            ))}
          </span>
          <span className="text-muted-foreground">{m.more}</span>
        </span>
      </div>
    </>
  );
}
