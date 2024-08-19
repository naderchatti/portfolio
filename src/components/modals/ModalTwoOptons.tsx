'use client';

import styles from './Modals.module.css';
import { useEffect } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useResponsive } from '@/context/ResponsiveContext';
import PrimaryButton from '../buttons/PrimaryButton';

interface ModalTwoOptionsProps {
  title: string;
  description: string;
  button1Text: string;
  button2Text: string;
  action1: () => void;
  action2: () => void;
  toggleShowModal: () => void;
}

const ModalTwoOptions = ({
  title,
  description,
  button1Text,
  button2Text,
  action1,
  action2,
  toggleShowModal,
}: ModalTwoOptionsProps) => {
  const { isMobile } = useResponsive();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        toggleShowModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleShowModal]);

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      toggleShowModal();
    }
  };

  return (
    <div className={styles.modal} onClick={handleBackdropClick}>
      <div className={styles.modalContainer}>
        <IoCloseSharp
          size={isMobile ? '1.5rem' : '2rem'}
          color={'var(--foreground-color)'}
          className={styles.modalClose}
          onClick={toggleShowModal}
        />
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className={styles.modalButtons}>
          <PrimaryButton onClick={action1}>{button1Text}</PrimaryButton>
          <PrimaryButton onClick={action2}>{button2Text}</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ModalTwoOptions;
