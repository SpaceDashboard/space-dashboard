import React, { useEffect, useMemo, useLayoutEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { Button, TooltipWrapper, Variant } from 'src/components/base';
import { useAppContext, useSettingsContext } from 'src/hooks';
import {
  IconHelpHexagon,
  IconSocial,
  IconAdjustments,
} from '@tabler/icons-react';

const navBarCss = (
  reduceMotion: boolean,
  speedAdjustment: number,
  reduceTransparency: boolean,
) => css`
  --navbar--background-opacity: ${reduceTransparency ? 1 : 0.8} !important;
  --navbar--animation-duration: ${reduceMotion ? 0 : 0.6 * speedAdjustment}s;
  --navbar--animation-delay: ${reduceMotion ? 0 : 0.2 * speedAdjustment}s;
  --navbar--before--animation-delay: ${reduceMotion
    ? 0
    : 0.05 * speedAdjustment}s;

  .logo {
    --navbar--logo--animation-duration: ${reduceMotion
      ? 0
      : 0.3 * speedAdjustment}s;
    --navbar--logo--animation-delay: ${reduceMotion
      ? 0
      : 0.7 * speedAdjustment}s;
  }

  .btn-wrapper {
    /* Using animation to avoid conflicts with button transition styles */
    button {
      animation: ${reduceMotion ? 0 : 0.3 * speedAdjustment}s ease normal
        forwards 1 opacityIn;
    }
  }
`;

const buttonWrapperCss = (
  reduceMotion: boolean,
  speedAdjustment: number,
) => css`
  button {
    animation: ${reduceMotion ? 0 : 0.3 * speedAdjustment}s ease normal forwards
      1 opacityIn;
  }
`;

const buttonDelayInCss = (
  buttonCount: number,
  reduceMotion: boolean,
  speedAdjustment: number,
  showNavDelayMs: number,
) =>
  Array.from(
    { length: buttonCount },
    (_, i) => css`
      button:nth-child(${i + 1}) {
        animation-delay: ${reduceMotion
          ? 0
          : (0.15 + showNavDelayMs * 0.001 + (i + 1) * 0.1) * speedAdjustment}s;
      }
    `,
  );

interface NavButtonProps {
  children: React.ReactNode;
  animationSpeedAdjustment: number;
  reduceMotion: boolean;
  showNavDelayMs: number;
}

const NavButtonContainer: React.FC<NavButtonProps> = ({
  children,
  reduceMotion,
  animationSpeedAdjustment,
  showNavDelayMs,
}) => {
  const [buttonCount, setButtonCount] = useState(0);

  useLayoutEffect(() => {
    const count = React.Children.toArray(children).length;
    setButtonCount(count);
  }, [children]);

  return (
    <div
      className={cx(
        'btn-wrapper',
        buttonWrapperCss(reduceMotion, animationSpeedAdjustment),
        buttonDelayInCss(
          buttonCount,
          reduceMotion,
          animationSpeedAdjustment,
          showNavDelayMs,
        ),
      )}
    >
      {children}
    </div>
  );
};

export const NavBar: React.FC = () => {
  const {
    isAboutOpen,
    setIsAboutOpen,
    isContactFormOpen,
    setIsContactFormOpen,
    isUserSettingsOpen,
    setIsUserSettingsOpen,
  } = useAppContext();
  const {
    settings: {
      reduceMotion,
      enableLoadingAnimation,
      animationSpeedAdjustment,
      reduceTransparency,
    },
  } = useSettingsContext();

  const closeAllModals = () => {
    setIsAboutOpen(false);
    setIsContactFormOpen(false);
    setIsUserSettingsOpen(false);
  };

  const isLoadingAnimationDisabled = useMemo(
    () => !enableLoadingAnimation || reduceMotion,
    [enableLoadingAnimation, reduceMotion],
  );

  // get current viewport width
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tooltipPlacement = useMemo(() => {
    if (viewportWidth < 540) {
      return 'top';
    }
    return 'right';
  }, [viewportWidth]);

  const showNavDelayMs = useMemo(() => {
    if (viewportWidth < 540) {
      return 0;
    }
    return isLoadingAnimationDisabled ? 0 : 500 * animationSpeedAdjustment;
  }, [viewportWidth]);

  return (
    <nav
      className={navBarCss(
        isLoadingAnimationDisabled,
        animationSpeedAdjustment,
        reduceTransparency,
      )}
    >
      <div className="nav-inner">
        <span className="logo">
          <TooltipWrapper
            placement={tooltipPlacement}
            title="Space Dashboard"
            tooltipOffset={12}
            hideOnTouchDevice={true}
          >
            <img
              src="/img/space-dashboard.svg"
              width="50"
              height="50"
              alt="Space Dashboard"
              loading="eager"
            />
          </TooltipWrapper>
        </span>
        <NavButtonContainer
          animationSpeedAdjustment={animationSpeedAdjustment}
          reduceMotion={isLoadingAnimationDisabled}
          showNavDelayMs={showNavDelayMs}
        >
          <Button
            ariaLabel="About"
            Icon={IconHelpHexagon}
            onClick={() => {
              closeAllModals();
              setIsAboutOpen(!isAboutOpen);
            }}
            tooltipOffset={12}
            tooltipDelay={500}
            tooltipPlacement={tooltipPlacement}
            tooltipTitle="About"
            variantsList={[
              'secondary',
              'nav',
              ...(isAboutOpen ? (['active'] as Variant[]) : []),
            ]}
          />
          <Button
            ariaLabel="Connect with me"
            Icon={IconSocial}
            onClick={() => {
              closeAllModals();
              setIsContactFormOpen(!isContactFormOpen);
            }}
            tooltipOffset={12}
            tooltipDelay={500}
            tooltipPlacement={tooltipPlacement}
            tooltipTitle="Connect with me"
            variantsList={[
              'secondary',
              'nav',
              ...(isContactFormOpen ? (['active'] as Variant[]) : []),
            ]}
          />
          <Button
            ariaLabel="Settings"
            Icon={IconAdjustments}
            onClick={() => {
              closeAllModals();
              setIsUserSettingsOpen(!isUserSettingsOpen);
            }}
            tooltipOffset={12}
            tooltipDelay={500}
            tooltipPlacement={tooltipPlacement}
            tooltipTitle="Settings"
            variantsList={[
              'secondary',
              'nav',
              ...(isUserSettingsOpen ? (['active'] as Variant[]) : []),
            ]}
          />
        </NavButtonContainer>
      </div>
    </nav>
  );
};
