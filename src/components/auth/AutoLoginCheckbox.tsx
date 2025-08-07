'use client';

import { useState } from 'react';
import { HStack, Box, Text, VisuallyHidden, Icon } from '@chakra-ui/react';
import { CheckIcon } from 'lucide-react';

interface AutoLoginProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function AutoLogin({ defaultChecked = false, onChange }: AutoLoginProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    <HStack gap="2" cursor="pointer" onClick={toggle} mt="6">
      {/* 숨겨진 input (접근성 & 폼) */}
      <VisuallyHidden>
        <input type="checkbox" checked={checked} onChange={toggle} aria-label="자동 로그인" />
      </VisuallyHidden>

      {/* 시각적 체크박스 */}
      <Box
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggle();
          }
        }}
        w="1.5rem"
        h="1.5rem"
        rounded="sm"
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="all 0.12s"
        bg={checked ? 'blue.500' : 'gray.200'}
        _hover={{ bg: checked ? 'blue.600' : 'gray.300' }}
        _focusVisible={{
          outline: '2px solid',
          outlineColor: 'blue.300',
        }}
      >
        {/* 체크 아이콘: 체크될 때만 보이게 */}
        {checked && <Icon as={CheckIcon} boxSize="14px" color="white" strokeWidth={3} />}
      </Box>

      {/* 라벨 */}
      <Text fontWeight="medium" userSelect="none">
        자동 로그인
      </Text>
    </HStack>
  );
}
