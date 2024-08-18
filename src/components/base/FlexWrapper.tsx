import React from 'react';
import { css } from '@emotion/css';

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
) => css`
  align-items: ${alignItems};
  display: flex;
  flex-direction: ${flexDirection};
  gap: ${gap}px;
  width: 100%;
  ${flex && `flex: ${flex}`};
  ${justifyContent && `justify-content: ${justifyContent}`};
  ${marginBottom && `margin-bottom: ${marginBottom}px`};
`;

interface FlexWrapperProps {
  alignItems?: AlignItems;
  flex?: Flex;
  flexDirection?: FlexDirection;
  gap?: number;
  justifyContent?: JustifyContent;
  marginBottom?: number;
  style?: React.CSSProperties;
}

export const FlexWrapper = ({
  children,
  alignItems = 'flex-start',
  flex,
  flexDirection = 'column',
  gap = 12,
  justifyContent,
  marginBottom,
  style,
}: React.PropsWithChildren<FlexWrapperProps>) => {
  return (
    <div
      className={flexWrapperCss(
        alignItems,
        flexDirection,
        gap,
        flex,
        justifyContent,
        marginBottom,
      )}
      style={style}
    >
      {children}
    </div>
  );
};
