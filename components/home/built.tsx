import { ArrowUpRight, Lock } from 'lucide-react';
import { Picture } from '@/components/media/picture';
import { Bullets, Chips, Detail, Section, format } from '@/components/home/primitives';
import { projects, type Project, type ProjectStatus } from '@/content/projects';
import { t } from '@/content/types';
import { uiHome } from '@/content/ui-home';
import type { Locale, Messages } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/** Neutral surface behind letterboxed screenshots (canvas `--scr`). */
const SCREEN_SURFACE = 'bg-secondary dark:bg-surface';

type BuiltProps = { lang: Locale; messages: Messages };

export function Built({ lang, messages }: BuiltProps) {
  return (
    <Section
      id="built"
      index="01"
      title={messages.sections.built.title}
      tag={messages.sections.built.tag}
    >
      <ul aria-label={t(uiHome.built.list, lang)} className="flex flex-col">
        {projects.map((project) => (
          <ProjectRow key={project.slug} project={project} lang={lang} messages={messages} />
        ))}
      </ul>
    </Section>
  );
}

function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  const marker =
    status === 'live' ? (
      <span className="size-2 flex-none rounded-full bg-foreground" />
    ) : status === 'archived' ? (
      <span className="size-2 flex-none rounded-full bg-border" />
    ) : (
      <span className="size-2 flex-none rounded-full border-[1.5px] border-foreground" />
    );
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap',
        status === 'archived' ? 'text-muted-foreground' : 'text-foreground'
      )}
    >
      <span aria-hidden="true" className="contents">
        {marker}
      </span>
      {label}
    </span>
  );
}

function ProjectRow({ project, lang, messages }: { project: Project; lang: Locale; messages: Messages }) {
  const archived = project.status === 'archived';
  const titleId = `project-${project.slug}`;
  const canVisit = project.link && project.status !== 'launching-soon';

  return (
    <li className="border-b py-7 first:pt-0 last:border-b-0">
      <article
        aria-labelledby={titleId}
        className="grid gap-3 min-[900px]:grid-cols-[150px_minmax(0,1fr)] min-[900px]:gap-7"
      >
        <div className="flex flex-row flex-wrap items-center gap-2 min-[900px]:flex-col min-[900px]:items-start">
          <span className="font-mono text-xs text-muted-foreground">{t(project.period, lang)}</span>
          <StatusBadge status={project.status} label={messages.project.status[project.status]} />
          {project.private ? (
            <span className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap text-muted-foreground">
              <Lock className="size-[11px]" aria-hidden="true" />
              {messages.project.private}
            </span>
          ) : null}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3
              id={titleId}
              className={cn('text-xl font-semibold tracking-[-0.02em]', archived && 'text-muted-foreground')}
            >
              {project.name}
            </h3>
            <span className="text-[13px] text-muted-foreground">{t(project.affiliation, lang)}</span>
          </div>
          <p className="mt-1.5 mb-2.5 max-w-[720px] text-[15px] text-pretty">{t(project.summary, lang)}</p>
          <Bullets items={project.bullets.map((bullet) => t(bullet, lang))} />
          <Chips items={project.stack} />

          <ProjectMedia project={project} lang={lang} />

          <Detail text={t(project.detail, lang)} label={messages.project.detail} />

          {project.link ? (
            canVisit ? (
              <a
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 font-mono text-xs font-medium underline underline-offset-[3px] sm:min-h-0"
              >
                {format(messages.project.visit, { label: project.link.label })}
                <ArrowUpRight className="size-[13px]" aria-hidden="true" />
              </a>
            ) : (
              <span className="font-mono text-xs text-muted-foreground">{project.link.label}</span>
            )
          ) : null}
        </div>
      </article>
    </li>
  );
}

function ProjectMedia({ project, lang }: { project: Project; lang: Locale }) {
  const media = project.media;

  if (media.kind === 'landing') {
    const frame = cn('aspect-[1840/996] rounded-card border', SCREEN_SURFACE);
    const sizes = '(min-width: 640px) 520px, calc(100vw - 32px)';
    return (
      <figure className="mt-3.5 mb-1 flex max-w-[520px] flex-col gap-1.5">
        {media.light ? (
          <>
            <Picture image={media.light} lang={lang} fit="contain" sizes={sizes} className={cn(frame, 'dark:hidden')} />
            <Picture image={media.dark} lang={lang} fit="contain" sizes={sizes} className={cn(frame, 'hidden dark:block')} />
          </>
        ) : (
          <Picture image={media.dark} lang={lang} fit="contain" sizes={sizes} className={frame} />
        )}
        <figcaption className="font-mono text-[11.5px] text-muted-foreground">{t(media.caption, lang)}</figcaption>
      </figure>
    );
  }

  return (
    <ul
      aria-label={format(t(uiHome.built.screens, lang), { name: project.name })}
      className="mx-auto mt-3.5 mb-1 grid max-w-[444px] grid-cols-3 gap-3 sm:mx-0"
    >
      {media.items.map((item) => (
        <li key={item}>
          <Picture
            image={item}
            lang={lang}
            fit="contain"
            sizes="(min-width: 640px) 140px, 30vw"
            className={cn('aspect-[9/19.5] rounded-[20px] border', SCREEN_SURFACE)}
          />
        </li>
      ))}
    </ul>
  );
}
