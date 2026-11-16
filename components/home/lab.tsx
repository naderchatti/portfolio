import Link from 'next/link';
import { Picture } from '@/components/media/picture';
import { Chips, Section } from '@/components/home/primitives';
import { getImage } from '@/content/media';
import { compactOrder, labIntro, tiles, type LabTile } from '@/content/lab';
import { t } from '@/content/types';
import { uiHome } from '@/content/ui-home';
import type { Locale, Messages } from '@/lib/i18n';

type LabProps = { lang: Locale; messages: Messages };

type FeaturedTile = LabTile & Required<Pick<LabTile, 'featured' | 'media' | 'post'>>;

function isFeatured(tile: LabTile): tile is FeaturedTile {
  return Boolean(tile.featured && tile.media && tile.post);
}

const linkClass =
  'inline-flex min-h-11 items-center gap-1.5 rounded-md text-[13px] font-medium hover:underline hover:underline-offset-[3px] sm:min-h-0';

export function Lab({ lang, messages }: LabProps) {
  const m = messages.sections.lab;
  const featured = tiles.filter(isFeatured);
  const compact = compactOrder
    .map((slug) => tiles.find((tile) => tile.slug === slug))
    .filter((tile): tile is LabTile & Required<Pick<LabTile, 'compact'>> => Boolean(tile?.compact));

  return (
    <Section id="lab" index="03" title={t(labIntro.title, lang)} lead={t(labIntro.homeLead, lang)}>
      <p className="block rounded-lg border px-3.5 py-2.5 text-center font-mono text-[13px] text-muted-foreground sm:inline-block sm:text-left">
        {t(labIntro.summaryLine, lang)}
      </p>

      <h3 className="mt-6 mb-3 text-center font-mono text-[13px] font-normal text-muted-foreground sm:text-left">
        {m.featured}
      </h3>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        {featured.map((tile) => {
          const image = getImage(tile.media.main);
          return (
            <li key={tile.slug} className="flex">
              <Link
                href={`/${lang}/log/${tile.post}/`}
                className="group flex w-full flex-col gap-1.5 rounded-card border bg-card p-3 transition-colors hover:border-muted-foreground"
              >
                <Picture
                  image={image}
                  lang={lang}
                  alt=""
                  fit={image.focal ? 'cover' : 'contain'}
                  sizes="(min-width: 1120px) 340px, (min-width: 640px) 45vw, calc(100vw - 32px)"
                  className="mb-1 aspect-[4/3] rounded-lg border bg-secondary dark:bg-surface"
                />
                <span className="text-[15px] font-semibold">{t(tile.title, lang)}</span>
                <span className="text-[13px] text-muted-foreground">{t(tile.featured.summary, lang)}</span>
                <Chips items={tile.featured.tags} className="mt-1" />
                <span aria-hidden="true" className="mt-auto pt-2 text-[13px] font-medium">
                  {messages.log.readMore}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <ul
        aria-label={t(uiHome.lab.index, lang)}
        className="mt-5 grid grid-cols-1 font-mono text-[12.5px] min-[700px]:grid-cols-2 min-[700px]:gap-x-8"
      >
        {compact.map((tile) => (
          <li key={tile.slug} className="flex justify-between gap-3 border-b py-[7px]">
            <span>{t(tile.compact.title, lang)}</span>
            <span className="text-right text-muted-foreground">{t(tile.compact.meta, lang)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col items-center gap-1 sm:flex-row sm:gap-5">
        <Link href={`/${lang}/lab/`} className={linkClass}>
          {m.explore}
        </Link>
        <Link href={`/${lang}/log/`} className={linkClass}>
          {m.allEntries}
        </Link>
      </div>
    </Section>
  );
}
