import React from 'react';
import {
  IconCheck,
  IconAlertTriangle,
  IconExclamationCircle,
  IconInfoCircle,
} from '@tabler/icons-react';

interface ToastIconByVariantProps {
  variant: 'confirmation' | 'warning' | 'error' | 'info';
}

// Component to render icon based on variant
export const ToastIconByVariant: React.FC<ToastIconByVariantProps> = ({
  variant,
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
