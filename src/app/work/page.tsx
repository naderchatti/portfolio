'use client';

import React from 'react';
import styles from './Work.module.css';
import { works } from '@/common/data';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Work = () => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <h2 className={styles.title}>Work</h2>
        <p className={styles.description}>The projects I&apos;ve worked on.</p>
      </section>

      <section className={styles.works}>
        <div className={styles.worksCards}>
          {works.map((work) => (
            <div
              className={styles.workCard}
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
