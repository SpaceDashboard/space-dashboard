import React, { useMemo } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipWrapperProps {
  children: React.ReactElement | string;
  enabled?: boolean;
  delay?: number;
  hideOnTouchDevice?: boolean;
  placement?: TooltipPlacement;
  title?: string;
  tooltipOffset?: number;
}

export const TooltipWrapper = ({
  children,
  enabled = true,
  delay = 0,
  hideOnTouchDevice = true,
  title = '',
  placement = 'top',
  tooltipOffset = 8,
}: React.PropsWithChildren<TooltipWrapperProps>) => {
  const child =
    typeof children === 'string'
      ? (React.createElement('span', {}, children) as React.ReactElement)
      : children;
  const isTouchDevice = useMemo(() => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  return (
    <>
      {(isTouchDevice && hideOnTouchDevice) || !enabled ? (
        <>{children}</>
      ) : (
        <>
          {React.cloneElement(child, {
            'data-tooltip-id': 'space-dashboard-tooltip',
            'data-tooltip-content': title,
            'data-tooltip-delay-show': delay,
            'data-tooltip-offset': tooltipOffset,
            'data-tooltip-place': placement,
          })}
        </>
      )}
    </>
  );
};
