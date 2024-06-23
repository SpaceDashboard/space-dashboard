import React from 'react';
import { Button } from 'src/components/base/Button';
import { useToast } from 'src/hooks/useToast';
import Tooltip from '@mui/material/Tooltip';
import { Fade } from '@mui/material';
import { css, ClassNames } from '@emotion/react';
import { useAppContext } from '../hooks/useAppContext';

const navBarCss = (reduceMotion?: boolean) => css`
  animation: ${reduceMotion ? 0 : 1}s ease normal forwards 1 navBarIn;
  animation-delay: ${reduceMotion ? 0 : 0.6}s;

  &::after {
    animation: ${reduceMotion ? 0 : 0.3}s ease normal forwards 1 navBarAfterIn;
    animation-delay: ${reduceMotion ? 0 : 1.08}s;
  }

  .logo {
    animation: ${reduceMotion ? 0 : 0.3}s ease normal forwards 1 opacityIn;
    animation-delay: ${reduceMotion ? 0 : 1.6}s;
  }

  .btn-wrapper {
    button {
      animation: ${reduceMotion ? 0 : 0.3}s ease normal forwards 1 opacityIn;

      &:nth-child(1) {
        animation-delay: ${reduceMotion ? 0 : 1.7}s;
      }

      &:nth-child(2) {
        animation-delay: ${reduceMotion ? 0 : 1.8}s;
      }

      &:nth-child(3) {
        animation-delay: ${reduceMotion ? 0 : 1.9}s;
      }
    }
  }

  @keyframes navBarIn {
    0% {
      height: 1px;
      margin-top: calc(50vh - 2px);
      padding: 0;
      transform: scaleX(0);
    }

    45%,
    55% {
      height: 1px;
      margin-top: calc(50vh - 2px);
      padding: 0;
      transform: scaleX(1);
    }

    100% {
      height: calc(100% - 50px);
      margin-top: 25px;
      padding: 15px 0;
      transform: scaleX(1);
    }
  }

  @keyframes navBarAfterIn {
    0% {
      height: 0px;
      top: 0px;
    }

    100% {
      height: calc(100% + 8px);
      top: -4px;
    }
  }
`

export const NavBar: React.FC = () => {
  const { reduceMotion } = useAppContext();
  const { showToast } = useToast();

  const handleClick = () => {
    showToast('This is a message!', 'success');
  };

  return (
    <ClassNames>
      {({ css }) => (
        <nav className={css(navBarCss(reduceMotion))}>
          <div className="nav-inner">
            <span className="logo">
              <Tooltip
                enterDelay={0}
                placement="right"
                title="Space Dashboard"
                TransitionComponent={Fade}
              >
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
                className="secondary nav"
                tooltipTitle="Test 1"
                tooltipPlacement="right"
                onClick={handleClick}
              >
                A
              </Button>
              <Button
                className="secondary nav"
                tooltipTitle="Test 2"
                tooltipPlacement="right"
                onClick={handleClick}
              >
                B
              </Button>
              <Button
                className="secondary nav"
                tooltipTitle="Test 3"
                tooltipPlacement="right"
                onClick={handleClick}
              >
                C
              </Button>
            </div>
          </div>
        </nav>
      )}
    </ClassNames>
  );
};
