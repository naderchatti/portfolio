import React from 'react';
import styles from './Buttons.module.css';

const PrimaryButton = ({
  children,
  onClick,
  type,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}) => {
  return (
    <button
      className={`${styles.button} ${styles.primary}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
