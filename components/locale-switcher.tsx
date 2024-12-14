'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  getLocaleFromPathname,
  getLocaleFullName,
  getAlternateLinks,
  locales,
} from '@/lib/i18n';
import { UkFlag } from '@/components/ui/icons/uk-flag';
import { FrFlag } from '@/components/ui/icons/fr-flag';

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = getLocaleFromPathname(pathname);

  const getLocaleIcon = (locale: (typeof locales)[number]) => {
    switch (locale) {
      case 'en':
        return <UkFlag className="h-5 w-5" />;
      case 'fr':
        return <FrFlag className="h-5 w-5" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
          {getLocaleIcon(currentLocale)}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-1">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            className={`${
              currentLocale === locale ? 'bg-accent' : ''
            } cursor-pointer flex items-center gap-2`}
            onClick={() => {
              if (currentLocale !== locale) {
                router.push(getAlternateLinks(pathname));
              }
            }}
          >
            {getLocaleIcon(locale)}
            <span>{getLocaleFullName(locale)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
