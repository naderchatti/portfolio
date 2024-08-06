'use client';

import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleShowModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const toggleShowModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen, toggleShowModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
