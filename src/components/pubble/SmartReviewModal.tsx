'use client';

import { useMemo } from 'react';
import { Box, VStack, HStack, Text, Badge, Spinner, Center } from '@chakra-ui/react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

import { SmartReviewModalProps, EvaluationItem } from './types';
import { useEvaluateContent } from '@/apis/model/api';

export default function SmartReviewModal({
  isOpen,
  onClose,
  onApplyReview,
}: SmartReviewModalProps) {
  const evaluate = useEvaluateContent();
  const result = evaluate.data;

  const evaluations: EvaluationItem[] = useMemo(() => {
    if (!result) return [];
    const { scores, comments } = result;
    return [
      { category: '창의성', score: scores.creativity * 20, comment: comments.creativity },
      { category: '구성력', score: scores.structure * 20, comment: comments.structure },
      { category: '문체', score: scores.style * 20, comment: comments.style },
      { category: '감정 전달', score: scores.emotion * 20, comment: comments.emotion },
      { category: '설득력', score: scores.persuasion * 20, comment: comments.persuasion },
    ];
  }, [result]);

  const totalScore = evaluations.length
    ? Math.round(evaluations.reduce((sum, item) => sum + item.score, 0) / evaluations.length)
    : 0;

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
        {evaluate.isPending && (
          <Center py={10}>
            <Spinner />
          </Center>
        )}
        {!evaluate.isPending && evaluations.length === 0 && (
          <Box py={6} textAlign="center" color="gray.500">
            평가 결과가 없습니다. 에디터에서 ‘품질 검사’ 버튼을 눌러 실행하세요.
          </Box>
        )}
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
          {evaluations.map((evaluation, index) => {
            const evaluationId = `evaluation-${index}`;
            return (
              <Box
                key={evaluationId}
                p={4}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
              >
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
                      &quot;{evaluation.highlightedText}&quot;
                    </Text>
                  </Box>
                )}
              </Box>
            );
          })}
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
