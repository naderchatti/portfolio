'use client';

import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';
import { TfiLinkedin, TfiGithub, TfiTwitter, TfiEmail } from 'react-icons/tfi';
import ButtonText from '../buttons/ButtonText';
import PrimaryButton from '../buttons/PrimaryButton';
import { useRouter } from 'next/navigation';
const Footer = () => {
  const router = useRouter();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.socials}>
          <h1 className={styles.logo}>Nader.</h1>
          <div className={styles.socialsIcons}>
            <Link
              href="https://www.linkedin.com/in/naderchatti"
              target="_blank"
              className={styles.socialLink}
            >
              <div className={styles.icon}>
                <TfiLinkedin size={'1rem'} color="var(--default-icon-color)" />
              </div>
              <span>LinkedIn</span>
            </Link>
            <Link
              href="https://github.com/chattinader"
              target="_blank"
              className={styles.socialLink}
            >
              <div className={styles.icon}>
                <TfiGithub size={'1rem'} color="var(--default-icon-color)" />
              </div>
              <span>GitHub</span>
            </Link>
            <Link
              href="https://twitter.com/naderchatti"
              target="_blank"
              className={styles.socialLink}
            >
              <div className={styles.icon}>
                <TfiTwitter size={'1rem'} color="var(--default-icon-color)" />
              </div>
              <span>Twitter</span>
            </Link>
            <Link
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
              target="_blank"
              className={styles.socialLink}
            >
              <div className={styles.icon}>
                <TfiEmail size={'1rem'} color="var(--default-icon-color)" />
              </div>
              <span>Email</span>
            </Link>
          </div>
        </div>

        <div className={styles.pages}>
          <h3 className={styles.title}>Pages</h3>
          <Link href="/" className={styles.link}>
            Home
          </Link>
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

        <div className={styles.links}>
          <h3 className={styles.title}>Links</h3>
          <div className={styles.buttons}>
            <PrimaryButton onClick={() => {}}>Download CV</PrimaryButton>
            <PrimaryButton
              onClick={() => {
                router.push('/contact');
              }}
            >
              Let&apos;s talk
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <ButtonText
          iconName="ph_arrow-up-light"
          text="Back to top"
          filled={true}
          animation={false}
          action={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <span>© {new Date().getFullYear()} - All rights reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
