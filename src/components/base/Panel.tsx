import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as Sentry from '@sentry/react';
import { css, cx } from '@emotion/css';
import { useAppContext, usePanelContext, useSettingsContext } from 'src/hooks';
import { PanelProvider } from 'src/providers';
import { Button, Variant, Modal } from 'src/components/base';
import { AvailablePanels } from 'src/shared/PanelConfigs';
import { IconLayoutGrid, IconRefresh } from '@tabler/icons-react';

const panelWrapperCss = (
  animationDuration: number,
  reduceMotion: boolean,
  speedAdjustment: number,
  reduceTransparency: boolean,
) => css`
  --panel--background-opacity: ${reduceTransparency ? 1 : 0.65} !important;
  --panel-menu--background-opacity: ${reduceTransparency ? 1 : 0.9} !important;

  &::before {
    --panel-wrapper--before--transition-duration: ${reduceMotion
      ? 0
      : animationDuration * speedAdjustment}s !important;
  }

  .panel {
    --panel--transition-duration: ${reduceMotion
      ? 0
      : animationDuration * speedAdjustment}s !important;
  }

  .panel-body {
    --panel-body--transition-duration: ${reduceMotion
      ? 0
      : animationDuration * 2 * speedAdjustment}s !important;
    --panel-body--transition-delay: ${reduceMotion
      ? 0
      : 0.45 * speedAdjustment}s !important;
  }

  .panel-actions-wrapper {
    .panel-section & {
      --panel-menu--transition-duration: ${reduceMotion
        ? 0
        : 0.2 * speedAdjustment}s !important;

      &::before {
        --panel-actions-wrapper--before--transition-duration: ${reduceMotion
          ? 0
          : 0.4 * speedAdjustment}s !important;
      }

      &::after {
        --panel-actions-wrapper--after--transition-duration: ${reduceMotion
          ? 0
          : 0.4 * speedAdjustment}s !important;
      }

      .panel-actions {
        &::before {
          --panel-actions--before-transition-duration: ${reduceMotion
            ? 0
            : 0.4 * speedAdjustment}s !important;
        }
      }
    }
  }

  .panel-menu {
    .panel-section & {
      --panel-menu--transition-duration: ${reduceMotion
        ? 0
        : 0.2 * speedAdjustment}s !important;
    }
  }
`;

const panelActionsCss = (
  animationDuration: number,
  animationDelay: number,
  reduceMotion: boolean,
  speedAdjustment: number,
) => css`
  transition: ${reduceMotion ? 0 : animationDuration * speedAdjustment}s all
    ease;
  transition-delay: ${reduceMotion
    ? 0
    : (animationDelay - 1) * speedAdjustment}s;
`;

export interface PanelProps {
  animationDuration?: number;
  animationDelay?: number;
  className?: string;
  componentKey: string;
  index: number;
  isMenuOpen?: boolean;
}

export const InnerPanel = ({
  children,
  animationDuration = 0.4,
  animationDelay = 0,
  className,
  componentKey,
  index,
  isMenuOpen,
}: React.PropsWithChildren<PanelProps>) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [showPanelBorders, setShowPanelBorders] = useState<boolean>(false);
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const { navAnimationSeconds, allPanelsLoaded } = useAppContext();
  const {
    settings: { reduceMotion, animationSpeedAdjustment, reduceTransparency },
  } = useSettingsContext();
  const {
    animationDurationSeconds,
    setAnimationDurationSeconds,
    setAnimationDelaySeconds,
    setIsPanelMenuOpen,
    setComponentKey,
  } = usePanelContext();
  const delayedAnimationSeconds = useMemo(() => {
    if (allPanelsLoaded) {
      return animationDelay + index * 0.1;
    } else {
      return navAnimationSeconds + animationDelay + index * 0.04;
    }
  }, [allPanelsLoaded, animationDelay, index, navAnimationSeconds]);

  const panelMenuChild = useMemo(() => {
    const panelMenu = React.Children.toArray(children).filter(
      (child) => React.isValidElement(child) && child.type === PanelMenu,
    );
    return panelMenu;
  }, [children]);

  const panelBodyChild = useMemo(() => {
    const panelBody = React.Children.toArray(children).filter(
      (child) => React.isValidElement(child) && child.type === PanelBody,
    );
    return panelBody;
  }, [children]);

  const panelActionsChild = useMemo(() => {
    const panelActions = React.Children.map(
      children,
      (child) =>
        React.isValidElement(child) &&
        child.type === PanelActions &&
        React.cloneElement(child, {
          isMenuRendered: !!panelMenuChild.length,
        } as PanelActionsProps),
    );
    return panelActions;
  }, [children, panelMenuChild]);

  useEffect(() => {
    setAnimationDurationSeconds?.(animationDuration);
    setAnimationDelaySeconds?.(delayedAnimationSeconds + 0.1);

    const timer = setTimeout(
      () => {
        setShowPanelBorders(true);
        setTimeout(
          () => {
            setShowPanel(true);
          },
          reduceMotion ? 0 : 350 * animationSpeedAdjustment,
        );
      },
      reduceMotion
        ? 0
        : delayedAnimationSeconds * 1000 * animationSpeedAdjustment,
    );
    return () => clearTimeout(timer);
  }, [
    reduceMotion,
    animationDuration,
    delayedAnimationSeconds,
    setAnimationDurationSeconds,
    setAnimationDelaySeconds,
    animationSpeedAdjustment,
  ]);

  useEffect(() => {
    setIsPanelMenuOpen && setIsPanelMenuOpen(isMenuOpen ?? false);
  }, [isMenuOpen, setIsPanelMenuOpen]);

  useEffect(() => {
    setComponentKey?.(componentKey);
  });

  return (
    <div className="panel-section">
      <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>}>
        <div
          className={cx(
            'panel-wrapper',
            panelWrapperCss(
              animationDurationSeconds ?? animationDuration,
              reduceMotion,
              animationSpeedAdjustment,
              reduceTransparency,
            ),
            showPanelBorders && 'show-panel-borders',
            showPanel && 'show-panel',
          )}
        >
          <div>
            <div className={cx('panel', className)} ref={panelRef}>
              {panelBodyChild}
              {panelMenuChild}
            </div>
          </div>
        </div>
        {panelActionsChild}
      </Sentry.ErrorBoundary>
    </div>
  );
};

