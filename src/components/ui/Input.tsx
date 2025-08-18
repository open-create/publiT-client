'use client';

import { forwardRef } from 'react';
import { chakra, type HTMLChakraProps } from '@chakra-ui/react';

export type UiInputProps = Omit<HTMLChakraProps<'input'>, 'css' | 'accentColor'>;

// Chakra v3 호환: 네이티브 input을 chakra.input으로 래핑하여 경량/무테 인풋 제공
const Input = forwardRef<HTMLInputElement, UiInputProps>(function UiInput(
  { px, _focus, _hover, ...rest },
  ref
) {
  return (
    <chakra.input
      ref={ref}
      px={px ?? 0}
      border="0"
      outline="none"
      bg="transparent"
      _hover={_hover ?? { borderColor: 'transparent' }}
      _focus={_focus ?? { outline: 'none', boxShadow: 'none' }}
      {...rest}
    />
  );
});

export default Input;
