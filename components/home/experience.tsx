import { ArrowUpRight } from 'lucide-react';
import { Bullets, Chips, Section } from '@/components/home/primitives';
import { experience } from '@/content/experience';
import { t } from '@/content/types';
import { uiHome } from '@/content/ui-home';
import type { Locale, Messages } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type ExperienceProps = { lang: Locale; messages: Messages };

export function Experience({ lang, messages }: ExperienceProps) {
  return (
    <Section
      id="experience"
      index="02"
      title={messages.sections.experience.title}
      tag={messages.sections.experience.tag}
    >
      <ol
        aria-label={t(uiHome.experience.list, lang)}
        className="relative before:absolute before:top-1.5 before:bottom-1.5 before:left-[5px] before:w-px before:bg-border"
      >
        {experience.map((job) => (
          <li
            key={job.slug}
            className="relative grid gap-1.5 pb-8 last:pb-0 min-[900px]:grid-cols-[150px_minmax(0,1fr)] min-[900px]:gap-7"
          >
            <div className="flex items-center gap-3 self-start pt-[3px]">
              <span
                aria-hidden="true"
                className={cn(
                  'relative z-[1] size-[11px] flex-none rounded-full border',
                  job.current ? 'border-foreground bg-foreground' : 'border-muted-foreground bg-background'
                )}
              />
              <span className="font-mono text-xs text-muted-foreground">
                {t(job.period, lang)}
                {job.current ? <span className="sr-only"> ({messages.experience.current})</span> : null}
              </span>
            </div>
            <div className="min-w-0 pl-[23px] min-[900px]:pl-0">
              <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-pretty">
                {t(job.role, lang)} <span className="font-normal text-muted-foreground">· {job.org}</span>
              </h3>
              <p className="mt-1 mb-2.5 max-w-[720px] text-[14.5px] text-pretty">{t(job.summary, lang)}</p>
              <Bullets items={job.bullets.map((bullet) => t(bullet, lang))} />
              <Chips items={job.stack} note={job.stackNote ? t(job.stackNote, lang) : undefined} />
              {job.link ? (
                <a
                  href={job.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex min-h-11 items-center gap-1.5 font-mono text-xs font-medium underline underline-offset-[3px] sm:min-h-0"
                >
                  {job.link.label}
                  <ArrowUpRight className="size-[13px]" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
