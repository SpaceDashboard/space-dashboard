import React from 'react';
import { css, cx } from '@emotion/css';
import {
  ToastContainer as ToastifyContainer,
  Slide,
  ToastContainerProps,
} from 'react-toastify';
import { useSettingsContext } from 'src/hooks';

// Toast container wrapper styles based on `reduceMotion` setting
const toastContainerWrapperCss = (reduceMotion: boolean) => css`
  --toast--transition-duration: ${reduceMotion ? 0 : 0.2}s !important;

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

const toastContainerProps: ToastContainerProps = {
  autoClose: 5000,
  closeButton: false,
  closeOnClick: false,
  containerId: 'base-toast-container',
  draggable: false,
  hideProgressBar: true,
  limit: 10,
  pauseOnFocusLoss: false,
  pauseOnHover: true,
  position: 'top-center',
  transition: Slide,
};

// ToastContainer component for rendering toasts
export const ToastContainer: React.FC = () => {
  const {
    settings: { reduceMotion },
  } = useSettingsContext();

  return (
    <div
      className={cx(
        'toast-container-wrapper',
        toastContainerWrapperCss(reduceMotion),
      )}
    >
      <ToastifyContainer {...toastContainerProps} />
    </div>
  );
};

export const PersistentToastContainer: React.FC = () => {
  const {
    settings: { reduceMotion },
  } = useSettingsContext();

  return (
    <div
      className={cx(
        'toast-container-wrapper',
        toastContainerWrapperCss(reduceMotion),
      )}
    >
      <ToastifyContainer
        {...toastContainerProps}
        autoClose={false}
        containerId="persistent-toast-container"
      />
    </div>
  );
};
