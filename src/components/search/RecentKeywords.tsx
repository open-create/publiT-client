'use client';

import { HStack, VStack, Text, Box, Icon } from '@chakra-ui/react';
import { X } from 'lucide-react';

interface RecentKeywordsProps {
  items: string[];
  onRemove?: (kw: string) => void;
  onClear?: () => void;
}

export default function RecentKeywords({ items, onRemove, onClear }: RecentKeywordsProps) {
  if (!items || items.length === 0) return null;

  return (
    <VStack align="stretch" gap={2} w="60%" mx="auto">
      <HStack justify="space-between" align="start" w="100%">
        <HStack gap={2} wrap="wrap" align="center" flex={1}>
          <Text fontSize="xs" color="gray.700">
            최근 검색어
          </Text>
          {items.map((kw) => (
            <HStack
              key={kw}
              bg="gray.100"
              color="gray.800"
              rounded="full"
              pl="0.5rem"
              pr="0.25rem"
              py="0.2rem"
            >
              <Text fontSize="xs">{kw}</Text>
              <Box
                as="button"
                onClick={() => onRemove?.(kw)}
                rounded="full"
                p="2px"
                _hover={{ bg: 'gray.200' }}
              >
                <Icon as={X} boxSize={3} />
              </Box>
            </HStack>
          ))}
        </HStack>
        <Box
          as="button"
          onClick={onClear}
          color="gray.400"
          _hover={{ color: 'gray.600' }}
          fontSize="xs"
        >
          모두 지우기
        </Box>
      </HStack>
    </VStack>
  );
}
