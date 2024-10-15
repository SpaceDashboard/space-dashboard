import React from 'react';
import { css, cx } from '@emotion/css';

type AlignItems = React.CSSProperties['alignItems'];
type Flex = React.CSSProperties['flex'];
type FlexDirection = React.CSSProperties['flexDirection'];
type JustifyContent = React.CSSProperties['justifyContent'];

const flexWrapperCss = (
  alignItems: AlignItems,
  flexDirection: FlexDirection,
  gap: number,
  flex?: Flex,
  justifyContent?: JustifyContent,
  marginBottom?: number,
  marginTop?: number,
  maxWidth?: number,
) => css`
  align-items: ${alignItems};
  display: flex;
  flex-direction: ${flexDirection};
  gap: ${gap}px;
  width: 100%;
  ${flex && `flex: ${flex}`};
  ${justifyContent && `justify-content: ${justifyContent}`};
  ${marginBottom && `margin-bottom: ${marginBottom}px`};
  ${marginTop && `margin-top: ${marginTop}px`};
  ${maxWidth && `max-width: ${maxWidth}px`};
`;

interface FlexWrapperProps {
  alignItems?: AlignItems;
  className?: string;
  flex?: Flex;
  flexDirection?: FlexDirection;
  gap?: number;
  justifyContent?: JustifyContent;
  marginBottom?: number;
  marginTop?: number;
  maxWidth?: number;
  style?: React.CSSProperties;
}

export const FlexWrapper = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<FlexWrapperProps>
>(
  (
    {
      children,
      alignItems = 'flex-start',
      className,
      flex,
      flexDirection = 'column',
      gap = 8,
      justifyContent,
      marginBottom,
      marginTop,
      maxWidth,
      style,
    },
    ref,
  ) => {
    return (
      <div
        className={cx(
          flexWrapperCss(
            alignItems,
            flexDirection,
            gap,
            flex,
            justifyContent,
            marginBottom,
            marginTop,
            maxWidth,
          ),
          className,
        )}
        style={style}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);
