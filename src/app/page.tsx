'use client';

import { SkillsSlider } from '@/components/slider/SkillsSlider';
import styles from './page.module.css';
import ButtonText from '@/components/buttons/ButtonText';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <Image
          src="/images/N-Logo.svg"
          alt="N-Logo"
          width={500}
          height={500}
          className={styles.heroImage}
        />
        <div className={styles.heroText}>
          <h1 className={styles.title}>Software Engineer & Developer</h1>
          <span className={styles.subtitle}>
            Premium quality software development services to help your business
            stand out.
          </span>
        </div>
      </section>

      <section className={styles.skills}>
        <SkillsSlider />
        <div className={styles.skillsCards}>
          <div className={styles.skillsCard}>
            <span className={styles.skillsCardIndex}>01</span>
            <h3 className={styles.skillsCardTitle}>Backend Development</h3>
            <p className={styles.skillsCardDescription}>
              I have experience with backend development using python, node.js
              and express. Databases used include MongoDB, PostgreSQL, and
              MySQL.
            </p>
          </div>
          <div className={styles.skillsCard}>
            <span className={styles.skillsCardIndex}>02</span>
            <h3 className={styles.skillsCardTitle}>Frontend Development</h3>
            <p className={styles.skillsCardDescription}>
              I have experience with frontend development using React, Next.js
              for web development and React Native for mobile development.
            </p>
          </div>
          <div className={styles.skillsCard}>
            <span className={styles.skillsCardIndex}>03</span>
            <h3 className={styles.skillsCardTitle}>
              Infrastructure & Deployment
            </h3>
            <p className={styles.skillsCardDescription}>
              I have experience with infrastructure using Cloudflare, Google
              Cloud Platform, and custom VPS configurations.
            </p>
          </div>
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
              console.log('clicked');
            }}
          />
        </div>
        <div className={styles.worksCards}>
          <div className={styles.workCard}>
            <div className={styles.workCardImageWrapper}>
              <Image
                src="/images/work1.png"
                alt="MyHotelMatch"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.workCardImage}
              />
            </div>
            <div className={styles.workCardBar}>
              <h1 className={styles.workCardTitle}>MyHotelMatch</h1>
              <p className={styles.workCardType}>Full Stack Development</p>
            </div>
          </div>
          <div className={styles.workCard}>
            <div className={styles.workCardImageWrapper}>
              <Image
                src="/images/work2.png"
                alt="Epsilon Groupe"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.workCardImage}
              />
            </div>
            <div className={styles.workCardBar}>
              <h1 className={styles.workCardTitle}>Epsilon Groupe</h1>
              <p className={styles.workCardType}>Full Stack Development</p>
            </div>
          </div>
          <div className={styles.workCard}>
            <div className={styles.workCardImageWrapper}>
              <Image
                src="/images/work3.png"
                alt="Université Côte d'Azur"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.workCardImage}
              />
            </div>
            <div className={styles.workCardBar}>
              <h1 className={styles.workCardTitle}>
                Université Côte d&apos;Azur
              </h1>
              <p className={styles.workCardType}>Deep Learning</p>
            </div>
          </div>
          <div className={styles.workCard}>
            <div className={styles.workCardImageWrapper}>
              <Image
                src="/images/work4.png"
                alt="HES"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.workCardImage}
              />
            </div>
            <div className={styles.workCardBar}>
              <h1 className={styles.workCardTitle}>HES</h1>
              <p className={styles.workCardType}>Full Stack Development</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.education}>
        <div className={styles.educationHeader}>
          <h2 className={styles.educationHeaderTitle}>Education</h2>
        </div>
        <div className={styles.educationWrapper}>
          <div className={styles.educationTimelineIndicator} />
          <div className={styles.educationCards}>
            <div className={styles.educationCardWrapper}>
              <div className={styles.educationCardIndex}>
                <span>01</span>
              </div>
              <div className={styles.educationCard}>
                <div className={styles.educationCardDate}>
                  <span>2019 - 2020 Nice, France</span>
                </div>
                <h2 className={styles.educationCardTitle}>
                  Université Côte d&apos;Azur
                </h2>
                <p className={styles.educationCardDescription}>
                  M2 MBDS : Master 2 in Big Data and System Integration
                </p>
              </div>
            </div>
            <div className={styles.educationCardWrapper}>
              <div className={styles.educationCardIndex}>
                <span>02</span>
              </div>
              <div className={styles.educationCard}>
                <div className={styles.educationCardDate}>
                  <span>2018 - 2019 Nice, France</span>
                </div>
                <h2 className={styles.educationCardTitle}>
                  Université Côte d&apos;Azur
                </h2>
                <p className={styles.educationCardDescription}>
                  M1 MIAGE : Master 1 Computerized Methods Applied to Business
                  Management
                </p>
              </div>
            </div>
            <div className={styles.educationCardWrapper}>
              <div className={styles.educationCardIndex}>
                <span>03</span>
              </div>
              <div className={styles.educationCard}>
                <div className={styles.educationCardDate}>
                  <span>2013 - 2017 Sousse, Tunisia</span>
                </div>
                <h2 className={styles.educationCardTitle}>ISITCom</h2>
                <p className={styles.educationCardDescription}>
                  Applied License Degree in Computer Networking
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
