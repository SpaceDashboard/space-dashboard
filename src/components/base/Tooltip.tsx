import React from 'react';
import MuiTooltip from '@mui/material/Tooltip';
import { Fade } from '@mui/material';
import { css } from '@emotion/css';
import { useSettingsContext } from 'src/hooks';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  children: React.ReactElement;
  delay?: number;
  title?: string;
  placement?: TooltipPlacement;
  tooltipOffset?: [number, number];
}

export const Tooltip = ({
  children,
  delay = 0,
  title = '',
  placement = 'top',
  tooltipOffset = [0, 0],
}: React.PropsWithChildren<TooltipProps>) => {
  const {
    settings: { reduceMotion },
  } = useSettingsContext();
  return (
    <MuiTooltip
      enterDelay={delay}
      placement={placement}
      title={title}
      TransitionComponent={Fade}
      classes={{
        tooltip: css`
          transition: ${reduceMotion ? 0 : 0.2}s opacity ease !important;
        `,
      }}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: tooltipOffset,
              },
            },
          ],
        },
      }}
    >
      {children}
    </MuiTooltip>
  );
};
