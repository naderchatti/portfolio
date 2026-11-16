'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchDialog } from '@/components/search/search-dialog';
import { getSearchStrings } from '@/content/ui-search';
import type { Locale, Messages } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type CommandMenuProps = {
  locale: Locale;
  messages: Pick<Messages, 'command' | 'nav' | 'theme' | 'locale'>;
  className?: string;
};

/**
 * Site search and quick actions (⌘K / Ctrl+K). The desktop trigger shows the shortcut;
 * phones get an icon button in the header instead. The index loads on first open.
 */
export function CommandMenu({ locale, messages, className }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const strings = getSearchStrings(locale);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={strings.open}
        aria-keyshortcuts="Meta+K Control+K"
        className={cn(
          'hidden h-9 items-center gap-2 rounded-lg border bg-card pr-1.5 pl-3 text-[13px] text-muted-foreground transition-colors hover:bg-secondary sm:inline-flex min-[900px]:w-[200px]',
          className
        )}
      >
        <Search className="size-3.5" aria-hidden="true" />
        <span className="hidden flex-1 text-left min-[900px]:inline">{strings.trigger}</span>
        <kbd className="rounded border bg-secondary px-1.5 font-mono text-[11px] leading-[1.4] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label={strings.open}
        className="size-11 sm:hidden"
      >
        <Search aria-hidden="true" />
      </Button>
      <SearchDialog open={open} onOpenChange={setOpen} locale={locale} messages={messages} strings={strings} />
    </>
  );
}
