import React from 'react';
import { css, ClassNames, SerializedStyles } from '@emotion/react';
import { useAppContext } from '../../hooks/useAppContext';

const panelCss = (animationDuration: number, animationDelay: number, height?: number, reduceMotion?: boolean) => css`
  animation: ${reduceMotion ? 0 : animationDuration}s ease normal forwards 1 panelIn;
  animation-delay: ${reduceMotion ? 0 : animationDelay}s;

  &::after {
    animation: ${reduceMotion ? 0 : (animationDuration / 2)}s ease normal forwards 1 panelAfterIn;
    animation-delay: ${reduceMotion ? 0 : (animationDelay + (animationDuration / 2))}s;
  }

  @keyframes panelIn {
    0% {
      height: 1px;
      padding-top: 0;
      padding-bottom: 0;
      transform: scaleX(0);
    }

    50% {
      height: 1px;
      padding-top: 0;
      padding-bottom: 0;
      transform: scaleX(1);
    }

    100% {
      height: ${height ? `${height}px` : '100px'};
      padding-top: 10px;
      padding-bottom: 12px;
      transform: scaleX(1);
    }
  }

  @keyframes panelAfterIn {
    0% {
      height: 0px;
      top: 0px;
    }

    100% {
      height: calc(100% + 6px);
      top: -3px;
    }
  }
`

export interface PanelProps {
  index: number;
}

interface InternalPanelProps extends PanelProps {
  className?: SerializedStyles;
  animationDuration?: number;
  animationDelay?: number;
  height?: number;
}

export const Panel = ({ children, className, animationDuration = 0.7, animationDelay = 0, height, index }: React.PropsWithChildren<InternalPanelProps>) => {
  const { reduceMotion, navAnimationDuration } = useAppContext();
  return (
    <ClassNames>
      {({ css, cx }) => (
        <div className={
          cx(
            'panel',
            css(className),
            css(panelCss(
              animationDuration,
              navAnimationDuration + (animationDelay + (index * 0.2)), 
              height,
              reduceMotion
            )
          )
        )}>
          <div className="panel-inner">
            {children}
          </div>
        </div>
      )}
    </ClassNames>
  );
};

export const PanelActions = ({ children }: React.PropsWithChildren) => {
  return <div className="panel-header">{children}</div>;
};

export const PanelBody = ({ children }: React.PropsWithChildren) => {
  return <div className="panel-body">{children}</div>;
};

// export const Panel = ({ children }: React.PropsWithChildren) => {
//   const panelActionsChildren = React.Children.toArray(children).filter(
//     (child) => React.isValidElement(child) && child.type === PanelActions
//   );
//   const panelBodyChildren = React.Children.toArray(children).filter(
//     (child) => React.isValidElement(child) && child.type === PanelBody
//   );
//   return (
//     <div className="panel">
//       {panelBodyChildren}
//       {panelActionsChildren}
//     </div>
//   );
// };
