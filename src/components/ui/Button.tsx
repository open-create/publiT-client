import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
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

// Chakra UI variant 매핑
const getChakraVariant = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'ghost':
      return 'ghost';
    default:
      return 'solid';
  }
};

// Chakra UI size 매핑
const getChakraSize = (size: ButtonProps['size']) => {
  switch (size) {
    case 'sm':
      return 'sm';
    case 'lg':
      return 'lg';
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
      colorScheme={getColorScheme(variant)}
      variant={getChakraVariant(variant)}
      size={getChakraSize(size)}
      width={fullWidth ? '100%' : undefined}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </ChakraButton>
  );
}
