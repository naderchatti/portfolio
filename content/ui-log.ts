import type { Locale } from '@/lib/i18n';

/** Log UI strings that are not in `messages/*.json` (post page, diagrams, feeds). */
const strings = {
  en: {
    feedTitle: 'Nader Chatti — The log',
    rss: 'RSS feed',
    credits: 'Credits & sources',
    previous: 'Previous',
    next: 'Next',
    postNav: 'More entries',
    endOfEntry: 'operator@nader ~ end of entry',
    allEntries: 'All entries',
    clearSearch: 'Clear search',
    noResults: 'No entries match “{query}”.',
    resetFilters: 'Show all entries',
    categories: { homelab: 'Homelab', saas: 'SaaS' },
    diagram: {
      label: 'Wiring diagram',
      legendSignal: 'signal / power',
      legendGround: 'GND',
      legendAccent: 'explained path',
      from: 'From',
      to: 'To',
      signal: 'Signal',
      connections: 'Connections',
      scrollHint: 'Scroll sideways to see the whole diagram.',
      unknown: 'Unknown wiring diagram',
    },
  },
  fr: {
    feedTitle: 'Nader Chatti — Le journal',
    rss: 'Flux RSS',
    credits: 'Crédits et sources',
    previous: 'Précédent',
    next: 'Suivant',
    postNav: 'Autres articles',
    endOfEntry: 'operator@nader ~ fin de l’article',
    allEntries: 'Tous les articles',
    clearSearch: 'Effacer la recherche',
    noResults: 'Aucun article ne correspond à « {query} ».',
    resetFilters: 'Afficher tous les articles',
    categories: { homelab: 'Homelab', saas: 'SaaS' },
    diagram: {
      label: 'Schéma de câblage',
      legendSignal: 'signal / alimentation',
      legendGround: 'GND',
      legendAccent: 'chemin expliqué',
      from: 'De',
      to: 'Vers',
      signal: 'Signal',
      connections: 'Connexions',
      scrollHint: 'Faites défiler horizontalement pour voir tout le schéma.',
      unknown: 'Schéma de câblage inconnu',
    },
  },
} as const;

export type LogStrings = (typeof strings)[Locale];

export function getLogStrings(lang: Locale): LogStrings {
  return strings[lang];
}

/** `2026-03-14` → “14 Mar 2026” / “14 mars 2026” (UTC, so the build machine's zone never shifts it). */
export function formatPostDate(date: string, lang: Locale): string {
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
