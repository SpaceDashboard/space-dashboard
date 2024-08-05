import React, { useEffect, useState } from 'react';
import { Button, TooltipWrapper, Variant } from 'src/components/base';
import { css, cx } from '@emotion/css';
import {
  useAppContext,
  useSettingsContext,
  useToast,
  Variants,
} from 'src/hooks';
import {
  IconHelpHexagon,
  IconSend,
  IconAdjustments,
} from '@tabler/icons-react';

const navBarCss = (reduceMotion: boolean, speedAdjustment: number) => css`
  transition: ${reduceMotion ? 0 : 0.5 * speedAdjustment}s height ease;

  .logo {
    transition: ${reduceMotion ? 0 : 0.3 * speedAdjustment}s opacity ease;
    transition-delay: ${reduceMotion ? 0 : 0.5 * speedAdjustment}s;
  }

  .btn-wrapper {
    /* Using animation to avoid conflicts with button transition styles */
    button {
      animation: ${reduceMotion ? 0 : 0.3 * speedAdjustment}s ease normal
        forwards 1 opacityIn;

      &:nth-child(1) {
        animation-delay: ${reduceMotion ? 0 : 1.6 * speedAdjustment}s;
      }

      &:nth-child(2) {
        animation-delay: ${reduceMotion ? 0 : 1.7 * speedAdjustment}s;
      }

      &:nth-child(3) {
        animation-delay: ${reduceMotion ? 0 : 1.8 * speedAdjustment}s;
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
  const { showToast } = useToast();
  const [showNavBorders, setShowNavBorders] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);

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
          <TooltipWrapper
            placement="right"
            title="Space Dashboard"
            tooltipOffset={12}
          >
            <img
              src="/img/space-dashboard.svg"
              width="50"
              height="50"
              alt="Space Dashboard"
            />
          </TooltipWrapper>
        </span>
        <div
          className={cx(
            'btn-wrapper',
            buttonWrapperCss(reduceMotion, animationSpeedAdjustment),
            buttonDelayInCss(reduceMotion, animationSpeedAdjustment),
          )}
        >
          <Button
            disabled={isContactFormOpen || isUserSettingsOpen}
            Icon={IconHelpHexagon}
            onClick={() => {
              // setIsAboutOpen(!isAboutOpen);

              const variants = ['confirmation', 'warning', 'error'];
              const variant =
                variants[Math.floor(Math.random() * variants.length)];
              showToast('Test', { variant: variant as Variants });
            }}
            tooltipOffset={12}
            tooltipDelay={500}
            tooltipPlacement="right"
            tooltipTitle="About"
            variantsList={[
              'secondary',
              'nav',
              ...(isAboutOpen ? (['active'] as Variant[]) : []),
            ]}
          />
          <Button
            disabled={isAboutOpen || isUserSettingsOpen}
            Icon={IconSend}
            onClick={() => setIsContactFormOpen(!isContactFormOpen)}
            tooltipOffset={12}
            tooltipDelay={500}
            tooltipPlacement="right"
            tooltipTitle="Contact me"
            variantsList={[
              'secondary',
              'nav',
              ...(isContactFormOpen ? (['active'] as Variant[]) : []),
            ]}
          />
          <Button
            disabled={isAboutOpen || isContactFormOpen}
            Icon={IconAdjustments}
            onClick={() => setIsUserSettingsOpen(!isUserSettingsOpen)}
            tooltipOffset={12}
            tooltipDelay={500}
            tooltipPlacement="right"
            tooltipTitle="Settings"
            variantsList={[
              'secondary',
              'nav',
              ...(isUserSettingsOpen ? (['active'] as Variant[]) : []),
            ]}
          />
        </div>
      </div>
    </nav>
  );
};
