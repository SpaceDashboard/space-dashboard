import React, { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/css';
import { useAppContext, usePanelContext, useSettingsContext } from 'src/hooks';

const fadeInFromBlackCss = (
  isLoading: boolean,
  delayedAnimationSeconds: number,
  reduceMotion?: boolean,
) => css`
  align-items: center;
  background-color: ${isLoading ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0)'};
  display: flex;
  filter: brightness(${isLoading ? 0 : 1});
  justify-content: center;
  transition:
    ${reduceMotion ? 0 : 1}s filter ease,
    ${reduceMotion ? 0 : 1}s background-color ease;
  transition-delay: ${reduceMotion ? 0 : delayedAnimationSeconds}s;
  height: 100%;
  width: 100%;
`;

export const FadeFromBlack = ({ children }: React.PropsWithChildren) => {
  const { navAnimationSeconds } = useAppContext();
  const {
    settings: { reduceMotion, animationSpeedAdjustment },
  } = useSettingsContext();
  const { animationDurationSeconds, animationDelaySeconds } = usePanelContext();
  const [isLoading, setIsLoading] = useState(true);
  const delayedAnimationSeconds = useMemo(() => {
    if (!navAnimationSeconds || !animationDurationSeconds) return 0;
    return (
      (animationDurationSeconds ?? 4.5) + (animationDelaySeconds ?? 0) + 1.75
    );
  }, [animationDurationSeconds, animationDelaySeconds, navAnimationSeconds]);

  useEffect(() => {
    if (!navAnimationSeconds || !animationDurationSeconds) return;

    setIsLoading(false);
  }, [animationDurationSeconds, animationDelaySeconds, navAnimationSeconds]);

  return (
    <span
      className={fadeInFromBlackCss(
        isLoading,
        delayedAnimationSeconds * animationSpeedAdjustment,
        reduceMotion,
      )}
    >
      {children}
    </span>
  );
};
