import Link from 'next/link';
import { Picture } from '@/components/media/picture';
import { Zoomable, type ZoomOptions } from '@/components/media/zoomable';
import { ChipList } from '@/components/ui/chip-list';
import { FramedImage, isScreenshot } from '@/components/ui/framed-image';
import { tiles, type LabTile } from '@/content/lab';
import { getImage, type MediaName } from '@/content/media';
import { t } from '@/content/types';
import { uiLab } from '@/content/ui-lab';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Bento layout of the /lab builds: a 12-column grid at `lg`, 2 columns at `md`, 1 on phones.
 *
 * - `large`: photo-led featured builds. `split` puts the main photo beside the text (at `md`, and at
 *   `lg` unless `stackAtLg`), with the thumbnails under the text so both columns end level.
 * - `medium`: a photo (or screenshot) above the text.
 * - `small`: text only; they fill the remaining rows evenly (see `smallSpans`).
 *
 * Each `lg` row of large/medium tiles sums to 12 columns in this order, so rows stay full; the main photo
 * of every tile grows to the row height so no tile leaves an empty area.
 */
type Size = 'large' | 'medium' | 'small';
type Layout = { size: Size; lg: string; md?: string; split?: boolean; stackAtLg?: boolean };

const LAYOUT: Record<string, Layout> = {
  'standing-desk': { size: 'large', lg: 'lg:col-span-8', md: 'md:col-span-2', split: true },
  rack: { size: 'medium', lg: 'lg:col-span-4' },
  'smart-usb-kvm': { size: 'large', lg: 'lg:col-span-5', md: 'md:col-span-2', split: true, stackAtLg: true },
  'living-room-tv': { size: 'large', lg: 'lg:col-span-7', md: 'md:col-span-2' },
  speakers: { size: 'large', lg: 'lg:col-span-8', md: 'md:col-span-2', split: true },
  'voice-satellite': { size: 'medium', lg: 'lg:col-span-4' },
  'home-assistant-hub': { size: 'medium', lg: 'lg:col-span-3' },
  'media-server': { size: 'medium', lg: 'lg:col-span-9', md: 'md:col-span-2' },
};

const ORDER = Object.keys(LAYOUT);

function orderedTiles(): LabTile[] {
  const rank = (slug: string) => {
    const index = ORDER.indexOf(slug);
    return index === -1 ? ORDER.length : index;
  };
  return [...tiles].sort((a, b) => rank(a.slug) - rank(b.slug));
}

/** Small tiles: rows of four at `lg`, the last row split evenly; an odd last one spans both `md` columns. */
function smallSpans(index: number, count: number, mdSingles: number): string {
  const remainder = count % 4;
  const inLastRow = remainder > 0 && index >= count - remainder;
  const lg = inLastRow ? { 1: 'lg:col-span-12', 2: 'lg:col-span-6', 3: 'lg:col-span-4' }[remainder] : 'lg:col-span-3';
  const md = mdSingles % 2 === 1 && index === count - 1 ? 'md:col-span-2' : '';
  return cn(lg, md);
}

function layouts(list: readonly LabTile[]): Map<string, { layout: Layout; spans: string }> {
  const result = new Map<string, { layout: Layout; spans: string }>();
  const smalls = list.filter((tile) => !LAYOUT[tile.slug]);
  // Tiles taking one `md` column, to keep the 2-column grid even.
  const mdSingles = list.filter((tile) => !LAYOUT[tile.slug]?.md).length;
  for (const tile of list) {
    const layout = LAYOUT[tile.slug];
    if (layout) result.set(tile.slug, { layout, spans: cn(layout.lg, layout.md) });
    else
      result.set(tile.slug, {
        layout: { size: 'small', lg: '' },
        spans: smallSpans(smalls.indexOf(tile), smalls.length, mdSingles),
      });
  }
  return result;
}

const isLandscape = (name: MediaName) => {
  const image = getImage(name);
  return image.width > image.height;
};

type BuildTilesProps = {
  lang: Locale;
  /** Slugs of log posts published in `lang`; links are only rendered for these. */
  posts: ReadonlySet<string>;
};

