'use client';

import { useRef } from 'react';
import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TagScrollerProps {
  tags: string[];
  onSelect?: (tag: string) => void;
}

export default function TagScroller({ tags, onSelect }: TagScrollerProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (delta: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <HStack w="100%" align="center" gap={2}>
      <Box
        as="button"
        onClick={() => scrollBy(-200)}
        px={2}
        py={1}
        rounded="md"
        _hover={{ bg: 'gray.100' }}
      >
        <Icon as={ChevronLeft} color="gray.500" boxSize={5} />
      </Box>

      <HStack
        ref={scrollRef as any}
        gap={2}
        overflowX="auto"
        flex={1}
        px={1}
        css={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {tags.map((t) => (
          <Box
            key={t}
            as="button"
            onClick={() => onSelect?.(t)}
            px="0.75rem"
            py="0.375rem"
            bg="blue.100"
            color="blue.800"
            rounded="full"
          >
            <Text fontSize="sm">{t}</Text>
          </Box>
        ))}
      </HStack>

      <Box
        as="button"
        onClick={() => scrollBy(200)}
        px={2}
        py={1}
        rounded="md"
        _hover={{ bg: 'gray.100' }}
      >
        <Icon as={ChevronRight} color="gray.500" boxSize={5} />
      </Box>
    </HStack>
  );
}
