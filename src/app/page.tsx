'use client';

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <span className={styles.hello}>Hello, I&apos;m</span>
        <h1 className={styles.name}>Nader CHATTI</h1>
        <h4 className={styles.role}>Full Stack Developer</h4>
      </section>
    </main>
  );
}
