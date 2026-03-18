import React from 'react';
import { FlexWrapper } from 'src/components/base';

export const LiveBadge: React.FC = () => {
  return (
    <div className="live-badge">
      <FlexWrapper gap={3} alignItems="center" flexDirection="row">
        <div className="live-indicator"></div>
        {'LIVE'}
      </FlexWrapper>
    </div>
  );
};
