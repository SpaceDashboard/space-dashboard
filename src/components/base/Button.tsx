import React, { useMemo } from 'react';
import { css, cx } from '@emotion/css';
import { TooltipWrapper, TooltipPlacement } from './Tooltip';
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
  className?: string;
  ariaLabel?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  Icon?: React.FC<IconProps>;
  iconSize?: number;
  iconStrokeWidth?: number;
  /** Controls Tooltip specific props */
  isPanelAction?: boolean;
  onClick?: (p: any) => void;
  tooltipDelay?: number;
  tooltipHideOnTouchDevice?: boolean;
  tooltipOffset?: number;
  tooltipPlacement?: TooltipPlacement;
  tooltipTitle?: string;
  variantsList?: Variant[];
}

interface ButtonCornerProps {
  isActive?: boolean;
  isHovered?: boolean;
  isLargeButton?: boolean;
  disabled?: boolean;
}

const ButtonCorner: React.FC<ButtonCornerProps> = ({
  isActive,
  isHovered,
  isLargeButton,
  disabled,
}) => {
  const {
    settings: { reduceButtonAnimation, enableButtonAnimationAlways },
  } = useSettingsContext();
  const speeds = [...new Array(isLargeButton ? 5 : 3)].map(
    () => Math.random() * 1 + 1.25,
  );
  const delays = [...new Array(isLargeButton ? 5 : 3)].map(
    () => Math.random() * 1.25,
  );

  const disableAnimation = useMemo(() => {
    /**
     * If `reduceButtonAnimation` is true or button is disabled, disable animation.
     * `reduceButtonAnimation` will override `enableButtonAnimationAlways`.
     */
    if (reduceButtonAnimation || disabled) {
      return true;
    }

    // On non-hovered state check `enableButtonAnimationAlways`
    if (!isHovered) {
      if (enableButtonAnimationAlways) {
        return false;
      } else {
        return true;
      }
    }

    // If button is hovered, enable animation
    return false;
  }, [reduceButtonAnimation, enableButtonAnimationAlways, disabled, isHovered]);

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
                  ${disableAnimation &&
                  `
                    animation: none !important;
                    opacity: 0.6;
                    transition: 0.2s all ease;
                  `}
                  animation-duration: ${speed}s;
                  animation-delay: ${delays[i]}s;
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
  className,
  ariaLabel,
  buttonType = 'button',
  disabled = false,
  Icon,
  iconSize = 18,
  iconStrokeWidth = 1.5,
  isPanelAction = false,
  onClick = () => {},
  tooltipDelay = 0,
  tooltipHideOnTouchDevice = true,
  tooltipOffset = 0,
  tooltipPlacement = 'top',
  tooltipTitle,
  variantsList = [],
}: React.PropsWithChildren<ButtonProps>) => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const variantClasses = variantsList.map((variant) => variant).join(' ');
  const isActive = variantsList?.includes('active');
  const isLargeButton =
    !variantsList?.includes('nav') && !variantsList?.includes('small');

  return (
    <TooltipWrapper
      delay={isPanelAction ? 500 : tooltipDelay}
      hideOnTouchDevice={tooltipHideOnTouchDevice}
      tooltipOffset={isPanelAction ? 16 : tooltipOffset}
      placement={isPanelAction ? 'bottom' : tooltipPlacement}
      title={tooltipTitle}
    >
      <button
        aria-label={ariaLabel}
        className={cx('button', variantClasses, className)}
        disabled={disabled}
        onClick={onClick}
        type={buttonType}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <span
          className={cx(
            'pulse-wrapper',
            css`
              ${isLargeButton && 'max-width: 16px !important'}
            `,
          )}
        >
          <ButtonCorner
            disabled={disabled}
            isActive={isActive}
            isHovered={isHovered}
            isLargeButton={isLargeButton}
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
    </TooltipWrapper>
  );
};
