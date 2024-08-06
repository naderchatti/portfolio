'use client';

import React from 'react';
import ModalTwoOptions from './ModalTwoOptons';
import { useModal } from '@/context/ModalContext';
import { downloadEnglish, downloadFrench } from '@/common/CommonMethods';

const ModalComponent = () => {
  const { modalOpen, toggleShowModal } = useModal();
  if (modalOpen) {
    return (
      <ModalTwoOptions
        title="Download CV"
        description="Download my CV in PDF format"
        button1Text="English"
        button2Text="French"
        action1={() => downloadEnglish(toggleShowModal)}
        action2={() => downloadFrench(toggleShowModal)}
        toggleShowModal={toggleShowModal}
      />
    );
  }
};

export default ModalComponent;
