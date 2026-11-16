import type { TocEntry } from '@/lib/posts';

/** “On this page”: numbered `##` headings. Side column on desktop, stacked above the article on mobile. */
export function TableOfContents({ entries, label }: { entries: TocEntry[]; label: string }) {
  if (entries.length === 0) return null;
  return (
    <nav
      aria-label={label}
      className="rounded-card border bg-card p-4 lg:sticky lg:top-[72px] lg:max-h-[calc(100dvh-96px)] lg:overflow-y-auto"
    >
      <p className="mb-2.5 font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase">{label}</p>
      <ol className="flex flex-col gap-0.5">
        {entries.map((entry, index) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className="flex min-h-11 items-center gap-2 rounded-md px-1.5 py-1 text-[13px] leading-snug text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:min-h-0 lg:items-start"
            >
              <span aria-hidden="true" className="font-mono text-[11px] lg:pt-px">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{entry.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
