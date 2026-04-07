import React, { useEffect, useMemo, useState } from 'react';
import { css, cx } from '@emotion/css';
import { IconCheck, IconX, IconInfoCircle } from '@tabler/icons-react';
import { useSettingsContext } from 'src/hooks';
import { getRandomFloat } from 'src/shared/utils';
import { FlexWrapper, TooltipWrapper } from 'src/components/base';

type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'initial'
  | 'inherit';

const toggleSwitchCss = (
  reduceMotion: boolean,
  width: number | string,
  justifyContent?: string,
  size?: 'sm' | 'md' | 'lg',
) => css`
  justify-content: ${justifyContent};
  width: ${typeof width === 'number' ? `${width}px` : width};

  --toggle--transition-duration: ${reduceMotion ? 0 : 0.08}s !important;
  --toggle--size: ${size === 'sm' ? '14px' : size === 'md' ? '18px' : '24px'};
`;

interface ToggleProps {
  ariaLabel?: string;
  checked?: boolean;
  id?: string;
  isDisabled?: boolean;
  justifyContent?: JustifyContent;
  label?: string | React.ReactNode;
  hideLabelDivider?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
  tooltipDelay?: number;
  width?: number | string;
  wrapperJustifyContent?: JustifyContent;
}

export const Toggle: React.FC<ToggleProps> = ({
  ariaLabel = 'Toggle',
  checked,
  id,
  isDisabled,
  justifyContent = 'space-between',
  label,
  hideLabelDivider = false,
  onChange,
  size = 'md',
  tooltip,
  tooltipDelay = 300,
  width = 'fit-content',
  wrapperJustifyContent = 'flex-start',
}) => {
  const {
    settings: { reduceMotion },
  } = useSettingsContext();
  const toggleId = useMemo(() => {
    const randomId = getRandomFloat().toString(36).substring(2, 8);
    return id ?? randomId;
  }, [id]);
  const isChecked = useMemo(() => {
    if (checked === undefined) {
      return false;
    }
    return checked;
  }, [checked]);
  const [localIsChecked, setLocalIsChecked] = useState(isChecked);

  useEffect(() => {
    setLocalIsChecked(isChecked);
  }, [isChecked]);

  return (
    <FlexWrapper
      flexDirection="row"
      alignItems="center"
      justifyContent={wrapperJustifyContent}
      className="toggle-wrapper"
    >
      {tooltip && (
        <TooltipWrapper title={tooltip} delay={tooltipDelay}>
          <IconInfoCircle
            color="#CCC"
            size={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
          />
        </TooltipWrapper>
      )}
      <label
        htmlFor={toggleId}
        className={cx(
          'toggle-switch',
          toggleSwitchCss(reduceMotion, width, justifyContent, size),
        )}
      >
        {label && (
          <>
            <span
              className={cx('toggle-label', {
                sm: size === 'sm',
                md: size === 'md',
                lg: size === 'lg',
              })}
            >
              {label}
            </span>
            {!hideLabelDivider && (
              <span className="toggle-label-divider"></span>
            )}
          </>
        )}
        <span>
          <input
            aria-label={ariaLabel}
            type="checkbox"
            id={toggleId}
            disabled={isDisabled}
            checked={localIsChecked}
            onChange={() => {
              setLocalIsChecked((prev) => !prev);
              onChange?.(!localIsChecked);
            }}
          />
          <span aria-hidden="true" className="switch">
            <div className="checked-unchecked-wrapper">
              <span className="checked">
                <IconCheck />
              </span>
              <span className="unchecked">
                <IconX />
              </span>
            </div>
            <div className="slider-wrapper">
              <span className="slider"></span>
            </div>
          </span>
        </span>
      </label>
    </FlexWrapper>
  );
};
