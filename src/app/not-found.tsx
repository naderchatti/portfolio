import React from 'react';
import styles from './page.module.css';

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.notFoundWrapper}>
        <h1>404</h1>
        <div className={styles.notFoundDivider} />
        <p>Page not found</p>
      </section>
    </div>
  );
};

export default NotFound;
