import { isLocale, locales } from '@/lib/i18n';
import { buildSearchIndex } from '@/lib/search/build-index';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Site search documents for one language (`/en/search-index.json`), loaded by the command menu on first open. */
export async function GET(_request: Request, { params }: RouteContext<'/[lang]/search-index.json'>) {
  const { lang } = await params;
  if (!isLocale(lang)) return new Response('Not found', { status: 404 });
  const index = await buildSearchIndex(lang);
  return Response.json(index);
}
