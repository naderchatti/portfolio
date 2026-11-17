import { profile } from '@/content/site';

export { socials, type SocialKey } from '@/content/site';

export const site = {
  name: profile.name,
  url: profile.url,
  email: profile.email,
} as const;

export type NavKey = 'built' | 'experience' | 'lab' | 'log' | 'uses';
