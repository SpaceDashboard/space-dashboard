import React from 'react';

export const CornersWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="corners-wrapper">
      <div className="corner-top-left"></div>
      <div className="corner-top-right"></div>
      <div className="corner-bottom-left"></div>
      <div className="corner-bottom-right"></div>
      {children}
    </div>
  );
};
