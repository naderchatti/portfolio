import type { Localized } from './types';

/** Home-page UI strings not covered by `messages/*.json`. */
export const uiHome = {
  /** Breadcrumb above the hero name (`~ / operator`). */
  heroPath: { en: 'operator', fr: 'operator' },
  activity: {
    /** Name of the horizontally scrollable heatmap region. */
    region: { en: 'Contribution heatmap (scrollable)', fr: 'Carte des contributions (défilante)' },
    languagesLabel: { en: 'Language mix', fr: 'Répartition des langages' },
  },
  built: {
    list: { en: 'Products', fr: 'Produits' },
    screens: { en: 'Screenshots of {name}', fr: 'Captures d’écran de {name}' },
  },
  experience: {
    list: { en: 'Work history, most recent first', fr: 'Parcours, du plus récent au plus ancien' },
  },
  lab: {
    index: { en: 'More builds', fr: 'Autres montages' },
  },
  contact: {
    breadcrumb: { en: 'contact', fr: 'contact' },
  },
} as const satisfies {
  heroPath: Localized;
  activity: { region: Localized; languagesLabel: Localized };
  built: { list: Localized; screens: Localized };
  experience: { list: Localized };
  lab: { index: Localized };
  contact: { breadcrumb: Localized };
};
