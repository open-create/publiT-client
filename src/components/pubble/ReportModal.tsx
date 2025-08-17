'use client';

import { useState } from 'react';
import { Box, Grid, GridItem, Input, Textarea, Text, VStack } from '@chakra-ui/react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Select as SelectReport } from '@/components/ui';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (payload: { title: string; type: string; content: string }) => void;
}

const REPORT_TYPES = ['스팸/홍보', '욕설/비방', '개인정보 노출', '불법 정보', '기타'];

export default function ReportModal({ isOpen, onClose, onSubmit }: ReportModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');

  const remaining = 1000 - content.length;
  const canSubmit = title.trim().length > 0 && type.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit?.({ title: title.trim(), type, content: content.trim() });
    onClose();
    setTitle('');
    setType('');
    setContent('');
  };

  console.log('REPORT_TYPES', REPORT_TYPES);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="신고" size="lg">
      <VStack align="stretch" gap={4}>
        {/* 폼 영역: 라벨 좌측, 필드 우측 */}
        <Grid templateColumns="6rem 1fr" gap={3} alignItems="center">
          <GridItem>
            <Text fontWeight="medium" color="gray.800">
              제목
            </Text>
          </GridItem>
          <GridItem>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              borderColor="gray.200"
              _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
              bg="gray.100"
            />
          </GridItem>

          <GridItem>
            <Text fontWeight="medium" color="gray.800">
              신고 유형
            </Text>
          </GridItem>
          <GridItem>
            <SelectReport
              options={REPORT_TYPES.map((t) => ({ label: t, value: t }))}
              value={type}
              onChange={(v) => setType(v)}
              onOpenChange={(open) => console.log('report-select open:', open)}
              placeholder="신고 유형을 선택하세요."
              size="sm"
              width="100%"
            />
          </GridItem>

          <GridItem colSpan={2}>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, 1000))}
              minH="16rem"
              borderColor="gray.200"
              _focus={{ borderColor: 'blue.300', boxShadow: 'none' }}
              bg="gray.100"
            />
            <Text mt={2} fontSize="xs" color="gray.500">
              {remaining}자 남음 (최대 1000자)
            </Text>
          </GridItem>
        </Grid>

        <Box display="flex" justifyContent="flex-end" pt={2}>
          <Button variant="primary" size="sm" onClick={handleSubmit} disabled={!canSubmit}>
            확인
          </Button>
        </Box>
      </VStack>
    </Modal>
  );
}
