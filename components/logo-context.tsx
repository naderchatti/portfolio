'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { usePathname } from 'next/navigation';

interface LogoContextType {
  isScrolled: boolean;
  isHomePage: boolean;
  scrollProgress: number;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export function LogoProvider({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const handleScroll = useCallback(() => {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    const scrollThreshold = 100;

    if (currentScroll <= 0) {
      setScrollProgress(0);
      setIsScrolled(false);
    } else if (currentScroll <= scrollThreshold) {
      setScrollProgress(currentScroll / scrollThreshold);
      setIsScrolled(true);
    } else {
      setScrollProgress(1);
      setIsScrolled(true);
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <LogoContext.Provider value={{ isScrolled, isHomePage, scrollProgress }}>
      {children}
    </LogoContext.Provider>
  );
}

export function useLogo() {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error('useLogo must be used within LogoProvider');
  }
  return context;
}
