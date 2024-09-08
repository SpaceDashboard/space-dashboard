import React, { useEffect, useMemo, useLayoutEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import { Button, TooltipWrapper, Variant } from 'src/components/base';
import { useAppContext, useSettingsContext } from 'src/hooks';
import {
  IconHelpHexagon,
  IconSend,
  IconAdjustments,
} from '@tabler/icons-react';

const navBarCss = (
  reduceMotion: boolean,
  speedAdjustment: number,
  reduceTransparency: boolean,
) => css`
  --navbar--background-opacity: ${reduceTransparency ? 1 : 0.8} !important;
  --navbar--transition-duration: ${reduceMotion
    ? 0
    : 0.5 * speedAdjustment}s !important;

  .logo {
    --navbar--logo--transition-duration: ${reduceMotion
      ? 0
      : 0.3 * speedAdjustment}s !important;
    --navbar--logo--transition-delay: ${reduceMotion
      ? 0
      : 0.5 * speedAdjustment}s !important;
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
) =>
  Array.from(
    { length: buttonCount },
    (_, i) => css`
      button:nth-child(${i + 1}) {
        animation-delay: ${reduceMotion
          ? 0
          : (1.5 + (i + 1) * 0.1) * speedAdjustment}s;
      }
    `,
  );

const NavButtonContainer: React.FC<{
  children: React.ReactNode;
  reduceMotion: boolean;
  animationSpeedAdjustment: number;
}> = ({ children, reduceMotion, animationSpeedAdjustment }) => {
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
        buttonDelayInCss(buttonCount, reduceMotion, animationSpeedAdjustment),
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
    settings: { reduceMotion, animationSpeedAdjustment, reduceTransparency },
  } = useSettingsContext();
  const [showNavBorders, setShowNavBorders] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);
  // const navButtonCount = 3;

  const closeAllModals = () => {
    setIsAboutOpen(false);
    setIsContactFormOpen(false);
    setIsUserSettingsOpen(false);
  };

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

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setShowNavBorders(true);
        setTimeout(
          () => {
            setShowNav(true);
          },
          reduceMotion ? 0 : 400 * animationSpeedAdjustment,
        );
      },
      reduceMotion ? 0 : 600 * animationSpeedAdjustment,
    );
    return () => clearTimeout(timer);
  }, [reduceMotion, animationSpeedAdjustment]);

  return (
    <nav
      className={cx(
        navBarCss(reduceMotion, animationSpeedAdjustment, reduceTransparency),
        showNavBorders && 'show-nav-borders',
        showNav && 'show-nav',
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
            />
          </TooltipWrapper>
        </span>
        <NavButtonContainer
          reduceMotion={reduceMotion}
          animationSpeedAdjustment={animationSpeedAdjustment}
        >
          <Button
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
            Icon={IconSend}
            onClick={() => {
              closeAllModals();
              setIsContactFormOpen(!isContactFormOpen);
            }}
            tooltipOffset={12}
            tooltipDelay={500}
            tooltipPlacement={tooltipPlacement}
            tooltipTitle="Contact me"
            variantsList={[
              'secondary',
              'nav',
              ...(isContactFormOpen ? (['active'] as Variant[]) : []),
            ]}
          />
          <Button
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
