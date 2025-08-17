'use client';

import { Box, HStack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import ReportModal from './ReportModal';

interface PostBodyProps {
  content: string;
  tags: string[];
  isMine?: boolean;
}

export default function PostBody({ content, tags, isMine }: PostBodyProps) {
  const [reportOpen, setReportOpen] = useState(false);
  return (
    <>
      <Box bg="white" p={6} rounded="md" border="1px solid" borderColor="gray.200">
        <Text whiteSpace="pre-wrap" lineHeight="tall" color="gray.800">
          {content}
        </Text>
      </Box>
      <HStack justify="space-between">
        <HStack gap={2} wrap="wrap">
          {tags.map((t) => (
            <Box key={t} px={2} py={1} rounded="full" bg="gray.100" fontSize="xs">
              #{t}
            </Box>
          ))}
        </HStack>
        {!isMine && (
          <Box
            as="button"
            color="gray.500"
            _hover={{ color: 'gray.700' }}
            fontSize="sm"
            onClick={() => setReportOpen(true)}
          >
            신고
          </Box>
        )}
      </HStack>
      <ReportModal isOpen={reportOpen} onClose={() => setReportOpen(false)} />
    </>
  );
}
