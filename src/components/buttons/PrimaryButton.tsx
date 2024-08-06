import React from 'react';
import styles from './Buttons.module.css';

const PrimaryButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button className={`${styles.button} ${styles.primary}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimaryButton;
