'use client';

import React, { useEffect, useState } from 'react';
import { Logo } from './logo';
import { useLogo } from './logo-context';

export function LogoWrapper() {
  const { scrollProgress, isHomePage } = useLogo();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const handleScrollPosition = () => {
      const isAtTop = window.scrollY === 0;
      if (isAtTop) {
        const timeout = setTimeout(() => {
          setShouldAnimate(true);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setShouldAnimate(false);
      }
    };

    // Initial check
    handleScrollPosition();
    setIsInitialLoad(false);

    // Add scroll listener
    window.addEventListener('scroll', handleScrollPosition, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollPosition);
  }, []);

  const isLarge = isHomePage && scrollProgress === 0 && shouldAnimate;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-out ${
        isInitialLoad ? 'transition-none' : ''
      }`}
      style={{
        width: isLarge ? 'min(22rem, 80vw)' : '3rem',
        height: isLarge ? 'min(22rem, 80vw)' : '3rem',
        left: '50%',
        top: isLarge ? '30%' : '0.25rem',
        transform: isLarge ? 'translate(-50%, -50%)' : 'translate(-50%, 0)',
        pointerEvents: 'none',
      }}
    >
      <div style={{ pointerEvents: 'all', width: '100%', height: '100%' }}>
        <Logo />
      </div>
    </div>
  );
}
