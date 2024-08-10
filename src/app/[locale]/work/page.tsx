'use client';

import React, { useRef, useEffect, useState, createRef } from 'react';
import styles from './Work.module.css';
import { works } from '@/common/data';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useTranslation } from '@/context/TranslationContext';

const Work = () => {
  const { useTranslations, currentLocale } = useTranslation();
  const t = useTranslations('Work');
  const router = useRouter();
  const [heroRef, isHeroVisible] = useIntersectionObserver();
  const [workRefs, setWorkRefs] = useState<React.RefObject<HTMLDivElement>[]>(
    []
  );
  const [visibleItems, setVisibleItems] = useState({});

  useEffect(() => {
    setWorkRefs((workRefs) =>
      Array(works.length)
        .fill(0)
        .map((_, i) => workRefs[i] || createRef())
    );
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleItems((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    workRefs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.id = `work-${index}`;
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [workRefs]);

  return (
    <div className={styles.wrapper}>
      <section
        ref={heroRef as React.RefObject<HTMLElement>}
        className={`${styles.hero} ${isHeroVisible ? styles.animate : ''}`}
      >
        <h2 className={styles.title}>{t('title')}</h2>
        <p className={styles.description}>{t('subtitle')}</p>
      </section>

      <section className={styles.works}>
        <div className={styles.worksCards}>
          {works.map((work, index) => (
            <div
              ref={workRefs[index]}
              className={`${styles.workCard} ${
                visibleItems[`work-${index}` as keyof typeof visibleItems]
                  ? styles.animate
                  : ''
              }`}
              key={work.id}
              onClick={() =>
                router.push(`/${currentLocale}/work/${t(work.id)}`)
              }
            >
              <div className={styles.workCardImageWrapper}>
                {(() => {
                  try {
                    const imageSrc = t(work.image);
                    const imageAlt = t(work.title);

                    const isValidImagePath =
                      imageSrc &&
                      (imageSrc.startsWith('/') || imageSrc.startsWith('http'));

                    return isValidImagePath ? (
                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={styles.workCardImage}
                      />
                    ) : (
                      <div className={styles.workCardImage} />
                    );
                  } catch (error) {
                    console.error(
                      `Error rendering image for work ${work.id}:`,
                      error
                    );
                    return <div className={styles.workCardImage} />;
                  }
                })()}
              </div>
              <div className={styles.workCardBar}>
                <h1 className={styles.workCardTitle}>{t(work.title)}</h1>
                <p className={styles.workCardType}>{t(work.type)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Work;
