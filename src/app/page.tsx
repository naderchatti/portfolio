'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { TfiLinkedin, TfiGithub, TfiTwitter, TfiEmail } from 'react-icons/tfi';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { useState } from 'react';
import { useResponsive } from '@/context/ResponsiveContext';
import ModalTwoOptions from '@/components/Modal/ModalTwoOptions';
import { FrameworkSlider } from '@/components/Slider/FrameworkSlider';
import LandingAnimation from '@/components/LandingAnimation/LandingAnimation';
import { ProgrammingLanguagesSlider } from '@/components/Slider/ProgrammingLanguagesSlider';
import { DatabaseSlider } from '@/components/Slider/DatabaseSlider';

export default function Home() {
  const { isMobile } = useResponsive();
  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  const downloadEnglish = () => {
    downloadResume(
      '/documents/CV_Nader_CHATTI_EN.pdf',
      'CV Nader CHATTI EN.pdf'
    );
    toggleShowModal();
  };

  const downloadFrench = () => {
    downloadResume(
      '/documents/CV_Nader_CHATTI_FR.pdf',
      'CV Nader CHATTI FR.pdf'
    );
    toggleShowModal();
  };

  const downloadResume = (path: string, filename: string) => {
    const link = document.createElement('a');
    link.href = path;
    link.target = '_blank';
    link.setAttribute('download', filename);
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <>
      {showModal && (
        <ModalTwoOptions
          title="Download Resume"
          description="Download my PDF resume English or French"
          button1Text="English"
          button2Text="French"
          action1={downloadEnglish}
          action2={downloadFrench}
          toggleShowModal={toggleShowModal}
        />
      )}
      <main className={styles.main}>
        <section>
          <LandingAnimation />

          <div className={styles.hero}>
            <h2>Hello, I&apos;m</h2>
            <h1 className={styles.name}>Nader CHATTI</h1>
            <h3 className={styles.role}>Software Engineer</h3>
          </div>
        </section>

        <section className={styles.aboutSection}>
          <div className={styles.about}>
            <h2>About Me</h2>
            <p>
              I am a software engineer, specializing in building exceptional
              digital experiences. <br />
              As a full stack developer, I have a passion for creating clean
              architecture and continuously learning new technologies.
              <br />
              <br />
              I am located in France and as a free-lancer, I work from every
              corner of the world. <br />
              So if you need the expert touch in your project, I can be your
              partner.
            </p>
          </div>
        </section>

        <section>
          <h2>My skills</h2>
          <div className={styles.skills}>
            <div className={styles.skillsItem}>
              <h3>Frameworks</h3>
              <FrameworkSlider />
            </div>
            <div className={styles.skillsItem}>
              <h3>Programming languages</h3>
              <ProgrammingLanguagesSlider />
            </div>
            <div className={styles.skillsItem}>
              <h3>Databases</h3>
              <DatabaseSlider />
            </div>
          </div>
        </section>

        <section>
          <div className={styles.files}>
            <h2>Download my resume</h2>
            <PrimaryButton type="button" action={toggleShowModal}>
              Download Resume
            </PrimaryButton>
          </div>
          <div className={styles.social}>
            <h2>Find me on socials</h2>
            <div className={styles.iconContainer}>
              <Link
                href="https://www.linkedin.com/in/naderchatti"
                target="_blank"
                className={styles.icon}
              >
                <TfiLinkedin size={isMobile ? '1rem' : '2rem'} />
              </Link>
              <Link
                href="https://github.com/chattinader"
                target="_blank"
                className={styles.icon}
              >
                <TfiGithub size={isMobile ? '1rem' : '2rem'} />
              </Link>
              <Link
                href="https://twitter.com/naderchatti"
                target="_blank"
                className={styles.icon}
              >
                <TfiTwitter size={isMobile ? '1rem' : '2rem'} />
              </Link>
              <Link
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                target="_blank"
                className={styles.icon}
              >
                <TfiEmail size={isMobile ? '1rem' : '2rem'} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
