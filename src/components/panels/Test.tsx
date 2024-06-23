import React from 'react';
import { Panel, PanelProps } from 'src/components/base';

export const Test: React.FC<PanelProps> = ({ ...props }) => {
  return (
    <Panel height={200} {...props}>
      <p>Test</p>
    </Panel>
  );
};
