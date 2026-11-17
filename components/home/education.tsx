import { Section } from '@/components/home/primitives';
import { education } from '@/content/education';
import { t } from '@/content/types';
import type { Locale, Messages } from '@/lib/i18n';

type EducationProps = { lang: Locale; messages: Messages };

export function Education({ lang, messages }: EducationProps) {
  return (
    <Section id="education" index="04" title={messages.sections.education.title}>
      <ul>
        {education.map((entry) => (
          <li
            key={`${entry.year}-${t(entry.degree, 'en')}`}
            className="grid gap-1 border-b py-3.5 last:border-b-0 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-5"
          >
            <span className="font-mono text-xs text-muted-foreground sm:pt-0.5">{entry.year}</span>
            <div>
              <p className="text-pretty">
                <span className="font-semibold">{t(entry.degree, lang)}</span> — {t(entry.field, lang)}{' '}
                <span className="text-muted-foreground">· {entry.school}</span>
              </p>
              {entry.project ? (
                <p className="mt-1 flex flex-wrap items-baseline gap-x-2 text-[13px] text-muted-foreground">
                  <span className="font-mono">{entry.project.year}</span>
                  <span className="min-w-0 flex-1 basis-60">{t(entry.project.text, lang)}</span>
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
