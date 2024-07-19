import React, { useEffect, useMemo, useRef, useState } from 'react';
import { css, cx } from '@emotion/css';
import { useAppContext, usePanelContext, useSettingsContext } from 'src/hooks';
import { PanelProvider } from 'src/providers';
import {
  Button,
  ButtonProps,
  Variant,
  CornersWrapper,
} from 'src/components/base';
import { IconAdjustmentsHorizontal, IconRefresh } from '@tabler/icons-react';

const panelWrapperCss = (
  animationDuration: number,
  reduceMotion: boolean,
  speedAdjustment: number,
) => css`
  &::before {
    transition: ${reduceMotion ? 0 : animationDuration * speedAdjustment}s all
      ease;
  }

  .panel {
    transition: ${reduceMotion ? 0 : animationDuration * speedAdjustment}s all
      ease;
  }

  .panel-body {
    transition: ${reduceMotion ? 0 : animationDuration * 2 * speedAdjustment}s
      all ease;
    transition-delay: ${reduceMotion ? 0 : 0.8 * speedAdjustment}s;
  }

  .panel-menu {
    .panel-section & {
      --transition-seconds: ${reduceMotion ? 0 : 0.18 * speedAdjustment}s;
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
  index: number;
  isMenuOpen?: boolean;
}

export const InnerPanel = ({
  children,
  animationDuration = 0.4,
  animationDelay = 0,
  className,
  index,
  isMenuOpen,
}: React.PropsWithChildren<PanelProps>) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [showPanelBorders, setShowPanelBorders] = useState<boolean>(false);
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const { navAnimationSeconds } = useAppContext();
  const {
    settings: { reduceMotion, animationSpeedAdjustment },
  } = useSettingsContext();
  const {
    animationDurationSeconds,
    setAnimationDurationSeconds,
    setAnimationDelaySeconds,
    setIsPanelMenuOpen,
  } = usePanelContext();
  const delayedAnimationSeconds =
    navAnimationSeconds + (animationDelay + index * 0.06);

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
    setAnimationDurationSeconds &&
      setAnimationDurationSeconds(animationDuration);
    setAnimationDelaySeconds &&
      setAnimationDelaySeconds(delayedAnimationSeconds + 0.1);

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

  return (
    <div className="panel-section">
      <div
        className={cx(
          'panel-wrapper',
          panelWrapperCss(
            animationDurationSeconds ?? animationDuration,
            reduceMotion,
            animationSpeedAdjustment,
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
  refreshData?: () => void;
}

export const PanelActions = ({
  children,
  isMenuRendered,
  refreshData,
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

  // Child must be a Button
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === Button) {
      // Child button can't be a toggle menu
      if (
        (child.props as ButtonProps).variantsList?.includes(
          'toggle-menu' as Variant,
        )
      ) {
        console.warn(
          'Toggle menu button does not need to be included in panel actions.',
        );
      } else {
        updatedChildren.push(child);
      }
    }
  });

  const variants = useMemo(() => {
    const variantsList = ['small', 'toggle-menu'];
    if (isMenuRendered && isPanelMenuOpen) {
      variantsList.push('active');
    } else if (isMenuRendered && !isPanelMenuOpen) {
      variantsList.push('secondary');
    }
    return variantsList;
  }, [isMenuRendered, isPanelMenuOpen]);

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
            Icon={IconRefresh}
            isPanelAction={true}
            onClick={refreshData}
            tooltipTitle="Refresh data"
            variantsList={['small', 'secondary']}
          ></Button>
        )}
        {isMenuRendered && (
          <Button
            Icon={IconAdjustmentsHorizontal}
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
  const { isPanelMenuOpen } = usePanelContext();
  return (
    <div className={cx('panel-menu', { open: isPanelMenuOpen })}>
      <CornersWrapper height="100%">{children}</CornersWrapper>
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
