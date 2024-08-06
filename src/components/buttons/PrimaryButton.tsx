import React from 'react';
import styles from './Buttons.module.css';

const PrimaryButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className={`${styles.button} ${styles.primary}`}>{children}</button>
  );
};

export default PrimaryButton;
