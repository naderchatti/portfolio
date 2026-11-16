type WiringDiagramProps = { slug: string; alt?: string };

/** Placeholder for `![alt](diagram:slug)`; the interactive diagrams land in Phase 5. */
export function WiringDiagram({ slug, alt }: WiringDiagramProps) {
  return (
    <figure
      role="img"
      aria-label={alt || slug}
      data-diagram={slug}
      className="my-8 flex min-h-48 flex-col items-center justify-center gap-1 rounded-card border border-dashed bg-[radial-gradient(var(--dots)_1px,transparent_1px)] bg-size-[16px_16px] p-6 text-center"
    >
      <span className="font-mono text-xs text-muted-foreground">diagram:{slug}</span>
      {alt ? <figcaption className="text-sm">{alt}</figcaption> : null}
    </figure>
  );
}
