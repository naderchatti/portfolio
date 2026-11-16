import type { Localized } from './types';

/** UI strings for the /uses page. Data lives in `content/uses.ts`. */
export const uiUses = {
  metaDescription: {
    en: 'The hardware and software Nader Chatti builds, games and streams with: PC, desk, streaming gear and dev laptop.',
    fr: 'Le matériel et les logiciels avec lesquels Nader Chatti développe, joue et stream : PC, bureau, matériel de streaming et portable de dev.',
  },
  buildLog: { en: 'Build log', fr: 'Journal de montage' },
  playVideo: { en: 'Play video', fr: 'Lire la vidéo' },
  pauseVideo: { en: 'Pause video', fr: 'Mettre la vidéo en pause' },
  newTab: { en: '(opens in a new tab)', fr: '(s’ouvre dans un nouvel onglet)' },
} as const satisfies Record<string, Localized>;
