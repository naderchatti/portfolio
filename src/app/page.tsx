'use client';

import { SkillsSlider } from '@/components/slider/SkillsSlider';
import styles from './page.module.css';
import ButtonText from '@/components/buttons/ButtonText';
import Image from 'next/image';
import { skills, steps, works } from '@/common/data';
import { useRouter } from 'next/navigation';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef, useEffect, useState, createRef } from 'react';
import { title } from 'process';

export default function Home() {
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
      { threshold: 0.1 }
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
          <h1 className={styles.title}>Software Engineer & Developer</h1>
          <span className={styles.subtitle}>
            Premium quality software development services to help your business
            stand out.
          </span>
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
              <h3 className={styles.skillsCardTitle}>{skill.title}</h3>
              <p className={styles.skillsCardDescription}>
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.works}>
        <div className={styles.worksHeader}>
          <h2 className={styles.worksHeaderTitle}>Recent Work</h2>
          <ButtonText
            text="See all"
            iconName="ph_arrow-up-right-light"
            filled={true}
            animation={true}
            action={() => {
              router.push('/work');
            }}
          />
        </div>
        <div className={styles.worksCards}>
          {works.map((work, index) => (
            <div
              key={work.id}
              ref={worksRefs.current[index] as React.RefObject<HTMLDivElement>}
              className={`${styles.workCard} ${
                visibleItems[`work-${index}` as keyof typeof visibleItems]
                  ? styles.animate
                  : ''
              }`}
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

      <section className={styles.steps}>
        <div className={styles.stepsHeader}>
          <h2 className={styles.stepsHeaderTitle}>Your project in 5 steps</h2>
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
                  <span>{`0${index + 1}`}</span>
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
                  <div className={styles.stepsCardDate}>
                    <span>{step.date}</span>
                  </div>
                  <span className={styles.stepsCardSubtitle}>
                    {step.subtitle}
                  </span>
                  <h2 className={styles.stepsCardTitle}>{step.title}</h2>
                  <p className={styles.stepsCardDescription}>
                    {step.description}
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
