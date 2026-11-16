import { Briefcase, FileText, Hash, Newspaper, Rocket, Server, Laptop, type LucideIcon } from 'lucide-react';
import { CommandItem } from '@/components/ui/command';
import type { SearchHit } from '@/lib/search/engine';
import { highlight, snippet } from '@/lib/search/normalize';
import type { SearchKind } from '@/lib/search/types';

export const kindIcons: Record<SearchKind, LucideIcon> = {
  page: FileText,
  post: Newspaper,
  section: Hash,
  project: Rocket,
  experience: Briefcase,
  lab: Server,
  uses: Laptop,
};

function Highlight({ text, terms }: { text: string; terms: readonly string[] }) {
  return (
    <>
      {highlight(text, terms).map((part, index) =>
        part.match ? (
          <mark key={index} className="rounded-[2px] bg-foreground/12 px-px font-medium text-foreground">
            {part.text}
          </mark>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </>
  );
}

type SearchResultProps = {
  hit: SearchHit;
  /** Query words plus the index terms they matched. */
  terms: readonly string[];
  onSelect: (url: string) => void;
};

export function SearchResult({ hit, terms, onSelect }: SearchResultProps) {
  const { doc } = hit;
  const Icon = kindIcons[doc.kind];
  const context = snippet(doc.body ?? doc.chips ?? doc.headings ?? '', terms);

  return (
    <CommandItem value={doc.id} onSelect={() => onSelect(doc.url)} className="items-start gap-3">
      <Icon aria-hidden="true" className="mt-0.5" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {doc.parent ? (
          <span className="truncate font-mono text-[11px] text-muted-foreground">{doc.parent}</span>
        ) : null}
        <span className="truncate font-medium">
          <Highlight text={doc.title} terms={terms} />
        </span>
        {context ? (
          <span className="line-clamp-2 text-[13px] leading-snug text-muted-foreground">
            <Highlight text={context} terms={terms} />
          </span>
        ) : null}
      </div>
    </CommandItem>
  );
}
