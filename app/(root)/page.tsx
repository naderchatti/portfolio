import Link from 'next/link';
import { Logo } from '@/components/logo';

const detectScript = `try{var l=(navigator.language||'').toLowerCase().indexOf('fr')===0?'fr':'en';location.replace('/'+l+'/')}catch(e){}`;

/** Static fallback for `/` (dev server, static preview, or if the Pages Function is bypassed). */
export default function RootFallback() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/en/" />
      <script dangerouslySetInnerHTML={{ __html: detectScript }} />
      <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 text-center">
        <Logo className="size-16" />
        <h1 className="text-2xl font-semibold tracking-[-0.03em]">Nader Chatti</h1>
        <ul className="flex gap-2">
          <li>
            <Link href="/en/" hrefLang="en" lang="en" className="inline-flex min-h-11 items-center rounded-lg border px-4 text-sm font-medium hover:bg-secondary">
              English
            </Link>
          </li>
          <li>
            <Link href="/fr/" hrefLang="fr" lang="fr" className="inline-flex min-h-11 items-center rounded-lg border px-4 text-sm font-medium hover:bg-secondary">
              Français
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}
