import MiniSearch, { type SearchResult } from 'minisearch';
import { fold, tokenize } from '@/lib/search/normalize';
import { searchKinds, type SearchDoc, type SearchIndexFile, type SearchKind } from '@/lib/search/types';

export type SearchEngine = {
  docs: Map<string, SearchDoc>;
  index: MiniSearch<SearchDoc>;
};

export type SearchHit = {
  doc: SearchDoc;
  score: number;
  /** Folded index terms that matched (fuzzy/prefix expansions included), for highlighting. */
  terms: string[];
};

export type SearchGroup = { kind: SearchKind; hits: SearchHit[] };

/** Field weights: title > headings > chips > parent > body. */
const BOOST = { title: 6, headings: 3, chips: 2, parent: 1.5, body: 1 } as const;
const FIELDS = Object.keys(BOOST);

/** Results kept per group (sections are the most numerous). */
const PER_GROUP: Record<SearchKind, number> = {
  page: 3,
  post: 5,
  section: 6,
  project: 4,
  experience: 4,
  lab: 5,
  uses: 4,
};

function createEngine(file: SearchIndexFile): SearchEngine {
  const index = new MiniSearch<SearchDoc>({
    fields: FIELDS,
    idField: 'id',
    tokenize,
    processTerm: (term) => {
      const folded = fold(term);
      return folded.length > 0 ? folded : null;
    },
    searchOptions: {
      boost: BOOST,
      prefix: true,
      // Typos are tolerated from 5 characters up: one edit at 5–9, two from 10.
      fuzzy: (term) => (term.length < 5 ? false : term.length < 10 ? 1 : 2),
      maxFuzzy: 2,
    },
  });
  index.addAll(file.docs);
  return { docs: new Map(file.docs.map((doc) => [doc.id, doc])), index };
}

function toHits(engine: SearchEngine, results: SearchResult[]): SearchHit[] {
  return results.flatMap((result) => {
    const doc = engine.docs.get(String(result.id));
    return doc ? [{ doc, score: result.score, terms: result.terms }] : [];
  });
}

/** Grouped results for `query`, groups ordered by their best hit. All words must match; falls back to any word. */
export function search(engine: SearchEngine, query: string): SearchGroup[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  let results = engine.index.search(trimmed, { combineWith: 'AND' });
  if (results.length === 0) results = engine.index.search(trimmed, { combineWith: 'OR' });
  const byKind = new Map<SearchKind, SearchHit[]>();
  for (const hit of toHits(engine, results)) {
    const hits = byKind.get(hit.doc.kind) ?? [];
    if (hits.length < PER_GROUP[hit.doc.kind]) hits.push(hit);
    byKind.set(hit.doc.kind, hits);
  }
  return searchKinds
    .flatMap((kind) => {
      const hits = byKind.get(kind);
      return hits && hits.length > 0 ? [{ kind, hits }] : [];
    })
    .sort((a, b) => (b.hits[0]?.score ?? 0) - (a.hits[0]?.score ?? 0));
}

const engines = new Map<string, Promise<SearchEngine>>();

/** Fetches and indexes `/[lang]/search-index.json` once per language; a failed load can be retried. */
export function loadEngine(lang: string): Promise<SearchEngine> {
  const cached = engines.get(lang);
  if (cached) return cached;
  const pending = fetch(`/${lang}/search-index.json`)
    .then((response) => {
      if (!response.ok) throw new Error(`search index: HTTP ${response.status}`);
      return response.json() as Promise<SearchIndexFile>;
    })
    .then(createEngine);
  pending.catch(() => engines.delete(lang));
  engines.set(lang, pending);
  return pending;
}
