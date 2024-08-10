'use client';

import React from 'react';
import ModalTwoOptions from './ModalTwoOptons';
import { useModal } from '@/context/ModalContext';
import { downloadEnglish, downloadFrench } from '@/common/CommonMethods';
import { useTranslation } from '@/context/TranslationContext';

const ModalComponent = () => {
  const { useTranslations } = useTranslation();
  const t = useTranslations();
  const { modalOpen, toggleShowModal } = useModal();
  if (modalOpen) {
    return (
      <ModalTwoOptions
        title={t('Modal.title')}
        description={t('Modal.description')}
        button1Text={t('Modal.buttonText1')}
        button2Text={t('Modal.buttonText2')}
        action1={() => downloadEnglish(toggleShowModal)}
        action2={() => downloadFrench(toggleShowModal)}
        toggleShowModal={toggleShowModal}
      />
    );
  }
};

export default ModalComponent;
