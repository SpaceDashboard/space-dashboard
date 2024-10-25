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
  padding: ${isFullScreen ? '0 70px 0 40px' : '12px 26px'};
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
  canHaveChildrenModals?: boolean;
  className?: string;
  cornerSize?: number;
  isFullScreen?: boolean;
  isOpen?: boolean;
  modalClassName?: string;
  modalPadding?: number;
  setIsOpen?: (isOpen: boolean) => void;
  showCloseButton?: boolean;
}

export const Modal = ({
  canHaveChildrenModals = false,
  children,
  className,
  cornerSize = 12,
  isFullScreen,
  isOpen,
  modalClassName,
  modalPadding = 20,
  setIsOpen,
  showCloseButton = true,
}: React.PropsWithChildren<ModalProps>) => {
  const {
    settings: {
      animationSpeedAdjustment,
      reduceMotion,
      reduceTransparency,
      disableButtonTooltips,
    },
  } = useSettingsContext();
  const [isContentVisible, setIsContentVisible] = useState<boolean>(true);
  const modalRef = React.createRef<HTMLDivElement>();

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
    if (isOpen && isContentVisible && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isContentVisible]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        setIsOpen?.(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, setIsOpen]);

  const renderChildrenWithClosePropagation = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Modal) {
        return React.cloneElement(child, { isOpen: false } as any);
      }
      return child;
    });
  };

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
        modalClassName,
        { open: isOpen },
        css`
          visibility: ${isContentVisible ? 'visible' : 'hidden'};
        `,
      )}
      ref={modalRef}
      tabIndex={0}
    >
      {showCloseButton && (
        <TooltipWrapper
          title="Close"
          delay={500}
          placement="left"
          tooltipOffset={10}
          enabled={!disableButtonTooltips}
        >
          <button
            type="button"
            className="close-modal"
            aria-label="Close modal"
            onClick={() => {
              setIsOpen?.(false);
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
        {canHaveChildrenModals ? (
          <>{isOpen ? children : renderChildrenWithClosePropagation()}</>
        ) : (
          <>{children}</>
        )}
      </CornersWrapper>
    </div>
  );
};
