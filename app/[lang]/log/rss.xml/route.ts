import { getLogStrings } from '@/content/ui-log';
import { getMessages, isLocale, locales } from '@/lib/i18n';
import { getAllPosts } from '@/lib/posts';
import { site } from '@/lib/site';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

function escape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** RSS 2.0 feed of the published posts in one language (`/en/log/rss.xml`, `/fr/log/rss.xml`). */
export async function GET(_request: Request, { params }: RouteContext<'/[lang]/log/rss.xml'>) {
  const { lang } = await params;
  if (!isLocale(lang)) return new Response('Not found', { status: 404 });
  const messages = getMessages(lang);
  const ui = getLogStrings(lang);
  const posts = await getAllPosts(lang, { includeDrafts: false });
  const home = `${site.url}/${lang}/log/`;
  const self = `${site.url}/${lang}/log/rss.xml`;

  const items = posts
    .map((post) => {
      const url = `${site.url}/${lang}/log/${post.slug}/`;
      return [
        '    <item>',
        `      <title>${escape(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escape(post.summary)}</description>`,
        `      <category>${escape(ui.categories[post.category])}</category>`,
        post.date ? `      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>` : null,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(ui.feedTitle)}</title>
    <link>${home}</link>
    <description>${escape(messages.log.lead)}</description>
    <language>${lang === 'fr' ? 'fr-FR' : 'en-US'}</language>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
