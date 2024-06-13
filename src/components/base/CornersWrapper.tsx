import React from 'react';

export const CornersWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="corners-wrapper">
      <div className="corners-wrapper__inner">{children}</div>
    </div>
  );
};
