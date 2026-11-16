import en from '@/messages/en.json';
import fr from '@/messages/fr.json';

export const locales = ['en', 'fr'] as const;
export const defaultLocale = 'en' satisfies Locale;

export type Locale = (typeof locales)[number];
export type Messages = typeof en;

const messages: Record<Locale, Messages> = { en, fr };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'fr' : 'en';
}

/** Swap the leading locale segment of a pathname, keeping the rest. */
export function localizePath(pathname: string, locale: Locale): string {
  const segments = pathname.split('/');
  if (segments[1] && isLocale(segments[1])) {
    segments[1] = locale;
    return segments.join('/') || `/${locale}/`;
  }
  return `/${locale}/`;
}
