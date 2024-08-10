'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslations as useNextIntlTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

type TranslationContextType = {
  useTranslations: typeof useNextIntlTranslations;
  currentLocale: string;
  setLocale: (locale: string) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export const TranslationProvider: React.FC<{
  children: React.ReactNode;
  initialLocale: string;
}> = ({ children, initialLocale }) => {
  const [currentLocale, setCurrentLocale] = useState(initialLocale);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedLocale = localStorage.getItem('selectedLocale');
    if (savedLocale && savedLocale !== currentLocale) {
      setCurrentLocale(savedLocale);
      const newPath = `/${savedLocale}${pathname.slice(3)}`;
      router.push(newPath);
    }
  }, []);

  const setLocale = (locale: string) => {
    if (locale !== currentLocale) {
      setCurrentLocale(locale);
      localStorage.setItem('selectedLocale', locale);
      const newPath = `/${locale}${pathname.slice(3)}`;
      setTimeout(() => {
        router.push(newPath);
      }, 500);
    }
  };

  return (
    <TranslationContext.Provider
      value={{
        useTranslations: useNextIntlTranslations,
        currentLocale,
        setLocale,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
