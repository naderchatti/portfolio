import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { LogoProvider } from '@/components/logo-context';
import { LogoWrapper } from '@/components/logo-wrapper';
import { satoshi } from './fonts';
import { SocialsDock } from '@/components/socials-dock';
import { defaultLocale } from '@/lib/i18n';
import { use } from 'react';

export const metadata: Metadata = {
  title: 'Nader CHATTI',
  description: "Nader CHATTI's Portfolio and Blog",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: Promise<{ lang?: string }>;
}) {
  const resolvedParams = params ? use(params) : { lang: defaultLocale };

  return (
    <html lang={resolvedParams.lang || defaultLocale} suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${satoshi.variable} font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LogoProvider>
            <Navbar />
            <LogoWrapper />
            {children}
          </LogoProvider>
          <SocialsDock />
        </ThemeProvider>
      </body>
    </html>
  );
}
