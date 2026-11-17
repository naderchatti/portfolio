import type { CSSProperties } from 'react';
import { getImage, type MediaImage, type MediaName, type ImageSource } from '@/content/media';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type PictureProps = {
  /** Manifest name, or an already-resolved image. */
  image: MediaName | MediaImage;
  lang: Locale;
  /** Overrides the manifest alt text (e.g. the alt written in a post). Pass "" for decorative images. */
  alt?: string;
  /** `cover` crops to the box using the focal point; `contain` letterboxes (screenshots). */
  fit?: 'cover' | 'contain';
  /** Responsive `sizes` attribute; defaults to the full viewport width. */
  sizes?: string;
  /** Eager-load and raise fetch priority (above-the-fold images). */
  priority?: boolean;
  /** Overrides the manifest focal point for this placement (`cover` only). */
  focal?: string;
  /** Zooms into the focal point (`cover` only), to frame one detail of a wider photo. */
  scale?: number;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
};

function srcSet(sources: readonly ImageSource[]): string {
  return sources.map((source) => `${source.src} ${source.width}w`).join(', ');
}

export function Picture({
  image,
  lang,
  alt,
  fit = 'cover',
  sizes = '100vw',
  priority = false,
  focal,
  scale,
  className,
  imgClassName,
  style,
}: PictureProps) {
  const media = typeof image === 'string' ? getImage(image) : image;
  const fallback = media.sources.webp[media.sources.webp.length - 1];
  const position = fit === 'cover' ? (focal ?? media.focal) : undefined;
  const imgStyle: CSSProperties | undefined =
    fit === 'cover' && (position || scale)
      ? {
          objectPosition: position,
          ...(scale ? { transform: `scale(${scale})`, transformOrigin: position ?? 'center' } : {}),
        }
      : undefined;

  return (
    <picture
      className={cn('block overflow-hidden bg-cover bg-center bg-no-repeat', className)}
      // Blur placeholder only behind cropped images; letterboxed screenshots keep a clean background.
      style={fit === 'cover' ? { backgroundImage: `url("${media.placeholder}")`, ...style } : style}
    >
      <source type="image/avif" srcSet={srcSet(media.sources.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(media.sources.webp)} sizes={sizes} />
      <img
        src={fallback?.src}
        alt={alt ?? media.alt[lang]}
        width={media.width}
        height={media.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={cn('block size-full', fit === 'cover' ? 'object-cover' : 'object-contain', imgClassName)}
        style={imgStyle}
      />
    </picture>
  );
}
