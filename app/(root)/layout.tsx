import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { fontVariables } from '../fonts';
import { themeScript } from '@/lib/theme-script';

export const metadata: Metadata = {
  metadataBase: new URL('https://naderchatti.com'),
  title: 'Nader Chatti',
  alternates: {
    canonical: '/',
    languages: { en: '/en/', fr: '/fr/', 'x-default': '/' },
  },
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
};

/**
 * Root layout for `/` only. In production, `functions/index.ts` redirects `/`
 * by Accept-Language before this page is served; this is the static fallback.
 */
export default function RootFallbackLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
