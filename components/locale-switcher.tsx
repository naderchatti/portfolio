'use client';

import { useLanguage } from './language-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getLocaleFullName, locales } from '@/lib/i18n';
import { UkFlag } from '@/components/ui/icons/uk-flag';
import { FrFlag } from '@/components/ui/icons/fr-flag';

export function LocaleSwitcher() {
  const { locale, setLocale, isLoading } = useLanguage();

  const getLocaleIcon = (locale: (typeof locales)[number]) => {
    switch (locale) {
      case 'en':
        return <UkFlag className="h-5 w-5" />;
      case 'fr':
        return <FrFlag className="h-5 w-5" />;
    }
  };

  if (isLoading) {
    return (
      <button className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
        <div className="h-5 w-5 animate-pulse bg-muted rounded" />
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
          {getLocaleIcon(locale)}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-1">
        {locales.map((localeOption) => (
          <DropdownMenuItem
            key={localeOption}
            className={`${
              locale === localeOption ? 'bg-accent' : ''
            } cursor-pointer flex items-center gap-2`}
            onClick={() => {
              if (locale !== localeOption) {
                setLocale(localeOption);
              }
            }}
          >
            {getLocaleIcon(localeOption)}
            <span>{getLocaleFullName(localeOption)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
