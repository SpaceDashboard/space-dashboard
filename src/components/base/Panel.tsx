import React, { useEffect, useRef, useState } from 'react';
import { css, cx } from '@emotion/css';
import { useAppContext, usePanelContext } from '../../hooks';
import { PanelProvider } from 'src/providers';

const panelWrapperCss = (
  animationDuration: number,
  reduceMotion?: boolean,
) => css`
  &::after {
    transition: ${reduceMotion ? 0 : animationDuration}s all ease;
  }

  .panel {
    transition: ${reduceMotion ? 0 : animationDuration}s all ease;
  }

  .panel-body {
    transition: ${reduceMotion ? 0 : animationDuration * 2}s all ease;
    transition-delay: ${reduceMotion ? 0 : 0.6}s;
  }
`;

export interface PanelProps {
  index: number;
}

interface InnerPanelProps extends PanelProps {
  className?: string;
  animationDuration?: number;
  animationDelay?: number;
  height?: number;
}

export const InnerPanel = ({
  children,
  className,
  animationDuration = 0.4,
  animationDelay = 0,
  index,
}: React.PropsWithChildren<InnerPanelProps>) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [showPanelBorders, setShowPanelBorders] = useState<boolean>(false);
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const { reduceMotion, navAnimationDurationSeconds } = useAppContext();
  const { setAnimationDurationSeconds, setAnimationDelaySeconds } =
    usePanelContext();
  const delayedAnimationSeconds =
    navAnimationDurationSeconds + (animationDelay + index * 0.1);
  const panelActionsChild = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === PanelActions,
  );
  const panelMenuChild = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === PanelMenu,
  );
  const panelBodyChild = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === PanelBody,
  );

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

  return (
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

export const PanelActions = ({ children }: React.PropsWithChildren) => {
  return <div className="panel-header">{children}</div>;
};

export const PanelMenu = ({ children }: React.PropsWithChildren) => {
  return <div className="panel-menu">{children}</div>;
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
