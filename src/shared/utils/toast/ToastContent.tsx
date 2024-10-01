import React from 'react';
import { css, cx } from '@emotion/css';
import { IconX } from '@tabler/icons-react';
import { ToastIconByVariant } from './ToastIconByVariant';

// Type for toast options
interface ToastOptionsProps {
  showIcon?: boolean;
  variant?: 'confirmation' | 'warning' | 'error' | 'info';
  onCloseClick?: () => void;
}

// Props for ToastContent component
interface ToastContentProps {
  closeToast?: () => void;
  content: JSX.Element | string;
  options?: ToastOptionsProps;
}

// Styles for toast content based on variant
const toastContentWrapperCss = (
  variant: 'confirmation' | 'warning' | 'error' | 'info',
) => css`
  --toast--bg-color: var(${`--toast--${variant}--bg-color`}) !important;
  --toast--border-color: var(${`--toast--${variant}--border-color`}) !important;
`;

// Component to render the toast content
export const ToastContent: React.FC<ToastContentProps> = ({
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
