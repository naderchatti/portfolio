import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ResponsiveProvider } from '@/context/ResponsiveContext';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nader CHATTI',
  description: "Nader CHATTI's Portfolio and Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ResponsiveProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ResponsiveProvider>
  );
}
