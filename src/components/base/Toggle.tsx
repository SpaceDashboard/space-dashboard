import React, { useEffect, useMemo, useState } from 'react';
import { css, cx } from '@emotion/css';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useSettingsContext } from 'src/hooks';

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
  width?: number | string;
}

export const Toggle: React.FC<ToggleProps> = ({
  ariaLabel = 'Toggle',
  checked,
  id,
  isDisabled,
  justifyContent = 'space-between',
  label,
  onChange,
  width = 'fit-content',
}) => {
  const {
    settings: { reduceMotion },
  } = useSettingsContext();
  const toggleId = useMemo(() => {
    const randomId = Math.random().toString(36).substring(2, 8);
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
    <label
      htmlFor={toggleId}
      className={cx(
        'toggle-switch',
        toggleSwitchCss(reduceMotion, width, justifyContent),
      )}
    >
      <span className="toggle-label">{label}</span>
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
  );
};
