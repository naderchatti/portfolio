'use client';

import React from 'react';
import styles from './page.module.css';
import { useTranslation } from '@/context/TranslationContext';

const NotFound = () => {
  const { useTranslations } = useTranslation();
  const t = useTranslations('NotFound');
  return (
    <div className={styles.wrapper}>
      <section className={styles.notFoundWrapper}>
        <h1>404</h1>
        <div className={styles.notFoundDivider} />
        <p>{t('pageNotFound')}</p>
      </section>
    </div>
  );
};

export default NotFound;
