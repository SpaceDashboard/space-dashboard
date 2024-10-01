import React from 'react';
import { css, cx } from '@emotion/css';
import {
  toast as fireToast,
  ToastContainer as ToastifyContainer,
  ToastContainerProps as ToastifyContainerProps,
  Slide,
} from 'react-toastify';
import {
  IconX,
  IconCheck,
  IconInfoCircle,
  IconAlertTriangle,
  IconExclamationCircle,
} from '@tabler/icons-react';
import { useSettingsContext } from 'src/hooks';

export type Variants = 'confirmation' | 'warning' | 'error' | 'info';

interface ToastOptionsProps {
  showIcon?: boolean;
  variant?: Variants;
  onCloseClick?: () => void;
}

interface ToastIconByVariantProps {
  variant: Variants;
}

interface ToastContentProps {
  closeToast?: () => void;
  content: JSX.Element | string;
  options?: ToastOptionsProps;
}

const toastContainerWrapperCss = (reduceMotion: boolean) => css`
  --toast--transition-duration: ${reduceMotion ? 0 : 0.2}s !important;

  /**
    This class and associated keyframe animation needs
    to be defined here, not in a CSS file, and cannot be
    removed otherwise 'autoClose' will NOT work.
    Ick.
  */
  .Toastify__progress-bar {
    animation: trackProgress linear 1;
  }

  @keyframes trackProgress {
    0% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  }
`;

const toastContentWrapperCss = (variant: Variants) => css`
  --toast--bg-color: var(${`--toast--${variant}--bg-color`}) !important;
  --toast--border-color: var(${`--toast--${variant}--border-color`}) !important;
`;

export const useToast = () => {
  const {
    settings: { reduceMotion },
  } = useSettingsContext();

  const ToastIconByVariant: React.FC<ToastIconByVariantProps> = ({
    variant = 'confirmation',
  }) => {
    switch (variant) {
      case 'confirmation':
        return <IconCheck color="white" />;
      case 'warning':
        return <IconAlertTriangle color="white" />;
      case 'error':
        return <IconExclamationCircle color="white" />;
      case 'info':
        return <IconInfoCircle color="white" />;
      default:
        return <IconCheck color="white" />;
    }
  };

  const ToastContent: React.FC<ToastContentProps> = ({
    closeToast,
    content,
    options,
  }) => {
    const {
      showIcon = true,
      variant = 'confirmation',
      onCloseClick,
    } = options ?? {};

    return (
      <div
        className={cx('toast-content-wrapper', toastContentWrapperCss(variant))}
      >
        <span className="toast-content">
          {showIcon && <ToastIconByVariant variant={variant} />}
          <span>{content}</span>
        </span>
        <button
          aria-label="Close"
          className="toast-close-button"
          onClick={() => {
            if (onCloseClick) {
              onCloseClick();
            }
            if (closeToast) {
              closeToast();
            }
          }}
          title="Close"
          type="button"
        >
          <IconX size={16} color="white" />
        </button>
      </div>
    );
  };

  const showToast = (
    content: JSX.Element | string,
    options?: ToastOptionsProps,
  ) => {
    fireToast(<ToastContent content={content} options={options} />, {
      containerId: 'base-toast-container',
    });
  };

  /** Dismiss all active toasts */
  showToast.dismiss = fireToast.dismiss;

  /** Clear waiting queue of toasts beyond the current limit */
  showToast.clearWaitingQueue = () => {
    fireToast.clearWaitingQueue({
      containerId: 'base-toast-container',
    });
  };

  const ToastContainer: React.FC<ToastifyContainerProps> = () => {
    return (
      <div
        className={cx(
          'toast-container-wrapper',
          toastContainerWrapperCss(reduceMotion),
        )}
      >
        <ToastifyContainer
          autoClose={5000}
          closeButton={false}
          closeOnClick={false}
          containerId={'base-toast-container'}
          draggable={false}
          hideProgressBar={true}
          limit={10}
          pauseOnFocusLoss={false}
          pauseOnHover={true}
          position="top-center"
          transition={Slide}
        />
      </div>
    );
  };

  return { showToast, ToastContainer };
};
