'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { TfiLinkedin, TfiGithub, TfiTwitter, TfiEmail } from 'react-icons/tfi';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { useState } from 'react';
import { useResponsive } from '@/context/ResponsiveContext';
import ModalTwoOptions from '@/components/Modal/ModalTwoOptions';
import NextJS from '@/components/CustomSVGs/NextJS';
import React from '@/components/CustomSVGs/React';
import NodeJS from '@/components/CustomSVGs/NodeJS';
import Angular from '@/components/CustomSVGs/Angular';
import Python from '@/components/CustomSVGs/Python';
import HTML from '@/components/CustomSVGs/HTML';
import JS from '@/components/CustomSVGs/JS';
import CSS from '@/components/CustomSVGs/CSS';
import Java from '@/components/CustomSVGs/Java';

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

        <section
          className={styles.frameworks}
          style={
            {
              '--item-width': '100px',
              '--item-height': '50px',
              '--quantity': '9',
            } as React.CSSProperties
          }
        >
          <div className={styles.list}>
            <div
              className={styles.item}
              style={{ '--item-position': '1' } as React.CSSProperties}
            >
              <NextJS />
            </div>
            <div
              className={styles.item}
              style={{ '--item-position': '2' } as React.CSSProperties}
            >
              <React />
            </div>
            <div
              className={styles.item}
              style={{ '--item-position': '3' } as React.CSSProperties}
            >
              <NodeJS />
            </div>
            <div
              className={styles.item}
              style={{ '--item-position': '4' } as React.CSSProperties}
            >
              <Angular />
            </div>
            <div
              className={styles.item}
              style={{ '--item-position': '5' } as React.CSSProperties}
            >
              <Python />
            </div>
            <div
              className={styles.item}
              style={{ '--item-position': '6' } as React.CSSProperties}
            >
              <HTML />
            </div>
            <div
              className={styles.item}
              style={{ '--item-position': '7' } as React.CSSProperties}
            >
              <JS />
            </div>
            <div
              className={styles.item}
              style={{ '--item-position': '8' } as React.CSSProperties}
            >
              <CSS />
            </div>
            <div
              className={styles.item}
              style={{ '--item-position': '9' } as React.CSSProperties}
            >
              <Java />
            </div>
          </div>
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
