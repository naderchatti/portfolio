'use client';

import styles from './Navbar.module.css';
import { useResponsive } from '@/context/ResponsiveContext';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const { isMobile } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);
  const menuCheckboxRef = useRef(null);

  const toggleDrawer = () => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = !prevIsOpen;
      const current = menuCheckboxRef.current as HTMLInputElement | null;
      if (current) {
        current.checked = newIsOpen;
      }
      return newIsOpen;
    });
  };

  return (
    <>
      <div className={styles.navbar}>
        <h1
          className={styles.logo}
          onClick={() => {
            router.push('/');
          }}
        >
          Nader.
        </h1>
        {isMobile ? (
          <input
            type="checkbox"
            role="button"
            aria-label="Menu"
            className={styles.menuButton}
            onClick={toggleDrawer}
            ref={menuCheckboxRef}
          />
        ) : (
          <div className={styles.navLinks}>
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </div>
        )}
      </div>
      {isMobile && <Drawer toggleDrawer={toggleDrawer} isOpen={isOpen} />}
    </>
  );
};

export default Navbar;

const Drawer = ({
  toggleDrawer,
  isOpen,
}: {
  toggleDrawer: () => void;
  isOpen: boolean;
}) => {
  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
      <Link href="/" onClick={toggleDrawer}>
        Home
      </Link>
      <Link href="/blog" onClick={toggleDrawer}>
        Blog
      </Link>
      <Link href="/contact" onClick={toggleDrawer}>
        Contact
      </Link>
    </div>
  );
};
