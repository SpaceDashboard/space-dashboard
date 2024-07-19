import React, { FunctionComponent } from 'react';
import { Tooltip, TooltipPlacement } from './Tooltip';
import { IconProps } from '@tabler/icons-react';

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
  children?: React.ReactNode;
  ariaLabel?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  Icon?: FunctionComponent<IconProps>;
  iconSize?: number;
  iconStrokeWidth?: number;
  /** Controls Tooltip specific props */
  isPanelAction?: boolean;
  onClick?: (p: any) => void;
  tooltipDelay?: number;
  tooltipOffset?: [number, number];
  tooltipPlacement?: TooltipPlacement;
  tooltipTitle?: string;
  variantsList?: Variant[];
}

export const Button = ({
  children,
  ariaLabel,
  buttonType = 'button',
  disabled = false,
  Icon,
  iconSize = 18,
  iconStrokeWidth = 1.5,
  isPanelAction = false,
  onClick = () => {},
  tooltipDelay = 0,
  tooltipOffset = [0, 0],
  tooltipPlacement = 'top',
  tooltipTitle,
  variantsList = [],
}: React.PropsWithChildren<ButtonProps>) => {
  const variantClasses = variantsList.map((variant) => variant).join(' ');

  return (
    <Tooltip
      delay={isPanelAction ? 600 : tooltipDelay}
      tooltipOffset={isPanelAction ? [0, 6] : tooltipOffset}
      placement={isPanelAction ? 'bottom' : tooltipPlacement}
      title={tooltipTitle}
    >
      <button
        aria-label={ariaLabel}
        className={`button ${variantClasses}`}
        disabled={disabled}
        onClick={onClick}
        type={buttonType}
      >
        <span className="button-content-wrapper">
          {Icon && (
            <Icon
              height={iconSize}
              width={iconSize}
              strokeWidth={iconStrokeWidth}
            />
          )}
          {children && children}
        </span>
      </button>
    </Tooltip>
  );
};
