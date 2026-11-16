import type { Localized } from './types';

export type Education = {
  year: string;
  degree: Localized;
  field: Localized;
  school: string;
  /** A notable project attached to the degree. */
  project?: { year: string; text: Localized };
};

export const education: readonly Education[] = [
  {
    year: '2020',
    degree: { en: 'Master 2', fr: 'Master 2' },
    field: {
      en: 'Mobiquity, Big Data & System Integration',
      fr: 'Mobiquité, Big Data et intégration de systèmes',
    },
    school: 'Université Côte d’Azur',
    project: {
      year: '2021',
      text: {
        en: 'DeepBridge — deep learning brain-tumor detection, research project with CHU Nice',
        fr: 'DeepBridge — détection de tumeurs cérébrales par deep learning, projet de recherche avec le CHU de Nice',
      },
    },
  },
  {
    year: '2020',
    degree: { en: 'Master 1', fr: 'Master 1' },
    field: {
      en: 'Computerized Methods Applied to Business Management',
      fr: 'Méthodes informatiques appliquées à la gestion des entreprises (MIAGE)',
    },
    school: 'Université Côte d’Azur',
  },
  {
    year: '2017',
    degree: { en: 'Licence', fr: 'Licence' },
    field: {
      en: 'Computer Networks & Telecommunications',
      fr: 'Réseaux informatiques et télécommunications',
    },
    school: 'ISITcom',
  },
];
