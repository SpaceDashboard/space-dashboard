import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { CornersWrapper, TooltipWrapper } from 'src/components/base';
import { useSettingsContext } from 'src/hooks';

interface ModalProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

const modalCss = (reduceMotion: boolean, speedAdjustment: number) => css`
  --modal--transition-duration: ${reduceMotion ? 0 : 0.3 * speedAdjustment}s;
  --modal--close-btn--transition-duration: ${reduceMotion
    ? 0
    : 0.08 * speedAdjustment}s;
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
  const {
    settings: { animationSpeedAdjustment, reduceMotion },
  } = useSettingsContext();
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
        modalCss(reduceMotion, animationSpeedAdjustment),
        { open: isOpen },
        css`
          visibility: ${isContentVisible ? 'visible' : 'hidden'};
        `,
      )}
    >
      <TooltipWrapper
        title="Close"
        delay={500}
        placement="left"
        tooltipOffset={10}
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
      </TooltipWrapper>
      <CornersWrapper size={25} height="100%" className={modalInnerCss}>
        {children}
      </CornersWrapper>
    </div>
  );
};
