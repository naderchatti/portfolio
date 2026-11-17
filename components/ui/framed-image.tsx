import { Picture } from '@/components/media/picture';
import { Zoomable, type ZoomOptions } from '@/components/media/zoomable';
import { getImage, type MediaName } from '@/content/media';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Screenshots and UI captures. They are letterboxed (`contain`) and never cropped; everything else is a
 * photo, cropped (`cover`) around its focal point.
 * TODO: move to a `kind` field in `content/media.meta.ts`.
 */
const screenshots = new Set<MediaName>([
  'grafana',
  'ha',
  'proxmox',
  'traefik',
  'pihole',
  'portainer',
  'nextcloud',
  'music-assistant',
  'jellyfin-libraries',
  'tv-launcher',
  'desk-ha-controls',
]);

export function isScreenshot(name: MediaName): boolean {
  return screenshots.has(name);
}

type FrameRatio = '4/3' | '3/4' | '1/1' | '16/9' | 'native';

type FramedImageProps = {
  name: MediaName;
  lang: Locale;
  /** Box aspect ratio. Screenshots shown alone should use `native`. */
  ratio: FrameRatio;
  sizes?: string;
  priority?: boolean;
  /** Corner radius: `card` (12px) for large frames, `lg` (8px) for thumbnails. */
  radius?: 'card' | 'lg';
  /** Per-placement focal point (overrides the manifest's). */
  focal?: string;
  /** Zoom into `focal` (photos only). */
  scale?: number;
  /** Opens the image in the lightbox, browsable within `zoom.group`. */
  zoom?: ZoomOptions;
  className?: string;
};

/** A bordered, rounded image box that applies the site's framing rules. */
export function FramedImage({
  name,
  lang,
  ratio,
  sizes,
  priority,
  radius = 'card',
  focal,
  scale,
  zoom,
  className,
}: FramedImageProps) {
  const image = getImage(name);
  const screenshot = isScreenshot(name);
  const aspectRatio = ratio === 'native' ? `${image.width} / ${image.height}` : ratio.replace('/', ' / ');

  const rounded = radius === 'card' ? 'rounded-card' : 'rounded-lg';
  const picture = (
    <Picture
      image={image}
      lang={lang}
      fit={screenshot ? 'contain' : 'cover'}
      sizes={sizes}
      priority={priority}
      focal={focal}
      scale={scale}
      className={cn('w-full border', rounded, screenshot ? 'bg-secondary' : 'bg-muted', className)}
      style={{ aspectRatio }}
    />
  );
  if (!zoom) return picture;
  return (
    <Zoomable image={image} lang={lang} group={zoom.group} caption={zoom.caption} className={rounded}>
      {picture}
    </Zoomable>
  );
}
