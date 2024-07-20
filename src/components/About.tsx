import React from 'react';
import { Modal } from 'src/components/base';
import { useAppContext } from 'src/hooks';

export const About: React.FC = () => {
  const { isAboutOpen, setIsAboutOpen } = useAppContext();

  return (
    <Modal isOpen={isAboutOpen} setIsOpen={setIsAboutOpen}>
      <p>TODO</p>
    </Modal>
  );
};
