import React from 'react';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { Fade } from '@mui/material';

/* 
  Available additional style classes:
  - flat-bottom
  - secondary
  - small
  - nav
  - toggle-menu (only used with .active for active state visual difference - showing X)
  - active
*/

interface ButtonProps {
  className?: string;
  ariaLabel?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  tooltipPlacement?: TooltipProps['placement'];
  tooltipTitle?: string;
}

export const Button = ({
  className = '',
  ariaLabel,
  buttonType = 'button',
  children,
  onClick = () => {},
  tooltipPlacement = 'top',
  tooltipTitle,
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <Tooltip
      enterDelay={0}
      placement={tooltipPlacement}
      title={tooltipTitle}
      TransitionComponent={Fade}
    >
      <button
        aria-label={ariaLabel}
        className={`button ${className}`}
        onClick={onClick}
        type={buttonType}
      >
        {children}
      </button>
    </Tooltip>
  );
};
