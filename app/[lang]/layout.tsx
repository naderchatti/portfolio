import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { fontVariables } from '../fonts';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { getMessages, isLocale, locales } from '@/lib/i18n';
import { site } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const messages = getMessages(lang);
  const image = { url: `/og/${lang}/home.png`, width: 1200, height: 630, alt: messages.meta.title };

  return {
    metadataBase: new URL(site.url),
    title: { default: messages.meta.title, template: `%s — ${site.name}` },
    description: messages.meta.description,
    alternates: {
      canonical: `/${lang}/`,
      languages: { en: '/en/', fr: '/fr/', 'x-default': '/' },
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      title: messages.meta.title,
      description: messages.meta.description,
      url: `/${lang}/`,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [image.url],
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const messages = getMessages(lang);

  return (
    <html lang={lang} className={fontVariables} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div id="top" className="flex min-h-dvh flex-col">
            <a
              href="#main"
              className="sr-only z-50 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
            >
              {messages.a11y.skipToContent}
            </a>
            <SiteHeader locale={lang} messages={messages} />
            <main id="main" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <SiteFooter locale={lang} messages={messages} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
