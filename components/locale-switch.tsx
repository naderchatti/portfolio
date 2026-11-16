'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, localizePath, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type LocaleSwitchProps = {
  locale: Locale;
  label: string;
  names: Record<Locale, string>;
  className?: string;
};

/** Segmented EN/FR control. Each option is a plain link to the same path in that locale. */
export function LocaleSwitch({ locale, label, names, className }: LocaleSwitchProps) {
  const pathname = usePathname() ?? `/${locale}/`;

  return (
    <nav aria-label={label} className={cn('inline-flex rounded-lg bg-secondary p-[3px]', className)}>
      {locales.map((option) => {
        const active = option === locale;
        return (
          <Link
            key={option}
            href={localizePath(pathname, option)}
            hrefLang={option}
            lang={option}
            aria-current={active ? 'page' : undefined}
            title={names[option]}
            className={cn(
              'inline-flex h-11 min-w-11 items-center justify-center rounded-md px-2.5 font-mono text-xs font-medium uppercase transition-colors sm:h-7 sm:min-w-0',
              active
                ? 'bg-background text-foreground shadow-[0_0_0_1px_var(--border)]'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span aria-hidden="true">{option}</span>
            <span className="sr-only">{names[option]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
