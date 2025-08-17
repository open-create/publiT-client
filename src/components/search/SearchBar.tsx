'use client';

import { useState } from 'react';
import { Box, HStack, Input, Icon } from '@chakra-ui/react';
import { Search as SearchIcon } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSubmit?: (keyword: string) => void;
}

export default function SearchBar({
  placeholder = '검색어를 입력하세요...',
  onSubmit,
}: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    const keyword = value.trim();
    if (!keyword) return;
    onSubmit?.(keyword);
  };

  return (
    <HStack w="100%" bg="gray.200" borderRadius="full" px="1rem" py="0.75rem">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder={placeholder}
        border="none"
        bg="transparent"
        _focus={{ boxShadow: 'none', border: 'none' }}
        _focusVisible={{ boxShadow: 'none', border: 'none' }}
      />
      <Box
        as="button"
        onClick={handleSubmit}
        p="0.25rem"
        rounded="full"
        _hover={{ bg: 'gray.300' }}
      >
        <Icon as={SearchIcon} color="gray.600" boxSize={5} />
      </Box>
    </HStack>
  );
}
