import React from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipWrapperProps {
  children: React.ReactElement;
  delay?: number;
  title?: string;
  placement?: TooltipPlacement;
  tooltipOffset?: number;
}

export const TooltipWrapper = ({
  children,
  delay = 0,
  title = '',
  placement = 'top',
  tooltipOffset = 0,
}: React.PropsWithChildren<TooltipWrapperProps>) => {
  return (
    <>
      {React.cloneElement(children, {
        'data-tooltip-id': 'space-dashboard-tooltip',
        'data-tooltip-content': title,
        'data-tooltip-delay-show': delay,
        'data-tooltip-offset': tooltipOffset,
        'data-tooltip-place': placement,
      })}
    </>
  );
};
