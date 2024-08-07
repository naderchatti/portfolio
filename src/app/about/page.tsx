import React from 'react';
import styles from './About.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { TfiEmail, TfiGithub, TfiLinkedin, TfiTwitter } from 'react-icons/tfi';

const About = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h2 className={styles.title}>Nader Chatti</h2>
          <p className={styles.subtitle}>
            Delivering Premium Web & Mobile Development Services to Boost Your
            Online Presence.
          </p>
        </div>
      </section>
      <section className={styles.about}>
        <div className={styles.aboutCard}>
          <span className={styles.aboutSubtitle}>Nader Chatti</span>
          <h2 className={styles.aboutTitle}>
            Your Partner in Bringing Your Project to Life
          </h2>
          <p className={styles.aboutDescription}>
            Originally from Tunisia and living in France, I started with a
            Bachelor&apos;s degree in network and telecommunications before
            continuing my studies with a Master&apos;s degree in applied
            management information systems and finishing with a Master&apos;s
            degree in Mobility, Big Data, and Systems Integration.
          </p>
          <p className={styles.aboutDescription}>
            I started working as a developer in 2017 and then as a Deep Learning
            solutions developer in 2019. After obtaining my master&apos;s
            degree, I specialized in Fullstack, web, and Mobile development
            solutions.
          </p>
          <p className={styles.aboutDescription}>
            Today, I assist large companies as well as small clients, both
            professionals and individuals, in developing their solutions.
          </p>
        </div>
        <div className={styles.socials}>
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
        <div className={styles.aboutCard}>
          <span className={styles.aboutSubtitle}>Education</span>
          <div className={styles.education}>
            <div className={styles.educationItem}>
              <div className={styles.educationItemTop}>
                <span className={styles.educationItemTopTitle}>
                  Université Côte d&apos;Azur
                </span>
                <span className={styles.educationItemTopDate}>
                  Nice, France <br /> 2019 - 2020
                </span>
              </div>
              <span className={styles.aboutDescription}>
                M2 MBDS: Master 2 in Big Data and System Integration
              </span>
            </div>
            <div className={styles.educationItem}>
              <div className={styles.educationItemTop}>
                <span className={styles.educationItemTopTitle}>
                  Université Côte d&apos;Azur
                </span>
                <span className={styles.educationItemTopDate}>
                  Nice, France <br /> 2018 - 2019
                </span>
              </div>
              <span className={styles.aboutDescription}>
                M1 MIAGE: Master 1 in Computerized Methods Applied to Business
                Management
              </span>
            </div>
            <div className={styles.educationItem}>
              <div className={styles.educationItemTop}>
                <span className={styles.educationItemTopTitle}>
                  Université Côte d&apos;Azur
                </span>
                <span className={styles.educationItemTopDate}>
                  Sousse, Tunisia <br /> 2013 - 2017
                </span>
              </div>
              <span className={styles.aboutDescription}>
                Applied Licence Degree in Computer Network and
                Telecommunications Techniques
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
