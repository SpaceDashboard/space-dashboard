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
  IconAlertTriangle,
  IconExclamationCircle,
} from '@tabler/icons-react';

export type Variants = 'confirmation' | 'warning' | 'error';

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

// Styles being overridden originated from 'react-toastify/dist/ReactToastify.css'
const toastContainerStyles = css`
  height: 0;
  position: absolute;
  width: 0;
  z-index: 1000;

  .Toastify__toast-container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    left: 50%;
    position: fixed;
    transform: translateX(-50%);
    width: auto;
  }

  .Toastify__toast {
    align-self: center;
    border-radius: 100px;
    box-shadow:
      0 1px 8px 0 rgba(0, 0, 0, 0.9),
      0 2px 12px 0 rgba(0, 0, 0, 0.8);
    box-sizing: border-box;
    cursor: default;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    max-width: 850px;
    min-height: auto;
    min-width: 280px;
    overflow: visible;
    padding: 0;
    position: relative;
    transition:
      0.2s ease all,
      0.3s flex ease;
    z-index: 1001;

    a {
      margin-left: 4px;
    }
  }

  .Toastify__toast-body {
    display: flex;
    margin: 0;
    padding: 0;
    width: 100%;

    > div:last-child {
      flex: 1;
    }
  }

  .Toastify__slide-enter--top-center,
  .Toastify__slide-exit--top-center {
    animation-fill-mode: both;
    animation-duration: 0.2s;
  }

  @keyframes toast-slide-in-down {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.95);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .Toastify__slide-enter--top-center {
    animation-name: toast-slide-in-down;
  }

  @keyframes toast-slide-out-up {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    to {
      opacity: 0;
      transform: translateY(-10px) scale(0.95);
    }
  }

  .Toastify__slide-exit--top-center {
    animation-name: toast-slide-out-up;
  }

  @media only screen and (max-width: 480px) {
    .Toastify__toast-container {
      left: 0;
      margin: 0 0 0 1vw;
      padding: 0;
      width: 98vw;
    }

    .Toastify__toast {
      margin-bottom: 8px;
    }

    .Toastify__toast-container--top-center {
      top: 0;
      transform: translateX(0);
    }
  }
`;

const toastCustomTopStyles = css`
  .Toastify__toast-container {
    top: 15px;
  }
`;

const toastContentWrapperStyles = css`
  align-items: center;
  border-radius: 100px;
  color: #fff;
  display: flex;
  gap: 24px;
  padding: 16px 20px 16px 16px;

  a,
  a:hover {
    color: #fff;
    text-decoration: underline;
  }

  &:before {
    --border-distance: -2px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 100px;
    border: 2px solid transparent;
    bottom: var(--border-distance);
    content: '';
    height: auto;
    left: var(--border-distance);
    position: absolute;
    right: var(--border-distance);
    top: var(--border-distance);
    width: auto;
    z-index: -1;
  }
`;

const toastContentStyles = css`
  align-items: center;
  display: flex;
  flex: 1;
  gap: 8px;
  word-break: break-word;

  span {
    align-items: center;
    flex: 1;
  }
`;

const confirmationStyles = css`
  background-color: #223a18;

  &:before {
    border-color: #628a51;
  }
`;

const warningStyles = css`
  background-color: #7d6016;

  &:before {
    border-color: #e9ad0a;
  }
`;

const errorStyles = css`
  background-color: #511010;

  &:before {
    border-color: #9d2020;
  }
`;

const closeToastStyles = css`
  align-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  margin: 0;
  outline: none;
  padding: 0;
`;

export const useToast = () => {
  const getToastVariantStyles = (variant: Variants) => {
    switch (variant) {
      case 'confirmation':
        return confirmationStyles;
      case 'warning':
        return warningStyles;
      case 'error':
        return errorStyles;
    }
  };

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
        className={cx(
          toastContentWrapperStyles,
          getToastVariantStyles(variant),
          'toast-content',
        )}
      >
        <span className={toastContentStyles}>
          {showIcon && <ToastIconByVariant variant={variant} />}
          <span>{content}</span>
        </span>
        <button
          aria-label="Close"
          className={closeToastStyles}
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
      containerId: 'base-container',
    });
  };

  /** Dismiss all active toasts */
  showToast.dismiss = fireToast.dismiss;

  /** Clear waiting queue of toasts beyond the current limit */
  showToast.clearWaitingQueue = () => {
    fireToast.clearWaitingQueue({
      containerId: 'base-container',
    });
  };

  const ToastContainer: React.FC<ToastifyContainerProps> = () => {
    return (
      <div
        className={cx(
          toastContainerStyles,
          toastCustomTopStyles,
          'toast-container-wrapper',
        )}
      >
        <ToastifyContainer
          autoClose={5000}
          closeButton={false}
          closeOnClick={false}
          containerId={'base-container'}
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
