'use client';

import React from 'react';
import { Logo } from './logo';
import { useLogo } from './logo-context';

export function LogoWrapper() {
  const { scrollProgress, isHomePage } = useLogo();

  const isLarge = isHomePage && scrollProgress === 0;

  return (
    <div
      className="fixed z-50 transition-all duration-300 ease-out"
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
