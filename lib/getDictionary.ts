import type { ValidLocale } from './i18n';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  fr: () => import('@/dictionaries/fr.json').then((module) => module.default),
};

export const getDictionary = async (locale: ValidLocale) => {
  return dictionaries[locale]();
};
