import { ActivityCalendar } from '@/components/home/activity-calendar';
import { CornerTicks } from '@/components/home/primitives';
import { activity, languages } from '@/content/activity';
import { t } from '@/content/types';
import { uiHome } from '@/content/ui-home';
import type { Locale, Messages } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/** Language bar swatches, most used first; the last one is “Other”. */
const LANGUAGE_CLASS = [
  'bg-[#09090b] dark:bg-[#fafafa]',
  'bg-[#52525b] dark:bg-[#a1a1aa]',
  'bg-[#a1a1aa] dark:bg-[#71717a]',
  'bg-[#d4d4d8] dark:bg-[#52525b]',
  'bg-[#f4f4f5] dark:bg-[#27272a] shadow-[inset_0_0_0_1px_var(--border)]',
];

type ActivityProps = { lang: Locale; messages: Messages };

export function Activity({ lang, messages }: ActivityProps) {
  const m = messages.sections.activity;
  const intlLocale = lang === 'fr' ? 'fr-FR' : 'en-US';
  const percent = new Intl.NumberFormat(intlLocale, { style: 'percent', maximumFractionDigits: 1 });
  const languageSummary = languages.map((language) => `${t(language.name, lang)} ${percent.format(language.percent / 100)}`);

  return (
    <section id="activity" aria-labelledby="activity-title" className="border-b pt-10 pb-14 sm:pt-14 sm:pb-20">
      <div className="relative rounded-card border bg-card p-4 sm:p-6">
        <CornerTicks />
        <ActivityCalendar
          lang={lang}
          m={m}
          regionLabel={t(uiHome.activity.region, lang)}
          initial={{ total: activity.total, weeks: activity.weeks }}
        />

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
