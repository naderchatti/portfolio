'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Hash, Languages, Monitor, Moon, Search, Sun } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { SocialIcon } from '@/components/icons';
import { localizePath, otherLocale, type Locale, type Messages } from '@/lib/i18n';
import { socials } from '@/lib/site';
import { navHref, navItems } from '@/components/layout/nav';
import { cn } from '@/lib/utils';

type CommandMenuProps = {
  locale: Locale;
  messages: Pick<Messages, 'command' | 'nav' | 'theme' | 'locale'>;
  className?: string;
};

export function CommandMenu({ locale, messages, className }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname() ?? `/${locale}/`;
  const { setTheme } = useTheme();
  const t = messages.command;

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

  const run = (action: () => void) => {
    setOpen(false);
    action();
  };

  const target = otherLocale(locale);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.open}
        aria-keyshortcuts="Meta+K Control+K"
        className={cn(
          'hidden h-9 items-center gap-2 rounded-lg border bg-card pr-1.5 pl-3 text-[13px] text-muted-foreground transition-colors hover:bg-secondary sm:inline-flex min-[900px]:w-[200px]',
          className
        )}
      >
        <Search className="size-3.5" aria-hidden="true" />
        <span className="hidden flex-1 text-left min-[900px]:inline">{t.trigger}</span>
        <kbd className="rounded border bg-secondary px-1.5 font-mono text-[11px] leading-[1.4] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen} title={t.title} description={t.description}>
        <CommandInput placeholder={t.placeholder} />
        <CommandList>
          <CommandEmpty>{t.empty}</CommandEmpty>
          <CommandGroup heading={t.navigation}>
            {navItems.map((item) => (
              <CommandItem
                key={item.key}
                value={`${item.index} ${messages.nav[item.key]}`}
                onSelect={() => run(() => router.push(navHref(locale, item)))}
              >
                <Hash aria-hidden="true" />
                <span>{messages.nav[item.key]}</span>
                <span className="ml-auto font-mono text-xs text-muted-foreground">{item.index}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t.preferences}>
            <CommandItem
              value={`${messages.locale.label} ${messages.locale[target]}`}
              onSelect={() => run(() => router.push(localizePath(pathname, target)))}
            >
              <Languages aria-hidden="true" />
              <span lang={target}>{messages.locale.switchTo}</span>
            </CommandItem>
            <CommandItem value={`${messages.theme.label} ${messages.theme.light}`} onSelect={() => run(() => setTheme('light'))}>
              <Sun aria-hidden="true" />
              <span>{messages.theme.light}</span>
            </CommandItem>
            <CommandItem value={`${messages.theme.label} ${messages.theme.dark}`} onSelect={() => run(() => setTheme('dark'))}>
              <Moon aria-hidden="true" />
              <span>{messages.theme.dark}</span>
            </CommandItem>
            <CommandItem value={`${messages.theme.label} ${messages.theme.system}`} onSelect={() => run(() => setTheme('system'))}>
              <Monitor aria-hidden="true" />
              <span>{messages.theme.system}</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t.links}>
            {socials.map((social) => (
              <CommandItem
                key={social.key}
                value={social.label}
                onSelect={() => run(() => window.open(social.href, social.key === 'email' ? '_self' : '_blank', 'noopener'))}
              >
                <SocialIcon name={social.key} />
                <span>{social.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
