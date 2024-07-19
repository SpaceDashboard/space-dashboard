import React, { useEffect, useState } from 'react';
import { Button, Tooltip } from 'src/components/base';
import { css, cx } from '@emotion/css';
import { useSettingsContext, useToastContext } from 'src/hooks';

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

export const NavBar: React.FC = () => {
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
        <div className="btn-wrapper">
          <Button
            variantsList={['secondary', 'nav']}
            tooltipTitle="Test 1"
            tooltipOffset={[8, 0]}
            tooltipPlacement="right"
            onClick={handleClick}
          >
            A
          </Button>
          <Button
            variantsList={['secondary', 'nav']}
            tooltipTitle="Test 2"
            tooltipOffset={[8, 0]}
            tooltipPlacement="right"
            onClick={handleClick}
          >
            B
          </Button>
          <Button
            variantsList={['secondary', 'nav']}
            tooltipTitle="Test 3"
            tooltipOffset={[8, 0]}
            tooltipPlacement="right"
            onClick={handleClick}
          >
            C
          </Button>
        </div>
      </div>
    </nav>
  );
};
