'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { LocaleSwitch } from '@/components/locale-switch';
import { SocialIcon } from '@/components/icons';
import type { Locale, Messages } from '@/lib/i18n';
import { socials } from '@/lib/site';
import { navHref, navItems } from '@/components/layout/nav';

type MobileNavProps = {
  locale: Locale;
  messages: Pick<Messages, 'nav' | 'locale' | 'a11y'>;
};

export function MobileNav({ locale, messages }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type="button" variant="outline" size="icon" className="size-11 sm:size-9" aria-label={messages.nav.openMenu}>
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(20rem,100vw)] gap-0" closeLabel={messages.nav.closeMenu}>
        <SheetHeader className="border-b">
          <SheetTitle className="font-mono text-sm">{messages.nav.menu}</SheetTitle>
          <SheetDescription className="sr-only">{messages.a11y.primaryNav}</SheetDescription>
        </SheetHeader>
        <nav aria-label={messages.a11y.primaryNav} className="flex flex-col p-2">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={navHref(locale, item)}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-[15px] hover:bg-secondary"
            >
              <span className="font-mono text-xs text-muted-foreground">{item.index}</span>
              {messages.nav[item.key]}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-4 border-t p-4">
          <LocaleSwitch locale={locale} label={messages.locale.label} names={{ en: messages.locale.en, fr: messages.locale.fr }} className="self-start" />
          <ul className="flex flex-wrap gap-1" aria-label={messages.a11y.socialNav}>
            {socials.map((social) => (
              <li key={social.key}>
                <a
                  href={social.href}
                  {...(social.key === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  aria-label={social.label}
                  className="inline-flex size-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <SocialIcon name={social.key} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
