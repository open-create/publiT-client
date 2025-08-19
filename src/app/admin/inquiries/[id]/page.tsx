'use client';

import React, { useState } from 'react';
import { VStack, HStack, Heading, Box, Text, Textarea } from '@chakra-ui/react';
import Button from '@/components/ui/Button';

import { InquiryDetailPageProps } from '../../types';

export default function InquiryDetailPage({ params }: InquiryDetailPageProps) {
  const [id, setId] = useState<string>('');
  const [answer, setAnswer] = useState('');

  // params를 Promise로 처리
  React.useEffect(() => {
    void params.then((resolvedParams) => {
      setId(resolvedParams.id);
      // 임시로 id 사용 (나중에 실제 로직으로 교체)
      console.log('Inquiry ID:', id);
    });
  }, [params, id]);

  const handleSubmitAnswer = () => {
    // console.log('Submit answer:', answer);
    // 답변 등록 로직
  };

  return (
    <VStack align="stretch" gap={6}>
      <HStack justify="space-between" align="center">
        <Heading size="2xl" color="gray.900">
          문의 상세
        </Heading>
      </HStack>

      <Box bg="white" p={6} borderRadius="lg" shadow="md">
        <Heading size="lg" mb={4}>
          문의 내용
        </Heading>
        <VStack align="stretch" gap={4}>
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
              제목
            </Text>
            <Text color="gray.900">로그인 문제 문의</Text>
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
              내용
            </Text>
            <Text color="gray.900">로그인이 안 되는 문제가 있습니다.</Text>
          </Box>
        </VStack>
      </Box>

      <Box bg="white" p={6} borderRadius="lg" shadow="md">
        <Heading size="lg" mb={4}>
          답변
        </Heading>
        <VStack align="stretch" gap={4}>
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={5}
            placeholder="답변을 입력하세요..."
            borderColor="gray.300"
            _focus={{
              borderColor: 'blue.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
            }}
          />
          <HStack justify="flex-start">
            <Button variant="primary" onClick={handleSubmitAnswer}>
              답변 등록
            </Button>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
}
