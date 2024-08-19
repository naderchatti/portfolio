import React from 'react';
import styles from './Buttons.module.css';

type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

const PrimaryButton = ({
  children,
  onClick,
  type,
  disabled = false,
}: PrimaryButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles.primary}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
