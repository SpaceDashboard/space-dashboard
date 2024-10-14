import { toast as fireToast } from 'react-toastify';
import { ToastContent } from './ToastContent';

// Type for toast variants
export type Variants = 'confirmation' | 'warning' | 'error' | 'info';

interface ToastOptionsProps {
  showIcon?: boolean;
  variant?: Variants;
  onCloseClick?: () => void;
}

/**
 * Show a toast notification.
 *
 * @param content - The content to display in the toast.
 * @param options - Optional settings for the toast. See ToastOptionsProps for details.
 * @param isPersistent - Optional, whether the toast automatically disappears or not.
 */
export const showToast = (
  content: JSX.Element | string,
  options?: ToastOptionsProps,
  isPersistent?: boolean,
) => {
  fireToast(<ToastContent content={content} options={options} />, {
    containerId: isPersistent
      ? 'persistent-toast-container'
      : 'base-toast-container',
  });
};

// Dismiss all active toasts
showToast.dismiss = fireToast.dismiss;

// Clear waiting queue of toasts beyond the current limit
showToast.clearWaitingQueue = (isPersistent?: boolean) => {
  fireToast.clearWaitingQueue({
    containerId: isPersistent
      ? 'persistent-toast-container'
      : 'base-toast-container',
  });
};
