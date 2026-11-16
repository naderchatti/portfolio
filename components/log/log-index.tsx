'use client';

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CATEGORIES = ['all', 'homelab', 'saas'] as const;
export type CategoryFilter = (typeof CATEGORIES)[number];

export type LogIndexItem = {
  slug: string;
  category: Exclude<CategoryFilter, 'all'>;
  /** Lower-cased title + summary + excerpt + “Inside” chapters. */
  haystack: string;
  /** Server-rendered card. */
  card: ReactNode;
};

export type LogIndexLabels = {
  filterLabel: string;
  filters: Record<CategoryFilter, string>;
  searchLabel: string;
  searchPlaceholder: string;
  countOne: string;
  countOther: string;
  empty: string;
  noResults: string;
  clearSearch: string;
  resetFilters: string;
};

function isCategory(value: string | null): value is CategoryFilter {
  return value !== null && (CATEGORIES as readonly string[]).includes(value);
}

function normalize(value: string): string {
  return value.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

/** Filter tabs + search over server-rendered cards. Works without JS (everything shows). */
export function LogIndex({ items, labels }: { items: LogIndexItem[]; labels: LogIndexLabels }) {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [query, setQuery] = useState('');
  const tabRefs = useRef<Record<CategoryFilter, HTMLButtonElement | null>>({ all: null, homelab: null, saas: null });
  const id = useId();
  const panelId = `${id}-panel`;

  // `?category=` is optional; read it once on mount (static export: no server-side search params).
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('category');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL after hydration
    if (isCategory(param)) setCategory(param);
  }, []);

  const select = (next: CategoryFilter, focus = false) => {
    setCategory(next);
    if (focus) tabRefs.current[next]?.focus();
    const url = new URL(window.location.href);
    if (next === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', next);
    window.history.replaceState(window.history.state, '', url);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = CATEGORIES.indexOf(category);
    const last = CATEGORIES.length - 1;
    const target =
      event.key === 'ArrowRight'
        ? (index + 1) % CATEGORIES.length
        : event.key === 'ArrowLeft'
          ? (index - 1 + CATEGORIES.length) % CATEGORIES.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : -1;
    if (target === -1) return;
    event.preventDefault();
    select(CATEGORIES[target] ?? 'all', true);
  };

  const needle = normalize(query);
  const visible = useMemo(
    () =>
      items.filter(
        (item) => (category === 'all' || item.category === category) && (!needle || item.haystack.includes(needle)),
      ),
    [items, category, needle],
  );

  const count = (visible.length === 1 ? labels.countOne : labels.countOther).replace(
    '{count}',
    String(visible.length),
  );

  return (
    <>
      <div className="flex flex-col items-stretch gap-3 py-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label={labels.filterLabel}
          className="inline-flex self-center rounded-lg bg-secondary p-[3px] sm:self-auto"
        >
          {CATEGORIES.map((key) => {
            const selected = key === category;
            return (
              <button
                key={key}
                ref={(node) => {
                  tabRefs.current[key] = node;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${key}`}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(key)}
                onKeyDown={onTabKeyDown}
                className={cn(
                  'h-[38px] rounded-md px-3 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:h-[30px]',
                  selected && 'bg-background text-foreground shadow-[0_0_0_1px_var(--border)]',
                )}
              >
                {labels.filters[key]}
              </button>
            );
          })}
        </div>

        <label className="flex h-11 w-full items-center gap-2 rounded-lg border bg-card pr-1.5 pl-3 text-muted-foreground focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring sm:h-9 sm:w-[280px]">
          <span className="sr-only">{labels.searchLabel}</span>
          <Search aria-hidden="true" className="size-3.5 shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
            enterKeyHint="search"
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground sm:text-sm [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={labels.clearSearch}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-md hover:bg-secondary hover:text-foreground sm:size-6"
            >
              <X aria-hidden="true" className="size-3.5" />
            </button>
          ) : null}
        </label>
      </div>

      <p aria-live="polite" className="mb-3 text-center font-mono text-xs text-muted-foreground sm:text-left">
        {count}
      </p>

      <div id={panelId} role="tabpanel" aria-labelledby={`${id}-tab-${category}`} className="border-t">
        {visible.length > 0 ? (
          <ul role="list" className="divide-y border-b">
            {visible.map((item) => (
              <li key={item.slug}>{item.card}</li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-3 border-b py-12 text-center text-muted-foreground">
            <p>{needle ? labels.noResults.replace('{query}', query.trim()) : labels.empty}</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                select('all');
              }}
              className="inline-flex min-h-11 items-center rounded-lg border px-4 text-sm font-medium text-foreground hover:bg-secondary sm:min-h-9"
            >
              {labels.resetFilters}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
