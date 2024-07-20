import React from 'react';
import { css, cx } from '@emotion/css';

interface CornersWrapperProps {
  className?: string;
  height?: number | string;
}

const cornersWrapperCss = css`
  height: 100%;
  overflow: auto;
`;

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
      <div
        className={cx('corners-wrapper-content', cornersWrapperCss, className)}
      >
        {children}
      </div>
    </div>
  );
};
