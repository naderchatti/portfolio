import type { Locale } from '@/lib/i18n';
import type { SearchKind } from '@/lib/search/types';

/** Strings for the site search in the command menu (⌘K). */
const strings = {
  en: {
    open: 'Search the site',
    trigger: 'Search…',
    title: 'Search',
    description: 'Search posts, projects, the lab and the setup, or jump to a section.',
    placeholder: 'Search posts, projects, lab…',
    loading: 'Loading the search index…',
    error: 'The search index could not be loaded.',
    retry: 'Retry',
    close: 'Close',
    empty: 'Nothing matches “{query}”.',
    emptyHint: 'Try a shorter word, or another spelling.',
    navigate: 'Navigate',
    results: '{count} results',
    oneResult: '1 result',
    hint: { select: 'to select', open: 'to open', close: 'to close' },
    groups: {
      page: 'Pages',
      post: 'Posts',
      section: 'Sections inside posts',
      project: 'Projects',
      experience: 'Experience',
      lab: 'Lab',
      uses: 'Uses',
    },
  },
  fr: {
    open: 'Rechercher sur le site',
    trigger: 'Rechercher…',
    title: 'Recherche',
    description: 'Rechercher dans les articles, les projets, le lab et le setup, ou aller à une section.',
    placeholder: 'Articles, projets, lab…',
    loading: 'Chargement de l’index de recherche…',
    error: 'Impossible de charger l’index de recherche.',
    retry: 'Réessayer',
    close: 'Fermer',
    empty: 'Aucun résultat pour « {query} ».',
    emptyHint: 'Essayez un mot plus court ou une autre orthographe.',
    navigate: 'Navigation',
    results: '{count} résultats',
    oneResult: '1 résultat',
    hint: { select: 'pour choisir', open: 'pour ouvrir', close: 'pour fermer' },
    groups: {
      page: 'Pages',
      post: 'Articles',
      section: 'Sections d’articles',
      project: 'Projets',
      experience: 'Expérience',
      lab: 'Lab',
      uses: 'Setup',
    },
  },
} as const satisfies Record<Locale, { groups: Record<SearchKind, string> } & Record<string, unknown>>;

export type SearchStrings = (typeof strings)[Locale];

export function getSearchStrings(lang: Locale): SearchStrings {
  return strings[lang];
}
