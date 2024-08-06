'use client';

import React, { useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import BurgerButton from '../buttons/BurgerButton';
import PrimaryButton from '../buttons/PrimaryButton';
import { useResponsive } from '@/context/ResponsiveContext';

const Navbar = () => {
  const { isMobile } = useResponsive();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <div className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          Nader.
        </Link>
        {window.innerWidth < 768 || isMobile ? (
          <BurgerButton handleDropdown={handleDropdown} />
        ) : (
          <>
            <div className={styles.links}>
              <Link href="/about" className={styles.link}>
                About
              </Link>
              <Link href="/contact" className={styles.link}>
                Contact
              </Link>
              <Link href="/work" className={styles.link}>
                Work
              </Link>
              <Link href="/blog" className={styles.link}>
                Blog
              </Link>
            </div>
            <PrimaryButton>LETS&apos;S TALK</PrimaryButton>
          </>
        )}
      </div>
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <Link href="/about" className={styles.link}>
            About
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact
          </Link>
          <Link href="/work" className={styles.link}>
            Work
          </Link>
          <Link href="/blog" className={styles.link}>
            Blog
          </Link>
          <PrimaryButton>Download CV</PrimaryButton>
        </div>
      )}
    </>
  );
};

export default Navbar;
