import React, { FC } from 'react';
import { css, cx } from '@emotion/css';
import { Tooltip, TooltipPlacement } from './Tooltip';
import { useSettingsContext } from 'src/hooks';
import { IconProps } from '@tabler/icons-react';

/* 
  Available additional style classes:
  - flat-bottom
  - secondary
  - small
  - nav
  - active
*/

export type Variant = 'flat-bottom' | 'secondary' | 'small' | 'nav' | 'active';

export interface ButtonProps {
  children?: React.ReactNode;
  ariaLabel?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  Icon?: FC<IconProps>;
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

interface PulsingProps {
  isActive?: boolean;
  disabled?: boolean;
}

const Pulsing: FC<PulsingProps> = ({ isActive, disabled }) => {
  const {
    settings: { reduceButtonAnimation },
  } = useSettingsContext();
  const speeds = [...new Array(3)].map(() => Math.random() * 3 + 1.5);

  return (
    <>
      {isActive ? (
        <div className="close-x">
          <span></span>
          <span></span>
        </div>
      ) : (
        <>
          {speeds.map((speed, i) => (
            <div
              key={i}
              className={cx(
                'pulses',
                css`
                  ${reduceButtonAnimation ||
                  (disabled &&
                    `
                  animation: none !important;
                  opacity: 0.6;
                `)}
                  animation-duration: ${speed}s;
                `,
              )}
            />
          ))}
        </>
      )}
    </>
  );
};

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
        <span className="pulse-wrapper">
          <Pulsing
            disabled={disabled}
            isActive={variantsList?.includes('active')}
          />
        </span>
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
