'use client';

import { useDeferredValue, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Command as CommandPrimitive } from 'cmdk';
import { ArrowDown, ArrowUp, CornerDownLeft, Hash, Languages, LoaderCircle, Monitor, Moon, SearchX, Sun } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { SocialIcon } from '@/components/icons';
import { SearchResult } from '@/components/search/search-result';
import { navHref, navItems } from '@/components/layout/nav';
import type { SearchStrings } from '@/content/ui-search';
import { localizePath, otherLocale, type Locale, type Messages } from '@/lib/i18n';
import { loadEngine, search, type SearchEngine, type SearchGroup } from '@/lib/search/engine';
import { fold, tokenize } from '@/lib/search/normalize';
import { socials } from '@/lib/site';
import { cn } from '@/lib/utils';

export type SearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: Locale;
  messages: Pick<Messages, 'command' | 'nav' | 'theme' | 'locale'>;
  strings: SearchStrings;
};

type Status = 'idle' | 'loading' | 'ready' | 'error';

/** Loads the index for `locale` the first time `enabled` turns true (and again on retry). */
function useEngine(locale: Locale, enabled: boolean) {
  const [state, setState] = useState<{ locale: Locale; status: Status; engine?: SearchEngine }>({
    locale,
    status: 'idle',
  });
  const [attempt, setAttempt] = useState(0);
  const current = state.locale === locale ? state : { locale, status: 'idle' as Status };

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const pending = loadEngine(locale);
    // A cached engine resolves on the next microtask; only show “loading” if it is genuinely slow.
    const timer = window.setTimeout(() => {
      if (!cancelled) setState((previous) => (previous.status === 'ready' && previous.locale === locale ? previous : { locale, status: 'loading' }));
    }, 120);
    pending.then(
      (engine) => {
        if (!cancelled) setState({ locale, status: 'ready', engine });
      },
      () => {
        if (!cancelled) setState({ locale, status: 'error' });
      },
    );
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [enabled, locale, attempt]);

  return { ...current, retry: () => setAttempt((value) => value + 1) };
}

