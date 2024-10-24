// Deprecated already?
import React, { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/css';
import { useAppContext, usePanelContext, useSettingsContext } from 'src/hooks';

const fadeInFromBlackCss = (
  isLoading: boolean,
  delayedAnimationSeconds: number,
  reduceMotion?: boolean,
  isFadedIn?: boolean,
) => css`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  height: 100%;
  width: 100%;

  &::after {
    background-color: ${isLoading ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0)'};
    content: '';
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: ${reduceMotion ? 0 : 1}s background-color ease;
    transition-delay: ${reduceMotion ? 0 : delayedAnimationSeconds}s;
    width: 100%;
    z-index: 1;
    visibility: ${isFadedIn ? 'hidden' : 'visible'};
  }
`;

export const FadeFromBlack = ({ children }: React.PropsWithChildren) => {
  const { navAnimationSeconds } = useAppContext();
  const {
    settings: { reduceMotion, animationSpeedAdjustment },
  } = useSettingsContext();
  const { animationDurationSeconds, animationDelaySeconds } = usePanelContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isFadedIn, setIsFadedIn] = useState(false);
  const delayedAnimationSeconds = useMemo(() => {
    if (!navAnimationSeconds || !animationDurationSeconds) return 0;
    return (
      (animationDurationSeconds ?? 4.5) + (animationDelaySeconds ?? 0) + 0.55
    );
  }, [animationDurationSeconds, animationDelaySeconds, navAnimationSeconds]);

  const timeToFadeIn = useMemo(() => {
    return (
      delayedAnimationSeconds * animationSpeedAdjustment * 1000 +
      (animationDurationSeconds ?? 4.5 * 1000) +
      1000 // transition time
    );
  }, [animationDurationSeconds, animationDelaySeconds, navAnimationSeconds]);

  useEffect(() => {
    if (!navAnimationSeconds || !animationDurationSeconds) return;

    setIsLoading(false);
  }, [animationDurationSeconds, animationDelaySeconds, navAnimationSeconds]);

  useEffect(() => {
    if (isLoading) return;

    setTimeout(
      () => {
        setIsFadedIn(true);
      },
      reduceMotion ? 0 : timeToFadeIn,
    );
  }, [isLoading]);

  return (
    <span
      className={fadeInFromBlackCss(
        isLoading,
        delayedAnimationSeconds * animationSpeedAdjustment,
        reduceMotion,
        isFadedIn,
      )}
    >
      {children}
    </span>
  );
};
