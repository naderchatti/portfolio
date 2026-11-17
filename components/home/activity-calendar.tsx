'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
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
/** Space between a cell and the tooltip, and the tooltip's minimum margin from the viewport edges. */
const TIP_OFFSET = 6;
const TIP_MARGIN = 8;

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

/** Static snapshot first, then swapped for the live `/api/activity` data (Pages Function) when it validates
 * and its total is at least 80% of the snapshot's. */
export function ActivityCalendar({ lang, m, regionLabel, initial }: ActivityCalendarProps) {
  const [calendar, setCalendar] = useState<Calendar>(initial);
  const [live, setLive] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const tooltip = useRef<HTMLDivElement>(null);
  // Roving tabindex: the one focusable day (defaults to the most recent). `tip` is the day the tooltip describes.
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [tip, setTip] = useState<string | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    const controller = new AbortController();
    fetch('/api/activity', { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then((response) => (response.ok ? response.json() : null))
      .then((body: unknown) => {
        const parsed = parseCalendar(body);
        // Guard against a degraded upstream (e.g. private contributions missing): keep the snapshot.
        if (!parsed || parsed.total < initial.total * 0.8) return;
        // Same number of columns as the snapshot, so the swap never shifts the layout.
        const length = initial.weeks.length;
        setCalendar({ total: parsed.total, weeks: parsed.weeks.length > length ? parsed.weeks.slice(-length) : parsed.weeks });
        setLive(true);
        setTip(null);
      })
      .catch(() => {
        // Silent fallback: keep the snapshot.
      });
    return () => controller.abort();
  }, [initial.weeks.length, initial.total]);

  // Keep the RTL scroller pinned to the most recent weeks after the swap (scrollLeft 0 = right edge in RTL).
  useEffect(() => {
    if (live && scroller.current) scroller.current.scrollLeft = 0;
  }, [live]);

  const intlLocale = lang === 'fr' ? 'fr-FR' : 'en-US';
  const number = new Intl.NumberFormat(intlLocale);
  const monthShort = new Intl.DateTimeFormat(intlLocale, { month: 'short', timeZone: 'UTC' });
  const monthYear = new Intl.DateTimeFormat(intlLocale, { month: 'short', year: 'numeric', timeZone: 'UTC' });
  const monthYearLong = new Intl.DateTimeFormat(intlLocale, { month: 'long', year: 'numeric', timeZone: 'UTC' });
  // "Monday, November 16" / "lundi 16 novembre", like GitHub's own tooltip.
  const dayFormat = new Intl.DateTimeFormat(intlLocale, { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });

  const describe = (cell: ContributionDay) => {
    const date = dayFormat.format(utc(cell.date));
    if (cell.count === 0) return format(m.dayNone, { date });
    if (cell.count === 1) return format(m.dayOne, { date });
    return format(m.day, { count: number.format(cell.count), date });
  };

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

  // Cells are column-major (index = column * 7 + weekday); the grid renders them as 7 weekday rows.
  const indexOf = (date: string | null) => (date ? cells.findIndex((cell) => cell?.date === date) : -1);
  const activeIndex = indexOf(activeDate) >= 0 ? indexOf(activeDate) : cells.length - 1;
  const tipCell = cells[indexOf(tip)] ?? null;

  const cellElement = (date: string) => grid.current?.querySelector<HTMLElement>(`[data-date="${date}"]`) ?? null;

  // One shared tooltip, placed above the described cell (below when there is no room), clamped to the box and viewport.
  const place = useCallback(() => {
    const tipNode = tooltip.current;
    const wrapNode = wrapper.current;
    const scrollNode = scroller.current;
    const cellNode = tip ? (grid.current?.querySelector<HTMLElement>(`[data-date="${tip}"]`) ?? null) : null;
    if (!tipNode || !wrapNode || !scrollNode || !cellNode) return;
    const cellRect = cellNode.getBoundingClientRect();
    const wrapRect = wrapNode.getBoundingClientRect();
    const scrollRect = scrollNode.getBoundingClientRect();
    const hidden = cellRect.right <= scrollRect.left || cellRect.left >= scrollRect.right;
    tipNode.style.visibility = hidden ? 'hidden' : 'visible';
    const { width, height } = tipNode.getBoundingClientRect();
    const minLeft = Math.max(0, TIP_MARGIN - wrapRect.left);
    const maxLeft = Math.min(wrapRect.width, window.innerWidth - TIP_MARGIN - wrapRect.left) - width;
    const left = Math.min(Math.max(cellRect.left + cellRect.width / 2 - wrapRect.left - width / 2, minLeft), Math.max(minLeft, maxLeft));
    const above = cellRect.top - height - TIP_OFFSET >= TIP_MARGIN;
    const top = above ? cellRect.top - wrapRect.top - height - TIP_OFFSET : cellRect.bottom - wrapRect.top + TIP_OFFSET;
    tipNode.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
  }, [tip]);

  useLayoutEffect(() => {
    if (!tip) return;
    place();
    const scrollNode = scroller.current;
    window.addEventListener('resize', place);
    scrollNode?.addEventListener('scroll', place, { passive: true });
    return () => {
      window.removeEventListener('resize', place);
      scrollNode?.removeEventListener('scroll', place);
    };
  }, [tip, place, calendar]);

  // Esc hides the tooltip; a tap outside the grid dismisses a touch tooltip.
  useEffect(() => {
    if (!tip) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setTip(null);
    };
    const onDown = (event: globalThis.PointerEvent) => {
      if (!grid.current?.contains(event.target as Node)) setTip(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [tip]);

  const dateFromEvent = (target: EventTarget) =>
    (target instanceof Element ? target.closest<HTMLElement>('[data-date]')?.dataset.date : undefined) ?? null;

  const onPointerOver = (event: PointerEvent<HTMLDivElement>) => {
    const date = dateFromEvent(event.target);
    if (date) setTip(date);
  };

  const onPointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    // Touch keeps the tooltip until the next tap elsewhere; a mouse leaving the grid hides it.
    if (event.pointerType !== 'touch') setTip(null);
  };

  const focusIndex = (index: number) => {
    const cell = cells[index];
    if (!cell) return;
    setActiveDate(cell.date);
    cellElement(cell.date)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const row = activeIndex % 7;
    const column = Math.floor(activeIndex / 7);
    const firstIndex = cells.findIndex((cell) => cell !== null);
    let next: number | null = null;
    switch (event.key) {
      case 'ArrowUp':
        next = row > 0 ? activeIndex - 1 : null;
        break;
      case 'ArrowDown':
        next = row < 6 ? activeIndex + 1 : null;
        break;
      case 'ArrowLeft':
        next = column > 0 ? activeIndex - 7 : null;
        break;
      case 'ArrowRight':
        next = column < columns - 1 ? activeIndex + 7 : null;
        break;
      case 'Home':
        // Ctrl+Home: first day; Home: first day of this weekday row.
        next = event.ctrlKey ? firstIndex : row + 7 * (row < firstIndex ? 1 : 0);
        break;
      case 'End': {
        if (event.ctrlKey) next = cells.length - 1;
        else {
          let last = row + 7 * (columns - 1);
          if (last >= cells.length) last -= 7;
          next = last;
        }
        break;
      }
      case 'Escape':
        setTip(null);
        return;
      default:
        return;
    }
    event.preventDefault();
    if (next !== null && cells[next]) focusIndex(next);
  };

  return (
    <>
      <div className="mb-4 flex flex-col items-center gap-1.5 text-center">
        <h2 id="activity-title" className="text-base font-semibold">
          {format(m.total, { count: number.format(calendar.total) })}
        </h2>
        <p className="font-mono text-xs text-muted-foreground">{m.note}</p>
      </div>

      <div ref={wrapper} className="relative">
        {/* RTL scroller: when the grid is wider than the box it starts scrolled to the most recent weeks. */}
        <div
          ref={scroller}
          role="region"
          aria-label={regionLabel}
          className="max-w-full overflow-x-auto rounded-md p-1 [direction:rtl]"
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
              ref={grid}
              role="grid"
              aria-label={format(m.heatmapLabel, { from: monthYearLong.format(from), to: monthYearLong.format(to) })}
              className="flex flex-col"
              style={{ gap: GAP }}
              onPointerOver={onPointerOver}
              onPointerLeave={onPointerLeave}
              onKeyDown={onKeyDown}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setTip(null);
              }}
            >
              {Array.from({ length: 7 }, (_, row) => (
                <div key={row} role="row" className="flex" style={{ gap: GAP }}>
                  {Array.from({ length: columns }, (_, column) => {
                    const index = column * 7 + row;
                    const cell = cells[index];
                    if (!cell) return <span key={`blank-${index}`} role="presentation" className="block size-[11px] shrink-0" />;
                    return (
                      <span
                        key={cell.date}
                        role="gridcell"
                        data-date={cell.date}
                        tabIndex={index === activeIndex ? 0 : -1}
                        aria-label={describe(cell)}
                        onFocus={() => {
                          setActiveDate(cell.date);
                          setTip(cell.date);
                        }}
                        className={cn(
                          'block size-[11px] shrink-0 rounded-[2px] focus-visible:outline-offset-1',
                          LEVEL_CLASS[cell.level],
                          tip === cell.date && 'outline outline-1 outline-foreground/60 outline-offset-1'
                        )}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={tooltip}
          data-slot="activity-tooltip"
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-0 left-0 z-20 rounded-md bg-foreground px-2 py-1 text-xs whitespace-nowrap text-background shadow-md',
            !tipCell && 'hidden'
          )}
        >
          {tipCell ? describe(tipCell) : null}
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
