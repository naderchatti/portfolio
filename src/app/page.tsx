'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { TfiLinkedin, TfiGithub, TfiTwitter, TfiEmail } from 'react-icons/tfi';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { useState } from 'react';
import { useResponsive } from '@/context/ResponsiveContext';
import ModalTwoOptions from '@/components/Modal/ModalTwoOptions';
import { FrameworkSlider } from '@/components/Slider/FrameworkSlider';

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
        <section className={styles.hero}>
          <span className={styles.hello}>Hello, I&apos;m</span>
          <h1 className={styles.name}>Nader CHATTI</h1>
          <h4 className={styles.role}>Full Stack Developer</h4>
        </section>

        <section className={styles.frameworks}>
          <FrameworkSlider />
        </section>

        <section className={styles.files}>
          <h5>Download my resume by clicking on the button below</h5>
          <PrimaryButton type="button" action={toggleShowModal}>
            Download Resume
          </PrimaryButton>
        </section>

        <section className={styles.social}>
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
        </section>
      </main>
    </>
  );
}
