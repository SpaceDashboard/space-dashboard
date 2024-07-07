import React, { useMemo } from 'react';
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

export type Variant =
  | 'flat-bottom'
  | 'secondary'
  | 'small'
  | 'nav'
  | 'toggle-menu'
  | 'active';

export interface ButtonProps {
  children: React.ReactNode;
  ariaLabel?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  isActive?: boolean;
  onClick?: () => void;
  tooltipPlacement?: TooltipProps['placement'];
  tooltipTitle?: string;
  variantsList?: Variant[];
}

export const Button = ({
  children,
  ariaLabel,
  buttonType = 'button',
  isActive = false,
  onClick = () => {},
  tooltipPlacement = 'top',
  tooltipTitle,
  variantsList = [],
}: React.PropsWithChildren<ButtonProps>) => {
  const variantClasses = variantsList.map((variant) => variant).join(' ');
  const toggleIsActive = useMemo(() => {
    if (variantsList.includes('toggle-menu')) {
      return isActive;
    }
    return false;
  }, [isActive, variantsList]);

  return (
    <Tooltip
      enterDelay={0}
      placement={tooltipPlacement}
      title={tooltipTitle}
      TransitionComponent={Fade}
    >
      <button
        aria-label={ariaLabel}
        className={`button ${variantClasses} ${toggleIsActive ? 'active' : ''}`}
        onClick={onClick}
        type={buttonType}
      >
        {children}
      </button>
    </Tooltip>
  );
};
