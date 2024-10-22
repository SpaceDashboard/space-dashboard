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
  --navbar--transition-duration: ${reduceMotion
    ? 0
    : 0.5 * speedAdjustment}s !important;

  .logo {
    --navbar--logo--transition-duration: ${reduceMotion
      ? 0
      : 0.3 * speedAdjustment}s !important;
    --navbar--logo--transition-delay: ${reduceMotion
      ? 0
      : 0.4 * speedAdjustment}s !important;
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
          : (0.4 + showNavDelayMs * 0.001 + (i + 1) * 0.1) * speedAdjustment}s;
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

  const showNavDelayMs = useMemo(() => {
    if (viewportWidth < 540) {
      return 0;
    }
    return reduceMotion ? 0 : 800 * animationSpeedAdjustment;
  }, [viewportWidth]);

  useEffect(() => {
    setShowNavBorders(true);
    setTimeout(() => {
      setShowNav(true);
    }, showNavDelayMs);
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
          animationSpeedAdjustment={animationSpeedAdjustment}
          reduceMotion={reduceMotion}
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
