'use client';

import Image from 'next/image';
import React from 'react';
import styles from './Buttons.module.css';

const ButtonText = ({
  text,
  iconName,
  filled = false,
  animation = false,
  action,
}: {
  text: string;
  iconName: string;
  filled: boolean;
  animation: boolean;
  action: () => void;
}) => {
  return (
    <button className={styles.buttonText} onClick={action}>
      <Image
        src={`/icons/${iconName}.png`}
        alt={`${text} icon`}
        width={24}
        height={24}
        className={`${styles.buttonTextIcon} ${
          filled ? styles.buttonTextIconFilled : ''
        } ${animation ? styles.buttonTextIconAnimation : ''}`}
      />
      <span className={styles.buttonTextContent}>{text}</span>
    </button>
  );
};

export default ButtonText;
