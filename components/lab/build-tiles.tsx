import Link from 'next/link';
import { ChipList } from '@/components/ui/chip-list';
import { FramedImage, isScreenshot } from '@/components/ui/framed-image';
import { tiles, type LabTile } from '@/content/lab';
import { getImage, type MediaName } from '@/content/media';
import { t } from '@/content/types';
import { uiLab } from '@/content/ui-lab';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/** Large two-column tiles on the /lab page. */
const FEATURED = new Set(['standing-desk', 'smart-usb-kvm', 'living-room-tv', 'speakers']);

/**
 * Display order: each featured tile (2 columns) is paired with a normal tile so the 3-column grid fills
 * row by row and the visual order matches the reading order. Unlisted tiles follow in data order.
 */
const ORDER = [
  'standing-desk',
  'rack',
  'smart-usb-kvm',
  'voice-satellite',
  'living-room-tv',
  'media-server',
  'speakers',
  'home-assistant-hub',
];

function orderedTiles(): LabTile[] {
  const rank = (slug: string) => {
    const index = ORDER.indexOf(slug);
    return index === -1 ? ORDER.length : index;
  };
  return [...tiles].sort((a, b) => rank(a.slug) - rank(b.slug));
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
  return (
    <ul className="grid grid-flow-dense grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {orderedTiles().map((tile) => (
        <BuildTile key={tile.slug} tile={tile} lang={lang} posts={posts} featured={FEATURED.has(tile.slug)} />
      ))}
    </ul>
  );
}

function BuildTile({
  tile,
  lang,
  posts,
  featured,
}: {
  tile: LabTile;
  lang: Locale;
  posts: ReadonlySet<string>;
  featured: boolean;
}) {
  const title = t(tile.title, lang);
  const links = [
    tile.post && posts.has(tile.post) ? { href: tile.post, label: t(uiLab.readInLog, lang) } : null,
    tile.secondaryPost && posts.has(tile.secondaryPost.slug)
      ? { href: tile.secondaryPost.slug, label: t(tile.secondaryPost.label, lang) }
      : null,
  ].filter((link) => link !== null);

  return (
    <li
      className={cn(
        'flex flex-col gap-4 rounded-card border bg-background p-4',
        featured && 'md:col-span-2 md:grid md:grid-cols-2 md:items-start',
      )}
    >
      {tile.media ? (
        <TileMedia media={tile.media} lang={lang} featured={featured} group={`lab-${tile.slug}`} title={title} />
      ) : null}
      <div className="flex h-full flex-col gap-2.5">
        <h3 className="text-[15px] font-semibold">{title}</h3>
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

function TileMedia({
  media,
  lang,
  featured,
  group,
  title,
}: {
  media: NonNullable<LabTile['media']>;
  lang: Locale;
  featured: boolean;
  group: string;
  title: string;
}) {
  const thumbs = media.thumbs ?? [];
  const mainSizes = featured
    ? '(min-width: 1024px) 340px, (min-width: 768px) 45vw, 100vw'
    : '(min-width: 1024px) 340px, (min-width: 768px) 50vw, 100vw';
  const caption = media.caption ? t(media.caption, lang) : null;
  const zoom = { group, caption: caption ? `${title} · ${caption}` : title };
  // A single thumbnail in a normal tile sits beside the caption (before/after).
  const inline = !featured && thumbs.length === 1;
  const landscapeThumbs = thumbs.length > 0 && thumbs.every(isLandscape);
  const columns = landscapeThumbs && thumbs.length === 2 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <figure className="flex flex-col gap-2">
      <FramedImage
        name={media.main}
        lang={lang}
        ratio={isScreenshot(media.main) ? 'native' : '4/3'}
        radius="lg"
        sizes={mainSizes}
        zoom={zoom}
      />
      {inline ? (
        <div className="grid grid-cols-[80px_1fr] items-end gap-2.5">
          <FramedImage name={thumbs[0]!} lang={lang} ratio="3/4" radius="lg" sizes="80px" zoom={zoom} />
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
                  ratio={isLandscape(name) ? '4/3' : '3/4'}
                  radius="lg"
                  sizes="(min-width: 768px) 120px, 33vw"
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
