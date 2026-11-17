/**
 * Cloudflare Pages Function for `/` only: pick a locale from Accept-Language.
 * Every other path is served straight from the static `out/` export.
 */
type Locale = 'en' | 'fr';

function pickLocale(header: string | null): Locale {
  return header?.trim().toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export const onRequest: PagesFunction = ({ request }) => {
  const url = new URL(request.url);
  const locale = pickLocale(request.headers.get('Accept-Language'));
  const location = new URL(`/${locale}/${url.search}`, url.origin);

  return new Response(null, {
    status: 302,
    headers: {
      Location: location.toString(),
      Vary: 'Accept-Language',
      'Cache-Control': 'private, no-store',
    },
  });
};
