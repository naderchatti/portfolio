'use client';

import React, { useRef, useEffect, useState, createRef } from 'react';
import styles from './Work.module.css';
import { works } from '@/common/data';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Work = () => {
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
        <h2 className={styles.title}>Work</h2>
        <p className={styles.description}>The projects I&apos;ve worked on.</p>
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
              onClick={() => router.push(`/work/${work.id}`)}
            >
              <div className={styles.workCardImageWrapper}>
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.workCardImage}
                />
              </div>
              <div className={styles.workCardBar}>
                <h1 className={styles.workCardTitle}>{work.title}</h1>
                <p className={styles.workCardType}>{work.type}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Work;