export function BuildTiles({ lang, posts }: BuildTilesProps) {
  const list = orderedTiles();
  const placement = layouts(list);
  return (
    <ul className="grid grid-flow-dense grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-12">
      {list.map((tile) => {
        const { layout, spans } = placement.get(tile.slug)!;
        return <BuildTile key={tile.slug} tile={tile} lang={lang} posts={posts} layout={layout} spans={spans} />;
      })}
    </ul>
  );
}

function BuildTile({
  tile,
  lang,
  posts,
  layout,
  spans,
}: {
  tile: LabTile;
  lang: Locale;
  posts: ReadonlySet<string>;
  layout: Layout;
  spans: string;
}) {
  const title = t(tile.title, lang);
  const large = layout.size === 'large';
  const small = layout.size === 'small';
  // Side-by-side tiles keep the photo alone in its column; thumbnails go under the text to balance heights.
  const thumbsInText = Boolean(layout.split);
  const links = [
    tile.post && posts.has(tile.post) ? { href: tile.post, label: t(uiLab.readInLog, lang) } : null,
    tile.secondaryPost && posts.has(tile.secondaryPost.slug)
      ? { href: tile.secondaryPost.slug, label: t(tile.secondaryPost.label, lang) }
      : null,
  ].filter((link) => link !== null);

  return (
    <li
      className={cn(
        'flex min-w-0 flex-col gap-4 rounded-card border bg-background p-4',
        small && 'bg-card',
        layout.split && 'md:grid md:grid-cols-2 md:gap-5',
        layout.stackAtLg && 'lg:flex lg:gap-4',
        spans,
      )}
    >
      {tile.media && !small ? (
        <TileMedia
          media={tile.media}
          lang={lang}
          large={large}
          group={`lab-${tile.slug}`}
          title={title}
          part={thumbsInText ? 'main' : 'all'}
        />
      ) : null}
      <div className={cn('flex flex-col gap-2.5', !tile.media || small ? 'grow' : 'flex-none')}>
        <h3 className={cn('font-semibold', large ? 'text-[17px] tracking-[-0.01em]' : 'text-[15px]')}>{title}</h3>
        <p className="text-[13px] text-muted-foreground">{t(tile.summary, lang)}</p>
        {tile.note ? <p className="text-[13px] text-muted-foreground">{t(tile.note, lang)}</p> : null}
        {tile.bullets ? (
          <ul className="flex flex-col gap-1 text-[13px]">
            {tile.bullets.map((bullet) => (
              <li key={bullet.en} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 size-1 flex-none rounded-[1px] bg-muted-foreground" />
                <span>{t(bullet, lang)}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <ChipList items={tile.stack} />
        {tile.media && thumbsInText ? (
          <TileMedia
            media={tile.media}
            lang={lang}
            large={large}
            group={`lab-${tile.slug}`}
            title={title}
            part="extras"
            className="mt-1.5"
          />
        ) : null}
        {tile.credit ? <p className="font-mono text-[11.5px] text-muted-foreground">{t(tile.credit, lang)}</p> : null}
        {links.length > 0 ? (
          <p className="mt-auto flex flex-wrap gap-x-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={`/${lang}/log/${link.href}/`}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-md text-[13px] font-medium underline-offset-4 hover:underline sm:min-h-8"
              >
                {link.label}
                <span className="sr-only">: {title}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </p>
        ) : null}
      </div>
    </li>
  );
}

/**
 * A photo that is at least `ratio` tall and grows with its tile, cropped around its focal point, so a
 * tile next to a taller neighbour fills with image rather than empty space.
 */
function GrowingImage({
  name,
  lang,
  ratio,
  sizes,
  zoom,
  className,
}: {
  name: MediaName;
  lang: Locale;
  /** Minimum shape; omit inside a strip, where the cell takes the strip's height. */
  ratio?: string;
  sizes: string;
  zoom: ZoomOptions;
  className?: string;
}) {
  const image = getImage(name);
  const screenshot = isScreenshot(name);
  return (
    <div className={cn('relative shrink-0 grow', className)} style={ratio ? { aspectRatio: ratio } : undefined}>
      <Zoomable image={image} lang={lang} group={zoom.group} caption={zoom.caption} className="absolute inset-0 rounded-lg">
        <Picture
          image={image}
          lang={lang}
          fit={screenshot ? 'contain' : 'cover'}
          sizes={sizes}
          className={cn('size-full rounded-lg border', screenshot ? 'bg-secondary' : 'bg-muted')}
        />
      </Zoomable>
    </div>
  );
}

function TileMedia({
  media,
  lang,
  large,
  group,
  title,
  part,
  className,
}: {
  media: NonNullable<LabTile['media']>;
  lang: Locale;
  large: boolean;
  group: string;
  title: string;
  /** `main` = the main image only, `extras` = thumbnails and caption only. */
  part: 'all' | 'main' | 'extras';
  className?: string;
}) {
  const thumbs = media.thumbs ?? [];
  const caption = media.caption ? t(media.caption, lang) : null;
  const zoom = { group, caption: caption ? `${title} · ${caption}` : title };
  const mainSizes = large
    ? '(min-width: 1024px) 520px, (min-width: 768px) 45vw, 100vw'
    : '(min-width: 1024px) 680px, (min-width: 768px) 50vw, 100vw';
  // A single thumbnail sits beside the caption (before/after, second view).
  const inline = thumbs.length === 1;
  const landscapeThumbs = thumbs.length > 0 && thumbs.every(isLandscape);
  const columns = thumbs.length === 2 ? 'grid-cols-2' : 'grid-cols-3';
  // One shared shape per strip so the row stays even: 4:3 when every thumbnail is landscape, square otherwise.
  const thumbRatio = landscapeThumbs ? '4/3' : '1/1';

  if (part === 'extras' && thumbs.length === 0 && !caption) return null;

  // Medium tiles: the main photo and its thumbnails side by side as one strip of equal portrait cells,
  // which grows with the row.
  if (!large && part === 'all' && thumbs.length > 0 && !isScreenshot(media.main)) {
    const names = [media.main, ...thumbs];
    return (
      <figure className={cn('flex grow flex-col gap-2', className)}>
        <div
          className="grid shrink-0 grow gap-2"
          style={{
            gridTemplateColumns: `repeat(${names.length}, minmax(0, 1fr))`,
            aspectRatio: `${names.length * 3} / 4`,
          }}
        >
          {names.map((name) => (
            <GrowingImage key={name} name={name} lang={lang} sizes="(min-width: 768px) 200px, 50vw" zoom={zoom} />
          ))}
        </div>
        {caption ? <figcaption className="font-mono text-[11.5px] text-muted-foreground">{caption}</figcaption> : null}
      </figure>
    );
  }

  return (
    <figure className={cn('flex flex-col gap-2', part !== 'extras' && 'grow', className)}>
      {part === 'extras' ? null : isScreenshot(media.main) ? (
        // Screenshots keep their own shape; they are never cropped.
        <FramedImage name={media.main} lang={lang} ratio="native" radius="lg" sizes={mainSizes} zoom={zoom} />
      ) : (
        <GrowingImage name={media.main} lang={lang} ratio={large ? '4 / 3' : '3 / 2'} sizes={mainSizes} zoom={zoom} />
      )}
      {part === 'main' ? null : inline ? (
        <div className="grid grid-cols-[72px_1fr] items-end gap-2.5">
          <FramedImage name={thumbs[0]!} lang={lang} ratio="3/4" radius="lg" sizes="72px" zoom={zoom} />
          {caption ? <figcaption className="font-mono text-[11.5px] text-muted-foreground">{caption}</figcaption> : null}
        </div>
      ) : (
        <>
          {thumbs.length > 0 ? (
            <div className={cn('grid gap-2', columns)}>
              {thumbs.map((name) => (
                <FramedImage
                  key={name}
                  name={name}
                  lang={lang}
                  ratio={thumbRatio}
                  radius="lg"
                  sizes="(min-width: 768px) 160px, 33vw"
                  zoom={zoom}
                />
              ))}
            </div>
          ) : null}
          {caption ? <figcaption className="font-mono text-[11.5px] text-muted-foreground">{caption}</figcaption> : null}
        </>
      )}
    </figure>
  );
}
