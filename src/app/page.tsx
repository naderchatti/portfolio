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
            <h3>Hello, I&apos;m</h3>
            <h1 className={styles.name}>Nader CHATTI</h1>
            <h3 className={styles.role}>Full Stack Engineer</h3>
          </div>
        </section>

        <section>
          <div className={styles.frameworks}>
            <h2>My skills</h2>
            <FrameworkSlider />
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
