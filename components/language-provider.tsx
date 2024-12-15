'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ValidLocale, defaultLocale, getLocaleFromPathname } from '@/lib/i18n';

type LanguageProviderProps = {
  children: React.ReactNode;
};

type LanguageProviderState = {
  locale: ValidLocale;
  setLocale: (locale: ValidLocale) => void;
  isLoading: boolean;
};

const LanguageContext = createContext<LanguageProviderState | undefined>(
  undefined
);

function getSystemLocale(): ValidLocale {
  if (typeof window === 'undefined') return defaultLocale;

  // Get browser languages
  const browserLangs = navigator.languages || [navigator.language];

  // Check if any browser language starts with 'fr'
  const isFrench = browserLangs.some((lang) =>
    lang.toLowerCase().startsWith('fr')
  );

  return isFrench ? 'fr' : 'en';
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from URL first, then localStorage, then system
  const [locale, setLocaleState] = useState<ValidLocale>(() => {
    const urlLocale = getLocaleFromPathname(pathname);
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as ValidLocale;
      if (savedLocale) return savedLocale;
    }
    return urlLocale || getSystemLocale();
  });

  // Sync URL with system/localStorage on mount and pathname changes
  useEffect(() => {
    const urlLocale = getLocaleFromPathname(pathname);
    const savedLocale = localStorage.getItem('locale') as ValidLocale;
    const systemLocale = getSystemLocale();

    // If no saved preference, use system locale
    if (!savedLocale && urlLocale !== systemLocale) {
      const segments = pathname.split('/');
      segments[1] = systemLocale;
      router.push(segments.join('/'));
      setLocaleState(systemLocale);
    }
    // If there's a saved preference, use it
    else if (savedLocale && urlLocale !== savedLocale) {
      const segments = pathname.split('/');
      segments[1] = savedLocale;
      router.push(segments.join('/'));
    }

    setIsLoading(false);
  }, [pathname]);

  const setLocale = (newLocale: ValidLocale) => {
    // Only store in localStorage if it differs from system preference
    const systemLocale = getSystemLocale();
    if (newLocale !== systemLocale) {
      localStorage.setItem('locale', newLocale);
    } else {
      localStorage.removeItem('locale'); // Remove if matching system preference
    }

    setLocaleState(newLocale);
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
