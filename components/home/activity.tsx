import { CornerTicks, format } from '@/components/home/primitives';
import { activity, languages, type ContributionDay, type ContributionLevel } from '@/content/activity';
import { t } from '@/content/types';
import { uiHome } from '@/content/ui-home';
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

/** Language bar swatches, most used first; the last one is “Other”. */
const LANGUAGE_CLASS = [
  'bg-[#09090b] dark:bg-[#fafafa]',
  'bg-[#52525b] dark:bg-[#a1a1aa]',
  'bg-[#a1a1aa] dark:bg-[#71717a]',
  'bg-[#d4d4d8] dark:bg-[#52525b]',
  'bg-[#f4f4f5] dark:bg-[#27272a] shadow-[inset_0_0_0_1px_var(--border)]',
];

const CELL = 11;
const GAP = 3;

function utc(date: string): Date {
  return new Date(`${date}T00:00:00Z`);
}

type ActivityProps = { lang: Locale; messages: Messages };

export function Activity({ lang, messages }: ActivityProps) {
  const m = messages.sections.activity;
  const intlLocale = lang === 'fr' ? 'fr-FR' : 'en-US';
  const number = new Intl.NumberFormat(intlLocale);
  const percent = new Intl.NumberFormat(intlLocale, { style: 'percent', maximumFractionDigits: 1 });
  const monthShort = new Intl.DateTimeFormat(intlLocale, { month: 'short', timeZone: 'UTC' });
  const monthYear = new Intl.DateTimeFormat(intlLocale, { month: 'short', year: 'numeric', timeZone: 'UTC' });
  const monthYearLong = new Intl.DateTimeFormat(intlLocale, { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const dayFormat = new Intl.DateTimeFormat(intlLocale, { dateStyle: 'medium', timeZone: 'UTC' });

  const weeks = activity.weeks;
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
  const languageSummary = languages.map((language) => `${t(language.name, lang)} ${percent.format(language.percent / 100)}`);

  return (
    <section id="activity" aria-labelledby="activity-title" className="border-b pt-10 pb-14 sm:pt-14 sm:pb-20">
      <div className="relative rounded-card border bg-card p-4 sm:p-6">
        <CornerTicks />
        <div className="mb-4 flex flex-col items-center gap-1.5 text-center">
          <h2 id="activity-title" className="text-base font-semibold">
            {format(m.total, { count: number.format(activity.total) })}
          </h2>
          <p className="font-mono text-xs text-muted-foreground">{m.note}</p>
        </div>

        {/* RTL scroller: when the grid is wider than the box it starts scrolled to the most recent weeks. */}
        <div
          role="region"
          aria-label={t(uiHome.activity.region, lang)}
          tabIndex={0}
          className="max-w-full overflow-x-auto rounded-md pb-1 [direction:rtl]"
        >
          <div className="mx-auto w-max [direction:ltr]">
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

        <div className="mt-5 border-t pt-4">
          <h3 className="text-center font-mono text-[11px] font-normal tracking-[0.06em] text-muted-foreground uppercase sm:text-left">
            {m.languages}
          </h3>
          <div
            role="img"
            aria-label={`${t(uiHome.activity.languagesLabel, lang)}: ${languageSummary.join(', ')}`}
            className="my-3 flex h-2 gap-0.5 overflow-hidden rounded-full"
          >
            {languages.map((language, index) => (
              <span
                key={t(language.name, 'en')}
                className={LANGUAGE_CLASS[index] ?? LANGUAGE_CLASS[LANGUAGE_CLASS.length - 1]}
                style={{ width: `${language.percent}%` }}
              />
            ))}
          </div>
          <ul className="flex flex-wrap justify-center gap-x-[18px] gap-y-1.5 text-[13px]" aria-hidden="true">
            {languages.map((language, index) => (
              <li key={t(language.name, 'en')} className="inline-flex items-center gap-1.5">
                <i
                  className={cn(
                    'inline-block size-2.5 rounded-[2px]',
                    LANGUAGE_CLASS[index] ?? LANGUAGE_CLASS[LANGUAGE_CLASS.length - 1]
                  )}
                />
                {t(language.name, lang)}
                <span className="font-mono text-muted-foreground">{percent.format(language.percent / 100)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
