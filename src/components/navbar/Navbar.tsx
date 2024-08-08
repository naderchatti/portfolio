'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import BurgerButton from '../buttons/BurgerButton';
import PrimaryButton from '../buttons/PrimaryButton';
import { useResponsive } from '@/context/ResponsiveContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { isMobile } = useResponsive();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        burgerRef.current.checked = false;
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <div className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          Nader.
        </Link>
        {isMobile !== null && (
          <>
            {isMobile ? (
              <BurgerButton handleDropdown={handleDropdown} ref={burgerRef} />
            ) : (
              <>
                <div className={styles.links}>
                  <Link href="/about" className={styles.link}>
                    About
                  </Link>
                  <Link href="/work" className={styles.link}>
                    Work
                  </Link>
                  <Link href="/blog" className={styles.link}>
                    Blog
                  </Link>
                </div>
                <PrimaryButton
                  onClick={() => {
                    router.push('/contact');
                  }}
                >
                  LETS&apos;S TALK
                </PrimaryButton>
              </>
            )}
          </>
        )}
      </div>
      {isDropdownOpen && (
        <div
          className={`${styles.dropdown} ${isDropdownOpen && styles.open}`}
          ref={dropdownRef}
        >
          <Link
            href="/about"
            className={styles.link}
            onClick={() => {
              setIsDropdownOpen(false);
              if (burgerRef.current) {
                burgerRef.current.checked = false;
              }
            }}
          >
            About
          </Link>
          <Link
            href="/work"
            className={styles.link}
            onClick={() => {
              setIsDropdownOpen(false);
              if (burgerRef.current) {
                burgerRef.current.checked = false;
              }
            }}
          >
            Work
          </Link>
          <Link
            href="/blog"
            className={styles.link}
            onClick={() => {
              setIsDropdownOpen(false);
              if (burgerRef.current) {
                burgerRef.current.checked = false;
              }
            }}
          >
            Blog
          </Link>
          <PrimaryButton
            onClick={() => {
              router.push('/contact');
              setIsDropdownOpen(false);
              if (burgerRef.current) {
                burgerRef.current.checked = false;
              }
            }}
          >
            LETS&apos;S TALK
          </PrimaryButton>
        </div>
      )}
    </>
  );
};

export default Navbar;
