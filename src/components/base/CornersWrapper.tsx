import React from 'react';
import { cx } from '@emotion/css';

interface CornersWrapperProps {
  className?: string;
  height?: number | string;
}

export const CornersWrapper = ({
  children,
  ...props
}: React.PropsWithChildren<CornersWrapperProps>) => {
  const { className, height } = props;
  const heightValue = typeof height === 'string' ? height : `${height}%`;
  return (
    <div className="corners-wrapper" style={{ height: heightValue }}>
      <div className="corner-top-left"></div>
      <div className="corner-top-right"></div>
      <div className="corner-bottom-left"></div>
      <div className="corner-bottom-right"></div>
      <div className={cx('corners-wrapper-content', className)}>{children}</div>
    </div>
  );
};
