'use client';

import { Box, HStack, Text, Icon } from '@chakra-ui/react';
import Button from '@/components/ui/Button';
import { ChevronLeft } from 'lucide-react';

import { PubbleHeaderProps } from './types';

export default function PubbleHeader({
  wordCount = 0,
  charCount = 0,
  smartQualityCheck,
  onBack,
  onTempSave,
  onPublish,
  onSmartReview,
  onQualityCheck,
  onOpenSettings,
}: PubbleHeaderProps) {
  return (
    <Box w="100%" bg="blue.50" py={3} px={4}>
      <HStack justify="space-between" align="center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack ?? (() => {})}
          p="0"
          minW="auto"
          h="auto"
          color="blue.500"
          _hover={{ color: 'gray.100', bg: 'transparent' }}
        >
          <Icon as={ChevronLeft} boxSize={6} /> 뒤로
        </Button>

        <HStack gap={4} align="center">
          <Text color="gray.600" fontSize="s">
            {charCount}자
          </Text>
          <Text color="gray.600" fontSize="s">
            {wordCount}단어
          </Text>

          {/* 설정 버튼 (more / kebab) */}
          <Button
            variant="ghost"
            size="sm"
            p={1}
            minW="auto"
            h="auto"
            bg="transparent"
            _hover={{ bg: 'transparent' }}
            onClick={onOpenSettings ?? (() => {})}
            aria-label="설정"
          >
            <HStack gap={1.5}>
              <Box w="5px" h="5px" bg="blue.500" borderRadius="full" />
              <Box w="5px" h="5px" bg="blue.500" borderRadius="full" />
              <Box w="5px" h="5px" bg="blue.500" borderRadius="full" />
            </HStack>
          </Button>

          {smartQualityCheck && (
            <Button
              variant="primary"
              size="sm"
              fontSize="s"
              bg="white"
              color="blue.500"
              _hover={{ color: 'gray.800' }}
              onClick={onSmartReview ?? (() => {})}
            >
              스마트 리뷰
            </Button>
          )}
          {!smartQualityCheck && (
            <Button
              variant="primary"
              size="sm"
              fontSize="s"
              bg="white"
              color="blue.500"
              _hover={{ color: 'gray.800' }}
              onClick={onQualityCheck ?? (() => {})}
            >
              스마트 품질 검사
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            fontSize="s"
            bg="blue.500"
            color="white"
            _hover={{ bg: 'blue.600' }}
            onClick={onTempSave ?? (() => {})}
          >
            저장
          </Button>
          {smartQualityCheck && (
            <Button
              variant="primary"
              size="sm"
              fontSize="s"
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }}
              onClick={onPublish ?? (() => {})}
            >
              발행
            </Button>
          )}
        </HStack>
      </HStack>
    </Box>
  );
}
