import { Picture } from '@/components/media/picture';
import { findImage } from '@/content/media';
import type { Locale } from '@/lib/i18n';

type FigureProps = { name: string; alt?: string; lang: Locale };

/** `![alt](media:name)` in a post. The alt doubles as the caption. */
export function Figure({ name, alt, lang }: FigureProps) {
  const image = findImage(name);
  if (!image) {
    return (
      <figure className="my-8 rounded-card border border-dashed p-6 font-mono text-xs text-muted-foreground">
        missing media: {name}
      </figure>
    );
  }
  const caption = alt?.trim();
  const screenshot = !image.focal;
  return (
    <figure className="my-8">
      <Picture
        image={image}
        lang={lang}
        alt={caption || undefined}
        fit={screenshot ? 'contain' : 'cover'}
        sizes="(min-width: 768px) 720px, 100vw"
        className="rounded-card border"
      />
      {caption ? (
        <figcaption className="mt-2 font-mono text-xs text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
