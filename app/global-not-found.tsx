import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import './globals.css';
import { fontVariables } from './fonts';
import { Logo } from '@/components/logo';
import { getMessages, locales } from '@/lib/i18n';
import { themeScript } from '@/lib/theme-script';

export const metadata: Metadata = {
  title: '404 — Nader Chatti',
  description: 'Page not found · Page introuvable',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
};

/** Unmatched URLs outside a locale have no language context, so this page is bilingual. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-16 text-center">
          <Logo className="size-16" />
          <p className="mt-8 font-mono text-[13px] text-muted-foreground">
            <span className="font-medium text-foreground">404</span> · cd: no such file or directory
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Page not found
            <span className="mt-2 block text-2xl font-normal text-muted-foreground sm:text-3xl" lang="fr">
              Page introuvable
            </span>
          </h1>
          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {locales.map((locale) => (
              <li key={locale}>
                <Link
                  href={`/${locale}/`}
                  hrefLang={locale}
                  lang={locale}
                  className="inline-flex min-h-11 items-center rounded-lg border bg-background px-4 text-sm font-medium transition-colors hover:bg-secondary sm:min-h-9"
                >
                  {getMessages(locale).notFound.home}
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}
