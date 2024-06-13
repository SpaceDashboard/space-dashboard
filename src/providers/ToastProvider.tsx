import React, { createContext, PropsWithChildren } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

export interface ToastContextType {
  showToast: (message: string, severity?: AlertColor) => void;
}

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

interface ToastState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toast, setToast] = React.useState<ToastState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const showToast = (message: string, severity: AlertColor = 'info') => {
    setToast({ open: true, message, severity });
  };

  const handleClose = () => {
    setToast((prevState) => ({ ...prevState, open: false }));
  };

  const getAlertBgColor = (severity: AlertColor): string => {
    switch (severity) {
      case 'error':
        return '#4a1414';
      case 'warning':
        return '#694211';
      case 'info':
        return '#0c3555';
      case 'success':
        return '#1e3520';
      default:
        return '#333';
    }
  };

  const getAlertBorderColor = (severity: AlertColor): string => {
    switch (severity) {
      case 'error':
        return '#752020';
      case 'warning':
        return '#936221';
      case 'info':
        return '#144a7a';
      case 'success':
        return '#2e5230';
      default:
        return '#4d4d4d';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.severity}
          variant="filled"
          sx={{
            backgroundColor: getAlertBgColor(toast.severity),
            border: `1px solid ${getAlertBorderColor(toast.severity)}`,
            color: '#FFF',
            width: '100%',
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export default ToastContext;
