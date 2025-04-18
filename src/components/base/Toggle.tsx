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
) => css`
  justify-content: ${justifyContent};
  width: ${typeof width === 'number' ? `${width}px` : width};

  --toggle--transition-duration: ${reduceMotion ? 0 : 0.08}s !important;
`;

interface ToggleProps {
  ariaLabel?: string;
  checked?: boolean;
  id?: string;
  isDisabled?: boolean;
  justifyContent?: JustifyContent;
  label?: string | React.ReactNode;
  onChange?: (checked: boolean) => void;
  tooltip?: string;
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
  onChange,
  tooltip,
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
    >
      {tooltip && (
        <TooltipWrapper title={tooltip} delay={300}>
          <IconInfoCircle color="#CCC" size={20} />
        </TooltipWrapper>
      )}
      <label
        htmlFor={toggleId}
        className={cx(
          'toggle-switch',
          toggleSwitchCss(reduceMotion, width, justifyContent),
        )}
      >
        {label && (
          <>
            <span className="toggle-label">{label}</span>
            <span className="toggle-label-divider"></span>
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
