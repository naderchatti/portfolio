import type { MetadataRoute } from 'next';
import { locales, type Locale } from '@/lib/i18n';
import { getAllPosts } from '@/lib/posts';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

/** Localised top-level pages (paths after `/<lang>`). */
const PAGES = ['/', '/lab/', '/uses/', '/log/'] as const;

const url = (lang: Locale, path: string) => `${site.url}/${lang}${path}`;

function languages(path: string, available: readonly Locale[]) {
  return Object.fromEntries(available.map((lang) => [lang, url(lang, path)]));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PAGES) {
    for (const lang of locales) {
      entries.push({ url: url(lang, path), alternates: { languages: languages(path, locales) } });
    }
  }

  const published = await Promise.all(
    locales.map(async (lang) => [lang, await getAllPosts(lang, { includeDrafts: false })] as const),
  );
  const bySlug = new Map<string, { lang: Locale; date: string | null }[]>();
  for (const [lang, posts] of published) {
    for (const post of posts) bySlug.set(post.slug, [...(bySlug.get(post.slug) ?? []), { lang, date: post.date }]);
  }
  for (const [slug, versions] of bySlug) {
    const path = `/log/${slug}/`;
    const available = versions.map((version) => version.lang);
    for (const version of versions) {
      entries.push({
        url: url(version.lang, path),
        ...(version.date ? { lastModified: version.date } : {}),
        alternates: { languages: languages(path, available) },
      });
    }
  }

  return entries;
}
