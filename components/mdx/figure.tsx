import { Picture } from '@/components/media/picture';
import { Zoomable } from '@/components/media/zoomable';
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
  // Portrait photos would fill several screens at column width; keep them to a readable size.
  const portrait = image.height > image.width * 1.05;
  return (
    <figure className="my-8" style={portrait ? { maxWidth: 440 } : undefined}>
      <Zoomable image={image} lang={lang} alt={caption || undefined} group="post" caption={caption} className="rounded-card">
        <Picture
          image={image}
          lang={lang}
          alt={caption || undefined}
          fit={screenshot ? 'contain' : 'cover'}
          sizes={portrait ? '(min-width: 480px) 440px, 100vw' : '(min-width: 768px) 740px, 100vw'}
          className="rounded-card border"
        />
      </Zoomable>
      {caption ? (
        <figcaption className="mt-2 font-mono text-xs text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
