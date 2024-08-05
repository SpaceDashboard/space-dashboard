import React, { useEffect, useMemo, useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';
import { css, cx } from '@emotion/css';

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
  width: number | string,
  justifyContent?: string,
) => css`
  justify-content: ${justifyContent};
  width: ${typeof width === 'number' ? `${width}px` : width};
`;

export const Toggle: React.FC<{
  checked?: boolean;
  id?: string;
  justifyContent?: JustifyContent;
  label?: string;
  onChange?: (checked: boolean) => void;
  width?: number | string;
}> = ({
  checked,
  id,
  justifyContent = 'space-between',
  label,
  onChange,
  width = 'fit-content',
}) => {
  const toggleId = useMemo(() => id ?? crypto.randomUUID(), [id]);
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
      className={cx('toggle-switch', toggleSwitchCss(width, justifyContent))}
    >
      <span>{label}</span>
      <span>
        <input
          type="checkbox"
          id={toggleId}
          checked={localIsChecked}
          onChange={() => {
            setLocalIsChecked((prev) => !prev);
            onChange?.(!localIsChecked);
          }}
          aria-labelledby={`toggle-label-${toggleId}`}
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
