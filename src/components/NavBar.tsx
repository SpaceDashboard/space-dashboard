import React, { useEffect, useState } from 'react';
import { Button, Tooltip } from 'src/components/base';
import { css, cx } from '@emotion/css';
import { useAppContext, useSettingsContext, useToastContext } from 'src/hooks';
import {
  IconInfoHexagon,
  IconSend,
  IconAdjustments,
} from '@tabler/icons-react';

const navBarCss = (reduceMotion: boolean, speedAdjustment: number) => css`
  transition: ${reduceMotion ? 0 : 0.5 * speedAdjustment}s all ease;

  .logo {
    transition: ${reduceMotion ? 0 : 0.3 * speedAdjustment}s all ease;
    transition-delay: ${reduceMotion ? 0 : 0.4 * speedAdjustment}s;
  }

  .btn-wrapper {
    /* Using animation to avoid conflicts with button transition styles */
    button {
      animation: ${reduceMotion ? 0 : 0.3 * speedAdjustment}s ease normal
        forwards 1 opacityIn;

      &:nth-child(1) {
        animation-delay: ${reduceMotion ? 0 : 1.5 * speedAdjustment}s;
      }

      &:nth-child(2) {
        animation-delay: ${reduceMotion ? 0 : 1.6 * speedAdjustment}s;
      }

      &:nth-child(3) {
        animation-delay: ${reduceMotion ? 0 : 1.7 * speedAdjustment}s;
      }
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

const buttonDelayInCss = (reduceMotion: boolean, speedAdjustment: number) =>
  Array.from(
    { length: 3 },
    (_, i) => css`
      button:nth-child(${i + 1}) {
        animation-delay: ${reduceMotion
          ? 0
          : (1.5 + (i + 1) * 0.1) * speedAdjustment}s;
      }
    `,
  );

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
    settings: { reduceMotion, animationSpeedAdjustment },
  } = useSettingsContext();
  const { showToast } = useToastContext();
  const [showNavBorders, setShowNavBorders] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);

  const handleClick = () => {
    showToast('This is a message!', 'success');
  };

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
        navBarCss(reduceMotion, animationSpeedAdjustment),
        showNavBorders && 'show-nav-borders',
        showNav && 'show-nav',
      )}
    >
      <div className="nav-inner">
        <span className="logo">
          <Tooltip placement="right" title="Space Dashboard">
            <img
              src="/img/space-dashboard.svg"
              width="50"
              height="50"
              alt="Space Dashboard"
            />
          </Tooltip>
        </span>
        <div
          className={cx(
            'btn-wrapper',
            buttonWrapperCss(reduceMotion, animationSpeedAdjustment),
            buttonDelayInCss(reduceMotion, animationSpeedAdjustment),
          )}
        >
          <Button
            variantsList={['secondary', 'nav']}
            tooltipTitle="About"
            tooltipOffset={[8, 0]}
            tooltipPlacement="right"
            onClick={() => setIsAboutOpen(!isAboutOpen)}
            Icon={IconInfoHexagon}
            disabled={isContactFormOpen || isUserSettingsOpen}
          />
          <Button
            variantsList={['secondary', 'nav']}
            tooltipTitle="Contact me"
            tooltipOffset={[8, 0]}
            tooltipPlacement="right"
            onClick={() => setIsContactFormOpen(!isContactFormOpen)}
            Icon={IconSend}
            disabled={isAboutOpen || isUserSettingsOpen}
          />
          <Button
            variantsList={['secondary', 'nav']}
            tooltipTitle="Settings"
            tooltipOffset={[8, 0]}
            tooltipPlacement="right"
            onClick={() => setIsUserSettingsOpen(!isUserSettingsOpen)}
            Icon={IconAdjustments}
            disabled={isAboutOpen || isContactFormOpen}
          />
        </div>
      </div>
    </nav>
  );
};
