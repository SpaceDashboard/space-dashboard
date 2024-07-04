import React, { useEffect, useMemo, useState } from 'react';
import { useAppContext } from '../../hooks';
import { css } from '@emotion/css';
import { usePanelContext } from '../../hooks';

const fadeInFromBlackCss = (
  isLoading: boolean,
  delayedAnimationSeconds: number,
  reduceMotion?: boolean,
) => css`
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

interface FadeFromBlackProps {
  /** Fade time in seconds */
  fadeTime?: number;
}

export const FadeFromBlack = ({
  children,
  fadeTime = 4.5,
}: React.PropsWithChildren<FadeFromBlackProps>) => {
  const { reduceMotion, navAnimationDurationSeconds } = useAppContext();
  const { animationDurationSeconds, animationDelaySeconds } = usePanelContext();
  const [isLoading, setIsLoading] = useState(true);
  const delayedAnimationSeconds = useMemo(() => {
    if (
      reduceMotion ||
      !navAnimationDurationSeconds ||
      !animationDurationSeconds
    )
      return 0;
    return (
      (animationDurationSeconds ?? fadeTime) +
      (animationDelaySeconds ?? 0) +
      navAnimationDurationSeconds
    );
  }, [
    animationDurationSeconds,
    animationDelaySeconds,
    navAnimationDurationSeconds,
    fadeTime,
    reduceMotion,
  ]);

  useEffect(() => {
    if (
      reduceMotion ||
      !navAnimationDurationSeconds ||
      !animationDurationSeconds
    )
      return;

    setIsLoading(false);
  }, [
    animationDurationSeconds,
    animationDelaySeconds,
    navAnimationDurationSeconds,
    reduceMotion,
  ]);

  return (
    <span className={fadeInFromBlackCss(isLoading, delayedAnimationSeconds)}>
      {children}
    </span>
  );
};
