/** Result groups, in display order. */
export const searchKinds = ['page', 'post', 'section', 'project', 'experience', 'lab', 'uses'] as const;

export type SearchKind = (typeof searchKinds)[number];

/** One searchable document in `/[lang]/search-index.json`. */
export type SearchDoc = {
  /** Unique within one language. */
  id: string;
  kind: SearchKind;
  title: string;
  /** Context shown before the title (post title for a section, org role, uses section…). */
  parent?: string;
  /** Locale-prefixed path, optionally with a `#anchor`. */
  url: string;
  /** Sub-headings, joined with ` · `. */
  headings?: string;
  /** Tags, stack, categories, joined with ` · `. */
  chips?: string;
  /** Plain-text body, truncated. */
  body?: string;
};

export type SearchIndexFile = {
  version: 1;
  lang: string;
  docs: SearchDoc[];
};
