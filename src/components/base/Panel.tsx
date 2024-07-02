import React from 'react';
import { css, cx } from '@emotion/css';
import { useAppContext } from '../../hooks/useAppContext';

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
    transition: ${reduceMotion ? 0 : animationDuration}s all ease;
    transition-delay: ${reduceMotion ? 0 : 0.7}s;
  }
`;

export interface PanelProps {
  index: number;
}

interface InternalPanelProps extends PanelProps {
  className?: string;
  animationDuration?: number;
  animationDelay?: number;
  height?: number;
}

export const Panel = ({
  children,
  className,
  animationDuration = 0.4,
  animationDelay = 0,
  index,
}: React.PropsWithChildren<InternalPanelProps>) => {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [showPanelBorders, setShowPanelBorders] =
    React.useState<boolean>(false);
  const [showPanel, setShowPanel] = React.useState<boolean>(false);
  const { reduceMotion, navAnimationDurationSeconds } = useAppContext();
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

  React.useEffect(() => {
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
  }, [reduceMotion, delayedAnimationSeconds]);

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
      {children}
    </div>
  );
});
PanelBody.displayName = 'PanelBody';
