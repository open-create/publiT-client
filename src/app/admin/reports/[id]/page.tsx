'use client';

import React, { useState } from 'react';
import { VStack, HStack, Heading, Box, Text, Textarea } from '@chakra-ui/react';
import Button from '@/components/ui/Button';
import { Select as UiSelect } from '@/components/ui';

import { ReportDetailPageProps } from '../../types';

export default function ReportDetailPage({ params }: ReportDetailPageProps) {
  const [_id, setId] = React.useState<string>('');

  // params를 Promise로 처리
  React.useEffect(() => {
    void params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);
  const [status, setStatus] = useState('');
  const [processingNote, setProcessingNote] = useState('');

  const statusOptions = [
    { label: '처리 상태 선택', value: '' },
    { label: '검토 중', value: 'pending' },
    { label: '처리 완료', value: 'resolved' },
    { label: '기각', value: 'dismissed' },
  ];

  const handleProcess = () => {
    // console.log('Process report:', { status, processingNote });
    // 처리 로직
  };

  return (
    <VStack align="stretch" gap={6}>
      <HStack justify="space-between" align="center">
        <Heading size="2xl" color="gray.900">
          신고 상세
        </Heading>
      </HStack>

      <Box bg="white" p={6} borderRadius="lg" shadow="md">
        <Heading size="lg" mb={4}>
          신고 내용
        </Heading>
        <VStack align="stretch" gap={4}>
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
              신고 유형
            </Text>
            <Text color="gray.900">부적절한 게시글</Text>
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
              신고 사유
            </Text>
            <Text color="gray.900">욕설 및 비방 내용이 포함되어 있습니다.</Text>
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
              신고된 게시글
            </Text>
            <Box p={3} bg="gray.50" borderRadius="md" border="1px solid" borderColor="gray.200">
              <Text color="gray.900">신고된 게시글 내용...</Text>
            </Box>
          </Box>
        </VStack>
      </Box>

      <Box bg="white" p={6} borderRadius="lg" shadow="md">
        <Heading size="lg" mb={4}>
          처리
        </Heading>
        <VStack align="stretch" gap={4}>
          <UiSelect options={statusOptions} value={status} onChange={setStatus} width="100%" />
          <Textarea
            value={processingNote}
            onChange={(e) => setProcessingNote(e.target.value)}
            rows={3}
            placeholder="처리 내용을 입력하세요..."
            borderColor="gray.300"
            _focus={{
              borderColor: 'blue.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
            }}
          />
          <HStack justify="flex-start">
            <Button variant="primary" onClick={handleProcess}>
              처리 완료
            </Button>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
}
