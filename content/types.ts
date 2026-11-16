import type { Locale } from '@/lib/i18n';

/** A string written in both site languages. */
export type Localized = { en: string; fr: string };

/** A localized string, or a proper noun that reads the same in both languages. */
export type Text = Localized | string;

export function t(value: Text, lang: Locale): string {
  return typeof value === 'string' ? value : value[lang];
}

export function tList(values: readonly Text[], lang: Locale): string[] {
  return values.map((value) => t(value, lang));
}
