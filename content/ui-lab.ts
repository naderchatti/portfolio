import type { Localized } from './types';

/** UI strings for the /lab page. Data lives in `content/lab.ts`. */
export const uiLab = {
  metaDescription: {
    en: 'The infrastructure Nader Chatti runs at home — Proxmox, TrueNAS, Home Assistant — and the hardware builds around it.',
    fr: 'L’infrastructure que Nader Chatti fait tourner chez lui — Proxmox, TrueNAS, Home Assistant — et les montages matériels autour.',
  },
  infrastructure: { en: 'Infrastructure', fr: 'Infrastructure' },
  statusUp: { en: 'up', fr: 'en ligne' },
  statusDown: { en: 'down', fr: 'hors ligne' },
  statsLabel: { en: 'Home Assistant at a glance', fr: 'Home Assistant en chiffres' },
  statsSource: { en: 'Home Assistant', fr: 'Home Assistant' },
  builds: { en: 'Builds', fr: 'Montages' },
  readInLog: { en: 'Read in the log', fr: 'Lire dans le log' },
  services: { en: 'Self-hosted services', fr: 'Services auto-hébergés' },
  screens: { en: 'Screens', fr: 'Écrans' },
} as const satisfies Record<string, Localized>;
