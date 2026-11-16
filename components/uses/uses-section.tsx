import { FramedImage } from '@/components/ui/framed-image';
import { PageSection } from '@/components/ui/page-section';
import { RgbLoop } from '@/components/uses/rgb-loop';
import { SpecList } from '@/components/uses/spec-list';
import { getVideo } from '@/content/media';
import { t } from '@/content/types';
import { uiUses } from '@/content/ui-uses';
import type { UsesFigure, UsesSection as UsesSectionData } from '@/content/uses';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const captionClass = 'font-mono text-xs text-muted-foreground';

export function UsesSection({ section, lang }: { section: UsesSectionData; lang: Locale }) {
  const title = t(section.title, lang);
  const spec = <SpecList items={section.items} lang={lang} />;

  let body = spec;
  if (section.video) {
    const video = getVideo(section.video.name);
    body = (
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[260px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
        <figure className="flex w-full flex-col gap-2 max-md:mx-auto max-md:max-w-[300px]">
          <RgbLoop
            src={video.src}
            poster={video.poster}
            width={video.width}
            height={video.height}
            label={t(section.video.label, lang)}
            playLabel={t(uiUses.playVideo, lang)}
            pauseLabel={t(uiUses.pauseVideo, lang)}
          />
          <figcaption className={captionClass}>{t(section.video.caption, lang)}</figcaption>
        </figure>
        <div className="min-w-0">
          {spec}
        </div>
        {section.gallery ? <Gallery steps={section.gallery} lang={lang} /> : null}
      </div>
    );
  } else if (section.figures && section.figures.length > 0) {
    const [first, ...rest] = section.figures;
    body = (
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,1fr)_300px] lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
        {spec}
        <div className="flex flex-col gap-2.5">
          {first ? <Figure figure={first} lang={lang} group={`uses-${section.id}`} /> : null}
          {rest.map((figure) => (
            <Figure
              key={figure.image}
              figure={figure}
              lang={lang}
              group={`uses-${section.id}`}
              className="w-1/2 max-sm:w-full"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <PageSection id={section.id} title={title} path={`uses/${section.id}`} size="lg" className="py-14">
      {body}
    </PageSection>
  );
}

function Figure({
  figure,
  lang,
  group,
  className,
}: {
  figure: UsesFigure;
  lang: Locale;
  group: string;
  className?: string;
}) {
  return (
    <figure className={cn('flex flex-col gap-2', className)}>
      <FramedImage
        name={figure.image}
        lang={lang}
        ratio="4/3"
        sizes="(min-width: 1024px) 360px, (min-width: 768px) 300px, 100vw"
        zoom={{ group, caption: t(figure.caption, lang) }}
      />
      <figcaption className={captionClass}>{t(figure.caption, lang)}</figcaption>
    </figure>
  );
}

function Gallery({ steps, lang }: { steps: readonly UsesFigure[]; lang: Locale }) {
  return (
    <ol
      aria-label={t(uiUses.gallery, lang)}
      className="grid grid-cols-2 gap-x-3 gap-y-4 md:col-span-2 lg:grid-cols-4"
    >
      {steps.map((step) => (
        <li key={step.image}>
          <figure className="flex flex-col gap-2">
            <FramedImage
              name={step.image}
              lang={lang}
              ratio="1/1"
              radius="lg"
              sizes="(min-width: 1024px) 250px, 50vw"
              zoom={{
                group: 'pc-build',
                caption: step.index ? `${step.index} · ${t(step.caption, lang)}` : t(step.caption, lang),
              }}
            />
            <figcaption className="font-mono text-xs text-muted-foreground">
              {step.index ? <span className="mr-1.5 font-medium text-foreground">{step.index}</span> : null}
              {t(step.caption, lang)}
            </figcaption>
          </figure>
        </li>
      ))}
    </ol>
  );
}
