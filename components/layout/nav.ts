import type { Locale } from '@/lib/i18n';
import type { NavKey } from '@/lib/site';

export type { NavKey };

export type NavItem = {
  key: NavKey;
  index: string;
  /** Home-page section anchor, or a dedicated route. */
  target: 'anchor' | 'route';
};

export const navItems: readonly NavItem[] = [
  { key: 'built', index: '01', target: 'anchor' },
  { key: 'experience', index: '02', target: 'anchor' },
  { key: 'lab', index: '03', target: 'route' },
  { key: 'log', index: '04', target: 'route' },
  { key: 'uses', index: '05', target: 'route' },
];

/** `/en/#built` for home sections, `/en/lab/` for routes (trailing slash matches the static export). */
export function navHref(locale: Locale, item: NavItem): string {
  return item.target === 'anchor' ? `/${locale}/#${item.key}` : `/${locale}/${item.key}/`;
}
