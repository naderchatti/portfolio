import type { Locale, Messages } from '@/lib/i18n';

export const site = {
  name: 'Nader Chatti',
  url: 'https://naderchatti.com',
  email: 'contact@naderchatti.com',
} as const;

export type NavKey = 'built' | 'experience' | 'lab' | 'log' | 'uses';

export const navItems: { key: NavKey; index: string }[] = [
  { key: 'built', index: '01' },
  { key: 'experience', index: '02' },
  { key: 'lab', index: '03' },
  { key: 'log', index: '04' },
  { key: 'uses', index: '05' },
];

/** Placeholder targets: home-page anchors until dedicated routes exist. */
export function navHref(locale: Locale, key: NavKey): string {
  return `/${locale}/#${key}`;
}

export type SocialKey = 'github' | 'linkedin' | 'x' | 'twitch' | 'email';

export const socials: { key: SocialKey; label: string; href: string }[] = [
  { key: 'github', label: 'GitHub', href: 'https://github.com/naderchatti' },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/naderchatti',
  },
  { key: 'x', label: 'X', href: 'https://x.com/naderchatti' },
  { key: 'twitch', label: 'Twitch', href: 'https://www.twitch.tv/naderolli' },
  { key: 'email', label: 'Email', href: `mailto:${site.email}` },
];

export function navLabel(messages: Messages, key: NavKey): string {
  return messages.nav[key];
}
