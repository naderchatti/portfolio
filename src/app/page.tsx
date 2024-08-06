'use client';

import { SkillsSlider } from '@/components/slider/SkillsSlider';
import styles from './page.module.css';
import ButtonText from '@/components/buttons/ButtonText';
import Image from 'next/image';
import ModalTwoOptions from '@/components/modals/ModalTwoOptons';
import { useModal } from '@/context/ModalContext';

export default function Home() {
  const { modalOpen, toggleShowModal } = useModal();

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
              Premium quality software development services to help your
              business stand out.
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

        <section className={styles.steps}>
          <div className={styles.stepsHeader}>
            <h2 className={styles.stepsHeaderTitle}>Your project in 5 steps</h2>
          </div>
          <div className={styles.stepsWrapper}>
            <div className={styles.stepsTimelineIndicator} />
            <div className={styles.stepsCards}>
              <div className={styles.stepsCardWrapper}>
                <div className={styles.stepsCardIndex}>
                  <span>01</span>
                </div>
                <div className={styles.stepsCard}>
                  <div className={styles.stepsCardDate}>
                    <span>2 HOURS</span>
                  </div>
                  <span className={styles.stepsCardSubtitle}>DO WE MATCH?</span>
                  <h2 className={styles.stepsCardTitle}>DISCOVERY CALL</h2>
                  <p className={styles.stepsCardDescription}>
                    Contact me to discuss your project, I will be happy to
                    answer your questions. You can explain your project in
                    detail and I will give you my feedback. I will also give you
                    a quote for the project. I will also give you some advice on
                    how to proceed.
                  </p>
                </div>
              </div>
              <div className={styles.stepsCardWrapper}>
                <div className={styles.stepsCardIndex}>
                  <span>02</span>
                </div>
                <div className={styles.stepsCard}>
                  <div className={styles.stepsCardDate}>
                    <span>1 WEEK</span>
                  </div>
                  <span className={styles.stepsCardSubtitle}>
                    DEFINE THE PROJECT
                  </span>
                  <h2 className={styles.stepsCardTitle}>CONCEPT & STRATEGY</h2>
                  <p className={styles.stepsCardDescription}>
                    I will provide you with a detailed plan for your project.
                    Including the scope of work, the timeline, the budget, and
                    the resources needed. I will also provide you with a quote
                    for the project.
                  </p>
                </div>
              </div>
              <div className={styles.stepsCardWrapper}>
                <div className={styles.stepsCardIndex}>
                  <span>03</span>
                </div>
                <div className={styles.stepsCard}>
                  <div className={styles.stepsCardDate}>
                    <span>1 WEEK</span>
                  </div>
                  <span className={styles.stepsCardSubtitle}>SOME MAGIC</span>
                  <h2 className={styles.stepsCardTitle}>DESIGN</h2>
                  <p className={styles.stepsCardDescription}>
                    As I&apos;m not a designer, if you need a custom design, you
                    will have to provide me with a design. Otherwise, I will
                    provide you with a basic design that I think will fit your
                    project.
                  </p>
                </div>
              </div>
              <div className={styles.stepsCardWrapper}>
                <div className={styles.stepsCardIndex}>
                  <span>04</span>
                </div>
                <div className={styles.stepsCard}>
                  <div className={styles.stepsCardDate}>
                    <span>ESTIMATED TIME</span>
                  </div>
                  <span className={styles.stepsCardSubtitle}>MORE MAGIC</span>
                  <h2 className={styles.stepsCardTitle}>DEVELOPMENT</h2>
                  <p className={styles.stepsCardDescription}>
                    I will proceed to the development of your project. I will
                    keep you updated on the progress of the project. I will
                    provide you with a demo of the project at the end of the
                    development process.
                  </p>
                </div>
              </div>
              <div className={styles.stepsCardWrapper}>
                <div className={styles.stepsCardIndex}>
                  <span>05</span>
                </div>
                <div className={styles.stepsCard}>
                  <div className={styles.stepsCardDate}>
                    <span>2 HOURS</span>
                  </div>
                  <span className={styles.stepsCardSubtitle}>READY TO GO</span>
                  <h2 className={styles.stepsCardTitle}>DEPLOYMENT</h2>
                  <p className={styles.stepsCardDescription}>
                    Depending on your choice, the project will be deployed by me
                    or the necessary resources will be provided to you that you
                    can use to deploy the project yourself.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {modalOpen && (
        <ModalTwoOptions
          title="Download CV"
          description="Download my CV in PDF format"
          button1Text="English"
          button2Text="French"
          action1={downloadEnglish}
          action2={downloadFrench}
          toggleShowModal={toggleShowModal}
        />
      )}
    </>
  );
}
