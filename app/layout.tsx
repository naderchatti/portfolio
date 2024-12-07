import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { LogoProvider } from '@/components/logo-context';
import { LogoWrapper } from '@/components/logo-wrapper';
import { satoshi } from './fonts';
import { SocialsDock } from '@/components/socials-dock';

export const metadata: Metadata = {
  title: 'Nader CHATTI',
  description: "Nader CHATTI's Portfolio and Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
