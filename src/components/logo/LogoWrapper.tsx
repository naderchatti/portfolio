'use client';

import React from 'react';
import Logo from './Logo';
import { useLogo } from '@/context/LogoContext';
import styles from '@/app/[locale]/page.module.css';

const LogoWrapper = () => {
  const { isScrolled, isHomePage } = useLogo();

  return (
    <div
      className={`${styles.animatedLogo} ${
        isScrolled || !isHomePage ? styles.scrolled : ''
      }`}
    >
      <div
        className={`${styles.heroImage} ${
          isHomePage && !isScrolled ? styles.animate : ''
        }`}
      >
        <Logo />
      </div>
    </div>
  );
};

export default LogoWrapper;
