'use client';

import { useState } from 'react';
import { Box, VStack, HStack, Text, Progress, Badge } from '@chakra-ui/react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

import { SmartReviewModalProps, EvaluationItem } from './types';

export default function SmartReviewModal({
  isOpen,
  onClose,
  onApplyReview,
}: SmartReviewModalProps) {
  // 예시 평가 데이터
  const [evaluations] = useState<EvaluationItem[]>([
    {
      category: '창의성',
      score: 85,
      comment: '주제 선택이 독특하며 예상치 못한 전개가 흥미롭습니다.',
      highlightedText: '독특한 관점에서 접근한 주제와 예상치 못한 전개가 독자의 흥미를 끌어냅니다.',
    },
    {
      category: '구성력',
      score: 72,
      comment:
        '중간 부분에서 논리 흐름이 약간 끊기는 느낌이 있습니다. 단락 연결을 더 자연스럽게 해보세요.',
      highlightedText: '전반적인 구조는 좋지만, 중간 부분의 논리적 연결이 다소 부족합니다.',
    },
    {
      category: '문체',
      score: 78,
      comment: '문장이 간결하지만 일부 반복 표현이 눈에 띕니다.',
      highlightedText:
        '간결하고 명확한 문체를 사용하고 있으나, 일부 표현의 반복이 개선의 여지가 있습니다.',
    },
    {
      category: '감정 전달',
      score: 88,
      comment: '독자의 공감을 잘 끌어내는 문장이 많습니다.',
      highlightedText: '독자의 감정을 효과적으로 전달하는 문장들이 잘 구성되어 있습니다.',
    },
    {
      category: '설득력',
      score: 65,
      comment: '주장에 대한 근거가 조금 부족합니다. 예시나 데이터를 추가하면 설득력이 올라갑니다.',
      highlightedText:
        '주장은 명확하지만 구체적인 근거나 예시가 부족하여 설득력을 높일 수 있습니다.',
    },
  ]);

  const totalScore = Math.round(
    evaluations.reduce((sum, item) => sum + item.score, 0) / evaluations.length
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 70) return 'yellow';
    return 'red';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return '우수';
    if (score >= 70) return '양호';
    return '개선 필요';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="스마트 리뷰 결과">
      <VStack align="stretch" gap={6} maxH="70vh" overflowY="auto">
        {/* 총점 섹션 */}
        <Box textAlign="center" py={4}>
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            총점: {totalScore}점
          </Text>
          <Badge
            colorScheme={getScoreColor(totalScore)}
            fontSize="md"
            px={3}
            py={1}
            borderRadius="full"
          >
            {getScoreLabel(totalScore)}
          </Badge>
        </Box>

        <Box w="100%" h="1px" bg="gray.200" />

        {/* 평가 항목들 */}
        <VStack align="stretch" gap={4} flex={1}>
          {evaluations.map((evaluation, index) => (
            <Box key={index} p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
              <HStack justify="space-between" mb={3}>
                <Text fontWeight="semibold" fontSize="lg">
                  {evaluation.category}
                </Text>
                <HStack gap={2}>
                  <Text fontSize="lg" fontWeight="bold">
                    {evaluation.score}점
                  </Text>
                  <Badge colorScheme={getScoreColor(evaluation.score)} fontSize="sm">
                    {getScoreLabel(evaluation.score)}
                  </Badge>
                </HStack>
              </HStack>

              <Box w="100%" h="8px" bg="gray.200" borderRadius="full" mb={3} overflow="hidden">
                <Box
                  w={`${evaluation.score}%`}
                  h="100%"
                  bg={`${getScoreColor(evaluation.score)}.500`}
                  borderRadius="full"
                />
              </Box>

              <Text color="gray.700" mb={2}>
                {evaluation.comment}
              </Text>

              {evaluation.highlightedText && (
                <Box
                  bg="yellow.100"
                  p={3}
                  borderRadius="md"
                  borderLeft="4px solid"
                  borderColor="yellow.400"
                >
                  <Text fontSize="sm" color="gray.800" fontStyle="italic">
                    "{evaluation.highlightedText}"
                  </Text>
                </Box>
              )}
            </Box>
          ))}
        </VStack>

        {/* 액션 버튼들 */}
        <HStack justify="flex-end" gap={3} pt={4}>
          <Button variant="secondary" onClick={onClose}>
            닫기
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onApplyReview?.(evaluations);
              onClose();
            }}
          >
            리뷰 적용하기
          </Button>
        </HStack>
      </VStack>
    </Modal>
  );
}
