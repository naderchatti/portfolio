import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { LocaleSwitch } from '@/components/locale-switch';
import { CommandMenu } from '@/components/command-menu';
import { MobileNav } from '@/components/mobile-nav';
import type { Locale, Messages } from '@/lib/i18n';
import { NavLinks } from '@/components/layout/active-nav';

type SiteHeaderProps = {
  locale: Locale;
  messages: Messages;
};

export function SiteHeader({ locale, messages }: SiteHeaderProps) {
  const localeNames = { en: messages.locale.en, fr: messages.locale.fr };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-14 items-center gap-2 px-4 sm:gap-3.5 sm:px-6">
        <Link
          href={`/${locale}/`}
          aria-label={messages.a11y.home}
          className="-ml-1 flex min-h-11 items-center gap-2.5 rounded-md px-1 font-mono text-[13px] font-medium"
        >
          <Logo className="size-[26px] shrink-0" />
          <span>Nader Chatti</span>
        </Link>

        <nav aria-label={messages.a11y.primaryNav} className="ml-4 hidden min-[900px]:block">
          <ul className="flex gap-0.5">
            <NavLinks
              locale={locale}
              labels={messages.nav}
              listItems
              linkClassName="group relative inline-flex h-9 items-center rounded-lg px-2.5 text-sm text-muted-foreground transition-colors after:pointer-events-none after:absolute after:inset-x-2.5 after:-bottom-[11px] after:h-px after:bg-foreground after:opacity-0 after:transition-opacity hover:bg-secondary hover:text-foreground data-[active]:text-foreground data-[active]:after:opacity-100"
              indexClassName="mr-1.5 font-mono text-[11px] group-data-[active]:text-foreground"
            />
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <CommandMenu
            locale={locale}
            messages={{
              command: messages.command,
              nav: messages.nav,
              theme: messages.theme,
              locale: messages.locale,
            }}
          />
          <LocaleSwitch
            locale={locale}
            label={messages.locale.label}
            names={localeNames}
            className="hidden sm:inline-flex"
          />
          <ThemeToggle label={messages.theme.toggle} />
          <div className="min-[900px]:hidden">
            <MobileNav
              locale={locale}
              messages={{ nav: messages.nav, locale: messages.locale, a11y: messages.a11y }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
