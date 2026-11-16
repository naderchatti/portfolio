import type { Localized, Text } from './types';

export const profile = {
  name: 'Nader Chatti',
  handle: 'operator@nader',
  url: 'https://naderchatti.com',
  email: 'contact@naderchatti.com',
  location: { en: 'France', fr: 'France' },
  role: {
    en: 'Fullstack engineer — I build SaaS products and run my own infrastructure.',
    fr: 'Ingénieur fullstack — je construis des produits SaaS et j’opère ma propre infrastructure.',
  },
  intro: {
    en: 'Freelance & SaaS founder, based in France. Next.js and TypeScript on the front, Python and Postgres behind it, and a homelab where most of it gets tested first.',
    fr: 'Freelance et fondateur SaaS, basé en France. Next.js et TypeScript côté front, Python et Postgres derrière, et un homelab où presque tout est testé en premier.',
  },
  /** Prompt line under the hero. */
  status: {
    en: 'uptime 10w · 9 projects · 14 services',
    fr: 'uptime 10w · 9 projets · 14 services',
  },
  contact: {
    title: { en: 'Have a project in mind?', fr: 'Un projet en tête ?' },
    body: {
      en: 'Freelance missions and SaaS collaborations.',
      fr: 'Missions freelance et collaborations SaaS.',
    },
  },
} as const satisfies {
  name: string;
  handle: string;
  url: string;
  email: string;
  location: Localized;
  role: Localized;
  intro: Localized;
  status: Localized;
  contact: { title: Localized; body: Localized };
};

export type SocialKey = 'github' | 'linkedin' | 'x' | 'twitch' | 'email';

export type Social = { key: SocialKey; label: string; handle: string; href: string };

export const socials = [
  { key: 'github', label: 'GitHub', handle: 'naderchatti', href: 'https://github.com/naderchatti' },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    handle: 'naderchatti',
    href: 'https://www.linkedin.com/in/naderchatti',
  },
  { key: 'x', label: 'X', handle: '@naderchatti', href: 'https://x.com/naderchatti' },
  { key: 'twitch', label: 'Twitch', handle: 'twitch.tv/naderolli', href: 'https://www.twitch.tv/naderolli' },
  { key: 'email', label: 'Email', handle: profile.email, href: `mailto:${profile.email}` },
] as const satisfies readonly Social[];

export type LanguageShare = { name: Text; percent: number };

/** GitHub language mix across my repositories (public and private), as shown on the activity card. */
export const languages = [
  { name: 'TypeScript', percent: 78.7 },
  { name: 'Python', percent: 11.5 },
  { name: 'JavaScript', percent: 3.9 },
  { name: 'MDX', percent: 2.4 },
  { name: { en: 'Other', fr: 'Autres' }, percent: 3.5 },
] as const satisfies readonly LanguageShare[];
