import { profile } from '@/content/site';
import type { Locale, Messages } from '@/lib/i18n';

export { socials, type Social, type SocialKey } from '@/content/site';

export const site = {
  name: profile.name,
  url: profile.url,
  email: profile.email,
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

export function navLabel(messages: Messages, key: NavKey): string {
  return messages.nav[key];
}
