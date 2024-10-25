import React from 'react';
import { css, cx } from '@emotion/css';

type AlignItems = React.CSSProperties['alignItems'];
type Flex = React.CSSProperties['flex'];
type FlexDirection = React.CSSProperties['flexDirection'];
type JustifyContent = React.CSSProperties['justifyContent'];

interface OptionalStyles {
  flex?: Flex;
  justifyContent?: JustifyContent;
  marginBottom?: number;
  marginTop?: number;
  maxWidth?: number;
}

const flexWrapperCss = (
  alignItems: AlignItems,
  flexDirection: FlexDirection,
  gap: number,
  optionalStyles: OptionalStyles = {},
) => css`
  align-items: ${alignItems};
  display: flex;
  flex-direction: ${flexDirection};
  gap: ${gap}px;
  width: 100%;
  ${optionalStyles.flex && `flex: ${optionalStyles.flex}`};
  ${optionalStyles.justifyContent &&
  `justify-content: ${optionalStyles.justifyContent}`};
  ${optionalStyles.marginBottom &&
  `margin-bottom: ${optionalStyles.marginBottom}px`};
  ${optionalStyles.marginTop && `margin-top: ${optionalStyles.marginTop}px`};
  ${optionalStyles.maxWidth && `max-width: ${optionalStyles.maxWidth}px`};
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
  tag?: keyof JSX.IntrinsicElements;
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
      tag = 'div',
    },
    ref,
  ) => {
    const Component = tag as React.ElementType;
    return (
      <Component
        className={cx(
          flexWrapperCss(alignItems, flexDirection, gap, {
            flex,
            justifyContent,
            marginBottom,
            marginTop,
            maxWidth,
          }),
          className,
        )}
        style={style}
        ref={ref}
      >
        {children}
      </Component>
    );
  },
);
