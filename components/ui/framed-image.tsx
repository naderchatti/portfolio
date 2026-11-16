import { Picture } from '@/components/media/picture';
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

export type FrameRatio = '4/3' | '3/4' | '16/9' | 'native';

type FramedImageProps = {
  name: MediaName;
  lang: Locale;
  /** Box aspect ratio. Screenshots shown alone should use `native`. */
  ratio: FrameRatio;
  sizes?: string;
  priority?: boolean;
  /** Corner radius: `card` (12px) for large frames, `lg` (8px) for thumbnails. */
  radius?: 'card' | 'lg';
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
  className,
}: FramedImageProps) {
  const image = getImage(name);
  const screenshot = isScreenshot(name);
  const aspectRatio = ratio === 'native' ? `${image.width} / ${image.height}` : ratio.replace('/', ' / ');

  return (
    <Picture
      image={image}
      lang={lang}
      fit={screenshot ? 'contain' : 'cover'}
      sizes={sizes}
      priority={priority}
      className={cn(
        'w-full border',
        radius === 'card' ? 'rounded-card' : 'rounded-lg',
        screenshot ? 'bg-secondary' : 'bg-muted',
        className,
      )}
      style={{ aspectRatio }}
    />
  );
}
