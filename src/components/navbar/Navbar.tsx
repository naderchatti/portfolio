'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import BurgerButton from '../buttons/BurgerButton';
import PrimaryButton from '../buttons/PrimaryButton';
import { useResponsive } from '@/context/ResponsiveContext';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/context/TranslationContext';
import LanguageSelector from '../selectors/LanguageSelector';

const Navbar = () => {
  const { isMobile } = useResponsive();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLInputElement>(null);
  const burgerWrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { useTranslations, currentLocale } = useTranslation();
  const t = useTranslations('Navbar');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.burger-button') &&
        !burgerWrapperRef.current?.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        if (burgerRef.current) {
          burgerRef.current.checked = false;
        }
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
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <div className={styles.navbar}>
        <Link href={`/${currentLocale}`} className={styles.logo}>
          Nader.
        </Link>
        {isMobile !== null && (
          <>
            {isMobile ? (
              <div className={styles.burgerWrapper} ref={burgerWrapperRef}>
                <BurgerButton handleDropdown={handleDropdown} ref={burgerRef} />
              </div>
            ) : (
              <>
                <div className={styles.links}>
                  <Link
                    href={`/${currentLocale}/about`}
                    className={styles.link}
                  >
                    {t('aboutLink')}
                  </Link>
                  <Link href={`/${currentLocale}/work`} className={styles.link}>
                    {t('workLink')}
                  </Link>
                  <Link
                    href={`/${currentLocale}/contact`}
                    className={styles.link}
                  >
                    {t('contactLink')}
                  </Link>
                </div>
                <div className={styles.languageSelectorWrapper}>
                  <LanguageSelector />
                </div>
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
            href={`/${currentLocale}/about`}
            className={styles.link}
            onClick={() => {
              setIsDropdownOpen(false);
              if (burgerRef.current) {
                burgerRef.current.checked = false;
              }
            }}
          >
            {t('aboutLink')}
          </Link>
          <Link
            href={`/${currentLocale}/work`}
            className={styles.link}
            onClick={() => {
              setIsDropdownOpen(false);
              if (burgerRef.current) {
                burgerRef.current.checked = false;
              }
            }}
          >
            {t('workLink')}
          </Link>
          <Link
            href={`/${currentLocale}/contact`}
            className={styles.link}
            onClick={() => {
              setIsDropdownOpen(false);
              if (burgerRef.current) {
                burgerRef.current.checked = false;
              }
            }}
          >
            {t('contactLink')}
          </Link>
          <div className={styles.languageSelectorWrapper}>
            <LanguageSelector />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