export const Panel = ({
  children,
  ...props
}: React.PropsWithChildren<PanelProps>) => {
  return (
    <PanelProvider>
      <InnerPanel {...props}>{children}</InnerPanel>
    </PanelProvider>
  );
};

interface PanelActionsProps {
  /** Internal prop, please ignore */
  isMenuRendered?: boolean;
  isRefreshEnabled?: boolean;
  refreshData?: () => void;
  refreshTooltip?: string;
}

export const PanelActions = ({
  children,
  isMenuRendered,
  isRefreshEnabled = true,
  refreshData,
  refreshTooltip = 'Refresh data',
}: React.PropsWithChildren<PanelActionsProps>) => {
  const updatedChildren: React.ReactNode[] = [];
  const {
    settings: { reduceMotion, animationSpeedAdjustment },
  } = useSettingsContext();
  const {
    isPanelMenuOpen,
    setIsPanelMenuOpen,
    animationDurationSeconds,
    animationDelaySeconds,
  } = usePanelContext();
  const [spinIcon, setSpinIcon] = useState<boolean>(false);

  // Child must be a Button
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === Button) {
      updatedChildren.push(child);
    }
  });

  const variants = useMemo(() => {
    const variantsList = ['small'];
    if (isMenuRendered && isPanelMenuOpen) {
      variantsList.push('active');
    } else if (isMenuRendered && !isPanelMenuOpen) {
      variantsList.push('secondary');
    }
    return variantsList;
  }, [isMenuRendered, isPanelMenuOpen]);

  useEffect(() => {
    if (spinIcon) {
      setTimeout(() => {
        setSpinIcon(false);
      }, 1000);
    }
  }, [spinIcon]);

  return (
    <div
      className={cx(
        'panel-actions-wrapper',
        panelActionsCss(
          animationDurationSeconds ?? 0,
          animationDelaySeconds ?? 0,
          reduceMotion,
          animationSpeedAdjustment,
        ),
      )}
    >
      <div
        className={cx(
          'panel-actions',
          panelActionsCss(
            animationDurationSeconds ?? 0,
            animationDelaySeconds ?? 0,
            reduceMotion,
            animationSpeedAdjustment,
          ),
        )}
      >
        {updatedChildren}
        {refreshData && (
          <Button
            ariaLabel={refreshTooltip}
            Icon={IconRefresh}
            isPanelAction={true}
            className={spinIcon ? 'spin-icon' : ''}
            disabled={!isRefreshEnabled}
            onClick={() => {
              setSpinIcon(true);
              refreshData();
            }}
            tooltipTitle={refreshTooltip}
            variantsList={['secondary']}
          ></Button>
        )}
        {isMenuRendered && (
          <Button
            ariaLabel={isPanelMenuOpen ? 'Close menu' : 'Open menu'}
            Icon={IconLayoutGrid}
            isPanelAction={true}
            onClick={() => {
              setIsPanelMenuOpen && setIsPanelMenuOpen(!isPanelMenuOpen);
            }}
            tooltipTitle={isPanelMenuOpen ? 'Close menu' : 'Open menu'}
            variantsList={variants as Variant[]}
          ></Button>
        )}
      </div>
    </div>
  );
};

export const PanelMenu = ({ children }: React.PropsWithChildren) => {
  const { isPanelMenuOpen, setIsPanelMenuOpen, componentKey } =
    usePanelContext();
  const {
    settings: { panelConfigs, reduceMotion, animationSpeedAdjustment },
  } = useSettingsContext();
  // CSS variable reference: --panel-menu--transition-duration
  const animationDuration = reduceMotion ? 0 : 0.2 * animationSpeedAdjustment;
  const [isMenuFullyHidden, setIsMenuFullyHidden] = useState<boolean>(true);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isPanelMenuOpen && e.key === 'Escape') {
        setIsPanelMenuOpen && setIsPanelMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isPanelMenuOpen, setIsPanelMenuOpen]);

  useEffect(() => {
    if (isPanelMenuOpen) {
      setIsMenuFullyHidden(false);
    } else {
      const timeoutId = setTimeout(() => {
        setIsMenuFullyHidden(true);
      }, animationDuration * 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isPanelMenuOpen, animationDuration]);

  return (
    <div
      className={cx('panel-menu', { open: isPanelMenuOpen })}
      style={{ visibility: isMenuFullyHidden ? 'hidden' : 'visible' }}
    >
      <Modal isOpen={isPanelMenuOpen} showCloseButton={false}>
        {componentKey && (
          <h3>{panelConfigs[componentKey as AvailablePanels].label}</h3>
        )}
        {children}
      </Modal>
    </div>
  );
};

export const PanelBody = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren
>(({ children }, ref) => {
  return (
    <div className="panel-body" ref={ref}>
      <div className="panel-body-content">{children}</div>
    </div>
  );
});
PanelBody.displayName = 'PanelBody';
