export const defaultLocale = 'en';
export const locales = ['en', 'fr'] as const;
export type ValidLocale = (typeof locales)[number];

export const getLocaleFromPathname = (pathname: string): ValidLocale => {
  const locale = pathname.split('/')[1] as ValidLocale;
  return locales.includes(locale) ? locale : defaultLocale;
};

export const getLocaleFullName = (locale: ValidLocale) => {
  const names: Record<ValidLocale, string> = {
    en: 'English',
    fr: 'Français',
  };
  return names[locale];
};

export const getAlternateLinks = (pathname: string) => {
  const segments = pathname.split('/');
  segments[1] = segments[1] === 'fr' ? 'en' : 'fr';
  return segments.join('/');
};
