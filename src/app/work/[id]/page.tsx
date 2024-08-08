/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { works } from '@/common/data';
import styles from './WorkItem.module.css';
import Image from 'next/image';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export const runtime = 'edge';

export default function WorkPage({ params }: { params: { id: string } }) {
  const work = works.find((item) => item.id === params.id);
  if (!work) {
    return <div>Work not found</div>;
  }

  const [heroRef, isHeroVisible] = useIntersectionObserver();
  const [imageRef, isImageVisible] = useIntersectionObserver();
  const [servicesRef, isServicesVisible] = useIntersectionObserver();
  const [stackRef, isStackVisible] = useIntersectionObserver();
  const [challengeRef, isChallengeVisible] = useIntersectionObserver();
  const [goalRef, isGoalVisible] = useIntersectionObserver();
  const [resultRef, isResultVisible] = useIntersectionObserver();

  return (
    <div className={styles.wrapper}>
      <section
        ref={heroRef as React.RefObject<HTMLElement>}
        className={`${styles.hero} ${isHeroVisible ? styles.animate : ''}`}
      >
        <h1 className={styles.title}>{work.title}</h1>
        <p className={styles.description}>{work.description}</p>
        <div className={styles.tags}>
          <div className={styles.tag}>
            <span className={styles.tagTitle}>Client</span>
            <span className={styles.tagContent}>{work.company}</span>
          </div>
          <div className={styles.tag}>
            <span className={styles.tagTitle}>Type</span>
            <span className={styles.tagContent}>{work.type}</span>
          </div>
          <div className={styles.tag}>
            <span className={styles.tagTitle}>From</span>
            <span className={styles.tagContent}>{work.startDate}</span>
          </div>
          <div className={styles.tag}>
            <span className={styles.tagTitle}>To</span>
            <span className={styles.tagContent}>{work.endDate}</span>
          </div>
        </div>
      </section>
      <section className={styles.content}>
        <div
          ref={imageRef as React.RefObject<HTMLDivElement>}
          className={`${styles.imageWrapper} ${
            isImageVisible ? styles.animate : ''
          }`}
        >
          <Image
            src={work.image}
            alt={work.title}
            width={1000}
            height={1000}
            className={styles.workCardImage}
          />
        </div>
        <div
          ref={servicesRef as React.RefObject<HTMLDivElement>}
          className={`${styles.services} ${
            isServicesVisible ? styles.animate : ''
          }`}
        >
          <h2 className={styles.servicesTitle}>Services</h2>
          <div className={styles.servicesList}>
            {work.services.map((service) => (
              <span key={service} className={styles.service}>
                {service}
              </span>
            ))}
          </div>
        </div>
        <div
          ref={stackRef as React.RefObject<HTMLDivElement>}
          className={`${styles.stack} ${isStackVisible ? styles.animate : ''}`}
        >
          <h2 className={styles.stackTitle}>Stack</h2>
          <div className={styles.stackList}>
            {work.stack.map((item) => (
              <span key={item} className={styles.stackItem}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div
          ref={challengeRef as React.RefObject<HTMLDivElement>}
          className={`${styles.about} ${
            isChallengeVisible ? styles.animate : ''
          }`}
        >
          <p className={styles.aboutTitle}>Challenge</p>
          <div className={styles.aboutContent}>{work.challenge}</div>
        </div>
        <div
          ref={goalRef as React.RefObject<HTMLDivElement>}
          className={`${styles.about} ${isGoalVisible ? styles.animate : ''}`}
        >
          <p className={styles.aboutTitle}>Goal</p>
          <div className={styles.aboutContent}>{work.goal}</div>
        </div>
        <div
          ref={resultRef as React.RefObject<HTMLDivElement>}
          className={`${styles.about} ${isResultVisible ? styles.animate : ''}`}
        >
          <p className={styles.aboutTitle}>Result</p>
          <div className={styles.aboutContent}>{work.result}</div>
        </div>
      </section>
    </div>
  );
}
