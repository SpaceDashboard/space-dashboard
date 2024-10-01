import { toast as fireToast } from 'react-toastify';
import { ToastContent } from './ToastContent';

// Type for toast variants
export type Variants = 'confirmation' | 'warning' | 'error' | 'info';

interface ToastOptionsProps {
  showIcon?: boolean;
  variant?: Variants;
  onCloseClick?: () => void;
}

// Function to display toast
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
