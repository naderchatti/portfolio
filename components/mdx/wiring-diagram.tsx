import { diagrams, isDiagramSlug } from '@/components/diagrams';
import { getLogStrings } from '@/content/ui-log';
import type { Locale } from '@/lib/i18n';

type WiringDiagramProps = { slug: string; alt?: string; lang: Locale };

/**
 * `![alt](diagram:slug)` in a post → the matching inline-SVG diagram from `components/diagrams`.
 * Unknown slugs fail loudly in development and render nothing in production
 * (`pnpm check:content` rejects them before a build ships).
 */
export function WiringDiagram({ slug, lang }: WiringDiagramProps) {
  if (!isDiagramSlug(slug)) {
    if (process.env.NODE_ENV === 'production') return null;
    return (
      <div
        role="alert"
        className="my-8 rounded-card border border-destructive p-4 font-mono text-xs text-destructive"
      >
        {getLogStrings(lang).diagram.unknown}: diagram:{slug}
      </div>
    );
  }
  const Diagram = diagrams[slug];
  return <Diagram lang={lang} />;
}
