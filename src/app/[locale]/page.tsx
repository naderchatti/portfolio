'use client';

import { SkillsSlider } from '@/components/slider/SkillsSlider';
import styles from './page.module.css';
import ButtonText from '@/components/buttons/ButtonText';
import Image from 'next/image';
import { skills, steps, works } from '@/common/data';
import { useRouter } from 'next/navigation';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef, useEffect, useState, createRef } from 'react';
import { useTranslation } from '@/context/TranslationContext';

export const runtime = 'edge';

export default function Home() {
  const { useTranslations, currentLocale } = useTranslation();
  const t = useTranslations('Home');
  const tw = useTranslations('Work');
  const router = useRouter();
  const [heroImageRef, isHeroImageVisible] = useIntersectionObserver();
  const [heroTextRef, isHeroTextVisible] = useIntersectionObserver();
  const [sliderWrapperRef, isSliderWrapperVisible] = useIntersectionObserver();

  const skillsRefs = useRef([...Array(3)].map(() => createRef()));
  const worksRefs = useRef(works.map(() => createRef()));
  const stepsRefs = useRef([...Array(5)].map(() => createRef()));

  const [visibleItems, setVisibleItems] = useState({});

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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    skillsRefs.current.forEach((ref, index) => {
      if (ref.current instanceof Element) {
        ref.current.id = `skill-${index}`;
        observer.observe(ref.current);
      }
    });

    worksRefs.current.forEach((ref, index) => {
      if (ref.current instanceof Element) {
        ref.current.id = `work-${index}`;
        observer.observe(ref.current);
      }
    });

    stepsRefs.current.forEach((ref, index) => {
      if (ref.current instanceof Element) {
        ref.current.id = `step-${index}`;
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <div
          ref={heroImageRef as React.RefObject<HTMLDivElement>}
          className={`${styles.heroImage} ${
            isHeroImageVisible ? styles.animate : ''
          }`}
        >
          <Image
            src="/images/N-Logo.svg"
            alt="N-Logo"
            width={500}
            height={500}
          />
        </div>
        <div
          ref={heroTextRef as React.RefObject<HTMLDivElement>}
          className={`${styles.heroText} ${
            isHeroTextVisible ? styles.animate : ''
          }`}
        >
          <h1 className={styles.title}>{t('title')}</h1>
          <span className={styles.subtitle}>{t('subtitle')}</span>
        </div>
      </section>

      <section className={styles.skills}>
        <div
          ref={sliderWrapperRef as React.RefObject<HTMLDivElement>}
          className={`${styles.sliderWrapper} ${
            isSliderWrapperVisible ? styles.animate : ''
          }`}
        >
          <SkillsSlider />
        </div>
        <div className={styles.skillsCards}>
          {skills.map((skill, index) => (
            <div
              key={`skill-${index}`}
              ref={skillsRefs.current[index] as React.RefObject<HTMLDivElement>}
              className={`${styles.skillsCard} ${
                visibleItems[`skill-${index}` as keyof typeof visibleItems]
                  ? styles.animate
                  : ''
              }`}
            >
              <span className={styles.skillsCardIndex}>{skill.index}</span>
              <h3 className={styles.skillsCardTitle}>{t(skill.titleKey)}</h3>
              <p className={styles.skillsCardDescription}>
                {t(skill.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.works}>
        <div className={styles.worksHeader}>
          <h2 className={styles.worksHeaderTitle}>{t('worksHeaderTitle')}</h2>
          <ButtonText
            text={t('worksButton')}
            iconName="ph_arrow-up-right-light"
            filled={true}
            animation={true}
            action={() => {
              router.push(`/${currentLocale}/work`);
            }}
          />
        </div>
        <div className={styles.worksCards}>
          {works.slice(0, 4).map((work, index) => (
            <div
              key={work.id}
              ref={worksRefs.current[index] as React.RefObject<HTMLDivElement>}
              className={`${styles.workCard} ${
                visibleItems[`work-${index}` as keyof typeof visibleItems]
                  ? styles.animate
                  : ''
              }`}
              onClick={() =>
                router.push(`/${currentLocale}/work/${tw(work.id)}`)
              }
            >
              <div className={styles.workCardImageWrapper}>
                {(() => {
                  try {
                    const imageSrc = tw(work.image);
                    const imageAlt = tw(work.title);

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
                <h1 className={styles.workCardTitle}>{tw(work.title)}</h1>
                <p className={styles.workCardType}>{tw(work.type)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.steps}>
        <div className={styles.stepsHeader}>
          <h2 className={styles.stepsHeaderTitle}>{t('stepsHeaderTitle')}</h2>
        </div>
        <div className={styles.stepsWrapper}>
          <div className={styles.stepsTimelineIndicator}>
            <div className={styles.stepsTimelineIndicatorIcon}>
              <span>
                <Image
                  src="/icons/ph_arrow-down-light.png"
                  alt="N-Logo"
                  width={24}
                  height={24}
                />
              </span>
            </div>
            <div className={styles.stepsTimelineIndicatorIcon}>
              <span>
                <Image
                  src="/icons/ph_check-light.png"
                  alt="N-Logo"
                  width={24}
                  height={24}
                />
              </span>
            </div>
          </div>
          <div className={styles.stepsCards}>
            {steps.map((step, index) => (
              <div key={`step-${index}`} className={styles.stepsCardWrapper}>
                <div className={styles.stepsCardIndex}>
                  <span>{t(`steps.${index}.index`)}</span>
                </div>
                <div
                  ref={
                    stepsRefs.current[index] as React.RefObject<HTMLDivElement>
                  }
                  className={`${styles.stepsCard} ${
                    visibleItems[`step-${index}` as keyof typeof visibleItems]
                      ? styles.animate
                      : ''
                  }`}
                >
                  <span className={styles.stepsCardSubtitle}>
                    {t(`steps.${index}.subtitle`)}
                  </span>
                  <h2 className={styles.stepsCardTitle}>
                    {t(`steps.${index}.title`)}
                  </h2>
                  <p className={styles.stepsCardDescription}>
                    {t(`steps.${index}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
