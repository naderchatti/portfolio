'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ResponsiveContextType {
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(
  undefined
);

export const ResponsiveProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ResponsiveContext.Provider value={{ isMobile, setIsMobile }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = () => {
  const context = useContext(ResponsiveContext);
  if (context === undefined) {
    throw new Error('useResponsive must be used within a ResponsiveProvider');
  }
  return context;
};
