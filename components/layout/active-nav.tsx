'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { navHref, navItems, type NavKey } from '@/components/layout/nav';

const anchorKeys = navItems.filter((item) => item.target === 'anchor').map((item) => item.key);

function stripSlash(path: string) {
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

/** Home-page section currently crossing a reading line ~30% down the viewport. */
function useSectionInView(enabled: boolean): NavKey | null {
  const [active, setActive] = useState<NavKey | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const elements = anchorKeys
      .map((key) => document.getElementById(key))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const key = anchorKeys.find((candidate) => visible.has(candidate)) ?? null;
        setActive(key);
      },
      // A one-pixel-tall band 30% from the top: at most one section crosses it at a time.
      { rootMargin: '-30% 0px -70% 0px', threshold: 0 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export type ActiveNav = { key: NavKey | null; kind: 'page' | 'location' | null };

/** The nav item matching the current route, or on the home page the section in view. */
export function useActiveNav(locale: Locale): ActiveNav {
  const pathname = stripSlash(usePathname() ?? '');
  const home = pathname === `/${locale}`;
  const section = useSectionInView(home);

  if (home) return { key: section, kind: section ? 'location' : null };
  const route = navItems.find(
    (item) => item.target === 'route' && (pathname === `/${locale}/${item.key}` || pathname.startsWith(`/${locale}/${item.key}/`)),
  );
  return route ? { key: route.key, kind: 'page' } : { key: null, kind: null };
}

type NavLinksProps = {
  locale: Locale;
  labels: Record<NavKey, string>;
  /** Classes for every link; style the current one with `data-[active]:`. */
  linkClassName: string;
  /** Classes for the `01` index before the label; omitted when not set. */
  indexClassName?: string;
  /** Wrap each link in an `<li>` (the caller provides the `<ul>`). */
  listItems?: boolean;
  onNavigate?: () => void;
};

/**
 * Primary navigation links with the active state: the current page gets `aria-current="page"`, the home
 * section in view `aria-current="location"`.
 */
export function NavLinks({ locale, labels, linkClassName, indexClassName, listItems = false, onNavigate }: NavLinksProps) {
  const active = useActiveNav(locale);

  return navItems.map((item) => {
    const isActive = active.key === item.key;
    const link = (
      <Link
        key={item.key}
        href={navHref(locale, item)}
        onClick={onNavigate}
        aria-current={isActive && active.kind ? active.kind : undefined}
        data-active={isActive ? '' : undefined}
        className={linkClassName}
      >
        {indexClassName ? (
          <span className={indexClassName} aria-hidden="true">
            {item.index}
          </span>
        ) : null}
        {labels[item.key]}
      </Link>
    );
    return listItems ? <li key={item.key}>{link}</li> : link;
  });
}
