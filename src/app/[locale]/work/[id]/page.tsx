/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { works } from '@/common/data';
import styles from './WorkItem.module.css';
import Image from 'next/image';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useTranslation } from '@/context/TranslationContext';

export const runtime = 'edge';

export default function WorkPage({ params }: { params: { id: string } }) {
  const { useTranslations } = useTranslation();
  const t = useTranslations('Work');
  const work = works.find((item) => t(item.id) === params.id);
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
        <h1 className={styles.title}>{t(work.title)}</h1>
        <p className={styles.description}>{t(work.description)}</p>
        <div className={styles.tags}>
          <div className={styles.tag}>
            <span className={styles.tagTitle}>{t('customerLabel')}</span>
            <span className={styles.tagContent}>{t(work.company)}</span>
          </div>
          <div className={styles.tag}>
            <span className={styles.tagTitle}>{t('typeLabel')}</span>
            <span className={styles.tagContent}>{t(work.type)}</span>
          </div>
          <div className={styles.tag}>
            <span className={styles.tagTitle}>{t('startDateLabel')}</span>
            <span className={styles.tagContent}>{t(work.startDate)}</span>
          </div>
          <div className={styles.tag}>
            <span className={styles.tagTitle}>{t('endDateLabel')}</span>
            <span className={styles.tagContent}>{t(work.endDate)}</span>
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
                  width={1000}
                  height={1000}
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
        <div
          ref={servicesRef as React.RefObject<HTMLDivElement>}
          className={`${styles.services} ${
            isServicesVisible ? styles.animate : ''
          }`}
        >
          <h2 className={styles.servicesTitle}>{t('servicesLabel')}</h2>
          <div className={styles.servicesList}>
            {work.services.map((service, index) => (
              <span key={service} className={styles.service}>
                {t(service)}
              </span>
            ))}
          </div>
        </div>
        <div
          ref={stackRef as React.RefObject<HTMLDivElement>}
          className={`${styles.stack} ${isStackVisible ? styles.animate : ''}`}
        >
          <h2 className={styles.stackTitle}>{t('stackLabel')}</h2>
          <div className={styles.stackList}>
            {work.stack.map((item) => (
              <span key={item} className={styles.stackItem}>
                {t(item)}
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
          <p className={styles.aboutTitle}>{t('challengeLabel')}</p>
          <div className={styles.aboutContent}>{t(work.challenge)}</div>
        </div>
        <div
          ref={goalRef as React.RefObject<HTMLDivElement>}
          className={`${styles.about} ${isGoalVisible ? styles.animate : ''}`}
        >
          <p className={styles.aboutTitle}>{t('goalLabel')}</p>
          <div className={styles.aboutContent}>{t(work.goal)}</div>
        </div>
        <div
          ref={resultRef as React.RefObject<HTMLDivElement>}
          className={`${styles.about} ${isResultVisible ? styles.animate : ''}`}
        >
          <p className={styles.aboutTitle}>{t('resultLabel')}</p>
          <div className={styles.aboutContent}>{t(work.result)}</div>
        </div>
      </section>
    </div>
  );
}
