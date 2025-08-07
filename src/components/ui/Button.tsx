'use client';

import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import React from 'react';

/*───────────────────── 타입─────────────────────*/
type UiVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
type UiSize = 'xs' | 'sm' | 'md' | 'lg';

/**  우리가 제어할 prop + Chakra 기본 prop 나머지 */
interface ButtonProps
  extends Omit<ChakraButtonProps, 'variant' | 'size' | 'colorPalette' | 'css' | 'accentColor'> {
  variant?: UiVariant;
  size?: UiSize;
  fullWidth?: boolean;
  colorPalette?: string;
  fontSize?: string | number;
}

/*───────────────── 매핑 테이블 ─────────────────*/
type Palette = ChakraButtonProps['colorPalette']; // "blue" | "gray" | "red" | …

const COLOR_PALETTE: Record<UiVariant, Palette> = {
  primary: 'blue',
  secondary: 'gray',
  danger: 'red',
  ghost: 'gray',
  outline: 'blue',
};

const VARIANT: Record<UiVariant, ChakraButtonProps['variant']> = {
  primary: 'solid',
  secondary: 'outline',
  danger: 'solid',
  ghost: 'ghost',
  outline: 'outline',
};

const SIZE: Record<UiSize, ChakraButtonProps['size']> = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

/*──────────────────── 컴포넌트 ───────────────────*/
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  fontSize,
  ...rest
}: ButtonProps) {
  return (
    <ChakraButton
      colorPalette={COLOR_PALETTE[variant]}
      variant={VARIANT[variant]}
      size={SIZE[size]}
      w={fullWidth ? '100%' : undefined}
      fontSize={fontSize}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
}
