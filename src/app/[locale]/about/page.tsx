'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from './About.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { TfiEmail, TfiGithub, TfiLinkedin, TfiTwitter } from 'react-icons/tfi';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useTranslation } from '@/context/TranslationContext';
import { education } from '@/common/data';

export const runtime = 'edge';

interface VisibleItems {
  [key: string]: boolean;
}

const About = () => {
  const { useTranslations } = useTranslation();
  const t = useTranslations('About');
  const [aboutRef, isAboutVisible] = useIntersectionObserver();
  const [heroRef, isHeroVisible] = useIntersectionObserver();
  const [educationRef, isEducationVisible] = useIntersectionObserver();
  const [socialsRef, isSocialsVisible] = useIntersectionObserver();

  const [visibleItems, setVisibleItems] = useState<VisibleItems>({});

  return (
    <div className={styles.wrapper}>
      <section
        ref={heroRef as React.LegacyRef<HTMLElement>}
        className={`${styles.hero} ${isHeroVisible ? styles.animate : ''}`}
      >
        <div className={styles.heroText}>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>
      </section>
      <section className={styles.about}>
        <div
          ref={aboutRef as React.LegacyRef<HTMLDivElement>}
          className={`${styles.aboutCard} ${
            isAboutVisible ? styles.animate : ''
          }`}
        >
          <span className={styles.aboutSubtitle}>Nader Chatti</span>
          <h2 className={styles.aboutTitle}>{t('aboutTitle')}</h2>
          <p className={styles.aboutDescription}>{t('aboutDescription1')}</p>
          <p className={styles.aboutDescription}>{t('aboutDescription2')}</p>
          <p className={styles.aboutDescription}>{t('aboutDescription3')}</p>
        </div>
        <div
          ref={socialsRef as React.LegacyRef<HTMLDivElement>}
          className={`${styles.socials} ${
            isSocialsVisible ? styles.animate : ''
          }`}
        >
          <Link
            href="https://www.linkedin.com/in/naderchatti"
            target="_blank"
            className={styles.socialItem}
          >
            <div className={styles.leftSide}>
              <TfiLinkedin size={'1rem'} color="var(--default-icon-color)" />
              <span>LinkedIn</span>
            </div>
            <Image
              src="/icons/ph_arrow-up-right-light.png"
              alt="linkedin"
              width={20}
              height={20}
            />
          </Link>
          <Link
            href="https://github.com/chattinader"
            target="_blank"
            className={styles.socialItem}
          >
            <div className={styles.leftSide}>
              <TfiGithub size={'1rem'} color="var(--default-icon-color)" />
              <span>Github</span>
            </div>
            <Image
              src="/icons/ph_arrow-up-right-light.png"
              alt="linkedin"
              width={20}
              height={20}
            />
          </Link>
          <Link
            href="https://twitter.com/naderchatti"
            target="_blank"
            className={styles.socialItem}
          >
            <div className={styles.leftSide}>
              <TfiTwitter size={'1rem'} color="var(--default-icon-color)" />
              <span>Twitter</span>
            </div>
            <Image
              src="/icons/ph_arrow-up-right-light.png"
              alt="linkedin"
              width={20}
              height={20}
            />
          </Link>
          <Link
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
            target="_blank"
            className={styles.socialItem}
          >
            <div className={styles.leftSide}>
              <TfiEmail size={'1rem'} color="var(--default-icon-color)" />
              <span>Email</span>
            </div>
            <Image
              src="/icons/ph_arrow-up-right-light.png"
              alt="linkedin"
              width={20}
              height={20}
            />
          </Link>
        </div>
        <div
          ref={educationRef as React.LegacyRef<HTMLDivElement>}
          className={`${styles.educationCard} ${
            isEducationVisible ? styles.animate : ''
          }`}
        >
          <span className={styles.aboutSubtitle}>Education</span>
          <div className={styles.education}>
            {education.map((item, index) => (
              <div className={styles.educationItem} key={index}>
                <div className={styles.educationItemTop}>
                  <span className={styles.educationItemTopTitle}>
                    {t(item.title)}
                  </span>
                  <span className={styles.educationItemTopDate}>
                    {t(item.location)} <br /> {t(item.date)}
                  </span>
                </div>
                <span className={styles.aboutDescription}>
                  {t(item.description)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
