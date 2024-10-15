import React from 'react';
import { cx } from '@emotion/css';

interface PlanetsLoaderProps {
  showLoader?: boolean;
}

export const PlanetsLoader: React.FC<PlanetsLoaderProps> = ({ showLoader }) => {
  return (
    <div className={cx('refresh-overlay', { visible: showLoader })}>
      <div className="refresh-system">
        <div className="inner-orbit">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className={`orbit-${i + 1}`}></div>
          ))}
        </div>
        <div className="inner-orbit-guide">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className={`orbit-${i + 1}`}></div>
          ))}
        </div>
        <div className="star"></div>
      </div>
    </div>
  );
};
