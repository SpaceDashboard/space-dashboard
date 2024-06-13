import React from 'react';

export const Panel = ({ children }: React.PropsWithChildren) => {
  return <div className="panel">{children}</div>;
};
