import type { ReactNode } from 'react';
import type { MediaImage } from '@/content/media';
import { t } from '@/content/types';
import { uiMedia } from '@/content/ui-media';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/** What the lightbox needs to show one image; serialised on the trigger as `data-lightbox-item`. */
export type LightboxItem = {
  avif: string;
  webp: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

function srcSet(sources: readonly { src: string; width: number }[]): string {
  return sources.map((source) => `${source.src} ${source.width}w`).join(', ');
}

export function lightboxItem(image: MediaImage, lang: Locale, options: { alt?: string; caption?: string } = {}) {
  const largest = image.sources.webp[image.sources.webp.length - 1];
  const item: LightboxItem = {
    avif: srcSet(image.sources.avif),
    webp: srcSet(image.sources.webp),
    src: largest?.src ?? '',
    width: image.width,
    height: image.height,
    alt: options.alt || image.alt[lang],
    ...(options.caption ? { caption: options.caption } : {}),
  };
  return item;
}

export type ZoomOptions = {
  /** Images sharing a group are browsable with previous/next, in document order. */
  group: string;
  caption?: string;
};

type ZoomableProps = ZoomOptions & {
  image: MediaImage;
  lang: Locale;
  alt?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Wraps an image in a button that opens it in the site-wide lightbox (`components/media/lightbox.tsx`).
 * No client JS here: the lightbox listens for clicks on `[data-lightbox]` at the document level.
 */
export function Zoomable({ image, lang, alt, group, caption, className, children }: ZoomableProps) {
  const item = lightboxItem(image, lang, { alt, caption });
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-label={`${t(uiMedia.open, lang)}: ${item.alt}`}
      data-lightbox={group}
      data-lightbox-item={JSON.stringify(item)}
      className={cn(
        'group/zoom relative block w-full cursor-zoom-in text-left',
        '[&_img]:transition-[filter] hover:[&_img]:brightness-[0.97] dark:hover:[&_img]:brightness-110',
        className,
      )}
    >
      {children}
    </button>
  );
}
