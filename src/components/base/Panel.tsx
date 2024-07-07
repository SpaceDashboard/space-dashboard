import React, { useEffect, useMemo, useRef, useState } from 'react';
import { css, cx } from '@emotion/css';
import { useAppContext, usePanelContext } from '../../hooks';
import { PanelProvider } from 'src/providers';
import {
  Button,
  ButtonProps,
  Variant,
  CornersWrapper,
} from 'src/components/base';

const panelWrapperCss = (
  animationDuration: number,
  reduceMotion?: boolean,
) => css`
  &::before {
    transition: ${reduceMotion ? 0 : animationDuration}s all ease;
  }

  .panel {
    transition: ${reduceMotion ? 0 : animationDuration}s all ease;
  }

  .panel-body {
    transition: ${reduceMotion ? 0 : animationDuration * 2}s all ease;
    transition-delay: ${reduceMotion ? 0 : 0.8}s;
  }
`;

const panelCss = (animationDuration: number, reduceMotion?: boolean) => css`
  transition: ${reduceMotion ? 0 : animationDuration}s all ease;
  transition-delay: ${reduceMotion ? 0 : 1}s;
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
  const { reduceMotion, navAnimationSeconds } = useAppContext();
  const {
    setAnimationDurationSeconds,
    setAnimationDelaySeconds,
    setIsPanelMenuOpen,
  } = usePanelContext();
  const delayedAnimationSeconds =
    navAnimationSeconds + (animationDelay + index * 0.1);

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
          animationDuration,
          reduceMotion,
          isMenuRendered: !!panelMenuChild.length,
        } as PanelActionsProps),
    );
    return panelActions;
  }, [children, animationDuration, reduceMotion, panelMenuChild]);

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
          reduceMotion ? 0 : 500,
        );
      },
      reduceMotion ? 0 : delayedAnimationSeconds * 1000,
    );
    return () => clearTimeout(timer);
  }, [
    reduceMotion,
    animationDuration,
    delayedAnimationSeconds,
    setAnimationDurationSeconds,
    setAnimationDelaySeconds,
  ]);

  useEffect(() => {
    setIsPanelMenuOpen && setIsPanelMenuOpen(isMenuOpen ?? false);
  }, [isMenuOpen, setIsPanelMenuOpen]);

  return (
    <div className="panel-section-wrapper">
      <div
        className={cx(
          'panel-wrapper',
          panelWrapperCss(animationDuration, reduceMotion),
          showPanelBorders && 'show-panel-borders',
          showPanel && 'show-panel',
        )}
      >
        <div>
          <div className={cx('panel', className)} ref={panelRef}>
            {panelMenuChild}
            {panelBodyChild}
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
  animationDuration?: number;
  isMenuRendered?: boolean;
  reduceMotion?: boolean;
}

export const PanelActions = ({
  children,
  animationDuration,
  isMenuRendered,
  reduceMotion,
}: React.PropsWithChildren<PanelActionsProps>) => {
  const updatedChildren: React.ReactNode[] = [];
  const { isPanelMenuOpen, setIsPanelMenuOpen } = usePanelContext();

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
        'panel-actions',
        panelCss(animationDuration ?? 0, reduceMotion),
      )}
    >
      {updatedChildren}
      {isMenuRendered && (
        <Button
          variantsList={variants as Variant[]}
          onClick={() => {
            setIsPanelMenuOpen && setIsPanelMenuOpen(!isPanelMenuOpen);
          }}
        >
          Menu
        </Button>
      )}
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
