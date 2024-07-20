import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { CornersWrapper, Tooltip } from 'src/components/base';

interface ModalProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

const modalCss = css`
  /* transition: 0.3s all ease; */
`;

const modalInnerCss = css`
  bottom: 20px;
  height: auto;
  left: 0;
  padding: 0 40px;
  position: absolute;
  right: 0;
  top: 20px;
`;

export const Modal = ({
  children,
  isOpen,
  setIsOpen,
}: React.PropsWithChildren<ModalProps>) => {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setIsContentVisible(true);
    } else {
      const timeoutId = setTimeout(() => {
        setIsContentVisible(false);
      }, 200); // For reference, CSS transition time is 0.15s

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        setIsOpen && setIsOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      className={cx(
        'modal',
        modalCss,
        { open: isOpen },
        css`
          visibility: ${isContentVisible ? 'visible' : 'hidden'};
        `,
      )}
    >
      <Tooltip
        title="Close"
        delay={500}
        placement="left"
        tooltipOffset={[0, 10]}
      >
        <button
          type="button"
          className="close-modal"
          aria-label="Close modal"
          onClick={() => {
            setIsOpen && setIsOpen(false);
          }}
        >
          <span></span>
          <span></span>
        </button>
      </Tooltip>
      <CornersWrapper size={25} height="100%" className={modalInnerCss}>
        {children}
      </CornersWrapper>
    </div>
  );
};