function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function SearchDialog({ open, onOpenChange, locale, messages, strings }: SearchDialogProps) {
  const router = useRouter();
  const pathname = usePathname() ?? `/${locale}/`;
  const { setTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');
  const pendingUrl = useRef<string | null>(null);
  const { status, engine, retry } = useEngine(locale, open);
  const deferredQuery = useDeferredValue(query);
  const trimmed = deferredQuery.trim();

  const groups: SearchGroup[] = useMemo(
    () => (engine && trimmed ? search(engine, trimmed) : []),
    [engine, trimmed],
  );
  const terms = useMemo(() => {
    const words = tokenize(trimmed).map(fold);
    const matched = groups.flatMap((group) => group.hits.flatMap((hit) => hit.terms));
    return [...new Set([...words, ...matched])];
  }, [groups, trimmed]);
  const count = groups.reduce((total, group) => total + group.hits.length, 0);

  // Keep the first result selected as the query changes (cmdk filtering is off, so it does not do it).
  const firstId = groups[0]?.hits[0]?.doc.id ?? '';
  const resultsKey = `${trimmed}\u0000${firstId}`;
  const [seenKey, setSeenKey] = useState(resultsKey);
  if (seenKey !== resultsKey) {
    setSeenKey(resultsKey);
    setSelected(firstId);
  }

  const changeOpen = (value: boolean) => {
    if (!value) setQuery('');
    onOpenChange(value);
  };

  /** Navigation waits for the dialog to close, so the scroll lock is gone when we scroll to an anchor. */
  const go = (url: string) => {
    pendingUrl.current = url;
    changeOpen(false);
  };

  const navigate = (url: string) => {
    const [path = url, hash] = url.split('#');
    const samePage = path === pathname || `${path}/` === pathname || path === `${pathname}/`;
    if (samePage && hash) {
      const target = document.getElementById(decodeURIComponent(hash));
      if (target) {
        window.history.pushState(null, '', url);
        target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
        return true;
      }
    }
    router.push(url);
    return false;
  };

  const run = (action: () => void) => {
    changeOpen(false);
    action();
  };

  const target = otherLocale(locale);
  const t = messages.command;

  let body: ReactNode;
  if (!trimmed) {
    body = (
      <>
        <CommandGroup heading={strings.navigate}>
          {navItems.map((item) => (
            <CommandItem key={item.key} value={`nav:${item.key}`} onSelect={() => go(navHref(locale, item))}>
              <Hash aria-hidden="true" />
              <span>{messages.nav[item.key]}</span>
              <span className="ml-auto font-mono text-xs text-muted-foreground">{item.index}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t.preferences}>
          <CommandItem value="pref:locale" onSelect={() => go(localizePath(pathname, target))}>
            <Languages aria-hidden="true" />
            <span lang={target}>{messages.locale.switchTo}</span>
          </CommandItem>
          <CommandItem value="pref:light" onSelect={() => run(() => setTheme('light'))}>
            <Sun aria-hidden="true" />
            <span>{messages.theme.light}</span>
          </CommandItem>
          <CommandItem value="pref:dark" onSelect={() => run(() => setTheme('dark'))}>
            <Moon aria-hidden="true" />
            <span>{messages.theme.dark}</span>
          </CommandItem>
          <CommandItem value="pref:system" onSelect={() => run(() => setTheme('system'))}>
            <Monitor aria-hidden="true" />
            <span>{messages.theme.system}</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t.links}>
          {socials.map((social) => (
            <CommandItem
              key={social.key}
              value={`link:${social.key}`}
              onSelect={() => run(() => window.open(social.href, social.key === 'email' ? '_self' : '_blank', 'noopener'))}
            >
              <SocialIcon name={social.key} />
              <span>{social.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </>
    );
  } else if (status === 'error') {
    body = (
      <div className="flex flex-col items-center gap-3 px-4 py-10 text-center text-sm">
        <p className="text-muted-foreground">{strings.error}</p>
        <button
          type="button"
          onClick={retry}
          className="inline-flex min-h-9 items-center rounded-lg border px-3 text-[13px] font-medium hover:bg-secondary"
        >
          {strings.retry}
        </button>
      </div>
    );
  } else if (!engine) {
    body = (
      <CommandPrimitive.Loading className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-muted-foreground">
        <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
        {strings.loading}
      </CommandPrimitive.Loading>
    );
  } else if (count === 0) {
    body = (
      <div className="flex flex-col items-center gap-1.5 px-4 py-10 text-center text-sm">
        <SearchX className="mb-1 size-5 text-muted-foreground" aria-hidden="true" />
        <p>{format(strings.empty, { query: trimmed })}</p>
        <p className="text-[13px] text-muted-foreground">{strings.emptyHint}</p>
      </div>
    );
  } else {
    body = groups.map((group, index) => (
      <div key={group.kind}>
        {index > 0 ? <CommandSeparator /> : null}
        <CommandGroup heading={strings.groups[group.kind]}>
          {group.hits.map((hit) => (
            <SearchResult key={hit.doc.id} hit={hit} terms={terms} onSelect={go} />
          ))}
        </CommandGroup>
      </div>
    ));
  }

  const announcement = !trimmed || !engine ? '' : count === 1 ? strings.oneResult : format(strings.results, { count });

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogContent
        showCloseButton={false}
        onCloseAutoFocus={(event) => {
          const url = pendingUrl.current;
          pendingUrl.current = null;
          if (!url) return;
          // A same-page anchor keeps focus off the trigger, so the page does not jump back to the header.
          if (navigate(url)) event.preventDefault();
        }}
        className={cn(
          'grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)] gap-0 overflow-hidden p-0 sm:top-[12vh] sm:max-w-xl sm:translate-y-0',
          // Phones: nearly full screen, pinned to the top so the keyboard never covers the input.
          'max-sm:top-2 max-sm:left-2 max-sm:h-[calc(100dvh-1rem)] max-sm:w-[calc(100%-1rem)] max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0',
        )}
      >
        <DialogTitle className="sr-only">{strings.title}</DialogTitle>
        <DialogDescription className="sr-only">{strings.description}</DialogDescription>
        <CommandPrimitive
          shouldFilter={false}
          loop
          value={selected}
          onValueChange={setSelected}
          label={strings.title}
          className="flex h-full min-h-0 flex-col bg-popover text-popover-foreground [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:uppercase [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]_svg]:size-4"
        >
          <div className="flex items-center border-b pr-2 [&_[data-slot=command-input-wrapper]]:h-12 [&_[data-slot=command-input-wrapper]]:flex-1 [&_[data-slot=command-input-wrapper]]:border-b-0">
            <CommandInput
              value={query}
              onValueChange={setQuery}
              placeholder={strings.placeholder}
              aria-label={strings.title}
              className="h-12 text-base sm:text-sm"
            />
            <kbd className="hidden rounded border bg-secondary px-1.5 font-mono text-[11px] leading-[1.4] text-muted-foreground sm:inline">
              esc
            </kbd>
            <button
              type="button"
              onClick={() => changeOpen(false)}
              className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-muted-foreground hover:text-foreground sm:hidden"
            >
              {strings.close}
            </button>
          </div>
          <CommandList className="max-h-none min-h-0 flex-1 p-1 sm:max-h-[min(60vh,480px)]">{body}</CommandList>
          <p className="sr-only" aria-live="polite">
            {announcement}
          </p>
          <div
            aria-hidden="true"
            className="hidden items-center gap-4 border-t px-3 py-2 font-mono text-[11px] text-muted-foreground sm:flex"
          >
            <span className="inline-flex items-center gap-1">
              <ArrowUp className="size-3" />
              <ArrowDown className="size-3" />
              {strings.hint.select}
            </span>
            <span className="inline-flex items-center gap-1">
              <CornerDownLeft className="size-3" />
              {strings.hint.open}
            </span>
            <span className="inline-flex items-center gap-1">esc {strings.hint.close}</span>
          </div>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  );
}
