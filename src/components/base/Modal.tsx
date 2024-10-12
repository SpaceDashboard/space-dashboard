import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { CornersWrapper, TooltipWrapper } from 'src/components/base';
import { useSettingsContext } from 'src/hooks';

const modalCss = (
  reduceMotion: boolean,
  speedAdjustment: number,
  reduceTransparency: boolean,
  isFullScreen?: boolean,
  modalPadding?: number,
) => css`
  --modal--background-opacity: ${reduceTransparency ? 1 : 0.4} !important;
  --modal--transition-duration: ${reduceMotion
    ? 0
    : 0.2 * speedAdjustment}s !important;
  --modal--close-button--transition-duration: ${reduceMotion
    ? 0
    : 0.08 * speedAdjustment}s !important;
  ${!isFullScreen &&
  `
  bottom: ${modalPadding}px;
  left: ${modalPadding}px;
  right: ${modalPadding}px;
  top: ${modalPadding}px;
  `}
`;

const modalInnerCss = (isFullScreen?: boolean) => css`
  padding: ${isFullScreen ? '0 70px 0 40px' : '10px 14px'};
  gap: 10px;
  flex-direction: column;
  display: flex;
  ${isFullScreen &&
  `
  bottom: 20px;
  height: auto;
  left: 0;
  padding: 0 70px 0 40px;
  position: absolute;
  right: 0;
  top: 20px;
  `}
`;

interface ModalProps {
  className?: string;
  cornerSize?: number;
  modalPadding?: number;
  isFullScreen?: boolean;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  showCloseButton?: boolean;
}

export const Modal = ({
  children,
  className,
  cornerSize = 12,
  modalPadding = 20,
  isFullScreen,
  isOpen,
  setIsOpen,
  showCloseButton = true,
}: React.PropsWithChildren<ModalProps>) => {
  const {
    settings: { animationSpeedAdjustment, reduceMotion, reduceTransparency },
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
        isFullScreen && 'full-screen',
        modalCss(
          reduceMotion,
          animationSpeedAdjustment,
          reduceTransparency,
          isFullScreen,
          modalPadding,
        ),
        { open: isOpen },
        css`
          visibility: ${isContentVisible ? 'visible' : 'hidden'};
        `,
      )}
    >
      {showCloseButton && (
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
      )}
      <CornersWrapper
        size={isFullScreen ? 25 : cornerSize}
        height="100%"
        className={cx(className, modalInnerCss(isFullScreen))}
      >
        {children}
      </CornersWrapper>
    </div>
  );
};
