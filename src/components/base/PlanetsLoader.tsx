import React from 'react';
import { cx } from '@emotion/css';

interface PlanetsLoaderProps {
  showLoader?: boolean;
}

export const PlanetsLoader: React.FC<PlanetsLoaderProps> = ({ showLoader }) => {
  return (
    <div className={cx('refresh-overlay', { visible: showLoader })}>
      <div className="refresh-system">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className={`inner-orbit orbit-${i + 1}`}></div>
        ))}
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className={`inner-orbit-guide orbit-${i + 1}`}></div>
        ))}
        <div className="star"></div>
      </div>
    </div>
  );
};
