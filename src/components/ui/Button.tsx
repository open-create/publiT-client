'use client';

import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'solid' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  onClick?: (e: any) => any;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  [key: string]: any; // 추가 props 허용
}

// Chakra UI 색상 스킴 매핑
const getColorScheme = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return 'blue';
    case 'secondary':
      return 'gray';
    case 'danger':
      return 'red';
    case 'ghost':
      return 'gray';
    default:
      return 'blue';
  }
};

// Chakra UI variant 매핑 (완전하게 수정)
const getChakraVariant = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'ghost':
      return 'ghost';
    case 'outline':
      return 'outline';
    case 'solid':
      return 'solid';
    default:
      return 'solid';
  }
};

// Chakra UI size 매핑
const getChakraSize = (size: ButtonProps['size']) => {
  switch (size) {
    case 'xs':
      return 'xs';
    case 'sm':
      return 'sm';
    case 'md':
      return 'md';
    case 'lg':
      return 'lg';
    case 'xl':
      return 'xl';
    default:
      return 'md';
  }
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <ChakraButton
      colorPalette={getColorScheme(variant)}
      // colorScheme={getColorScheme(variant)}
      variant={getChakraVariant(variant)}
      size={getChakraSize(size)}
      width={fullWidth ? '100%' : undefined}
      disabled={disabled}
      onClick={onClick}
      type={type}
      // {...(variant === 'primary' && { bg: 'blue.500', color: 'white' })}
      {...props}
    >
      {children}
    </ChakraButton>
  );
}
