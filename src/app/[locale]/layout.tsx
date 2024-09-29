import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ResponsiveProvider } from '@/context/ResponsiveContext';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { ModalProvider } from '@/context/ModalContext';
import ModalComponent from '@/components/modals/ModalComponent';
import { TranslationProvider } from '@/context/TranslationContext';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nader CHATTI',
  description: "Nader CHATTI's Portfolio and Blog",
  icons: {
    icon: '/icon.ico',
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../../locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ResponsiveProvider>
            <TranslationProvider initialLocale={locale}>
              <ModalProvider>
                <Navbar />
                {children}
                <Footer />
                <ModalComponent />
              </ModalProvider>
            </TranslationProvider>
          </ResponsiveProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
