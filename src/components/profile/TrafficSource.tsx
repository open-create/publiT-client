'use client';

import React, { useState } from 'react';
import { Box, VStack, HStack, Text, Heading, Grid } from '@chakra-ui/react';
import { ChevronRight } from 'lucide-react';

interface TrafficSourceData {
  name: string;
  count: number;
  percentage: number;
  icon?: 'trending' | 'users' | 'share' | 'search' | 'external';
  details?: {
    url: string;
    title: string;
    visits: number;
  }[];
}

interface TrafficSourceProps {
  title: string;
  data: TrafficSourceData[];
  totalCount?: number;
}

export default function TrafficSource({ title, data, totalCount }: TrafficSourceProps) {
  const [selectedItem, setSelectedItem] = useState<number | null>(0);

  // 전체 카운트가 없으면 데이터에서 계산
  const total = totalCount || data.reduce((sum, item) => sum + item.count, 0);

  const selectedDetails = selectedItem !== null ? data[selectedItem]?.details : null;

  return (
    <Box
      border="0.0625rem solid"
      borderColor="gray.200"
      borderRadius="lg"
      p="1.5rem"
      bg="white"
      w="100%"
      maxW="62.5rem"
      h="32.75rem"
      minH="32.75rem"
      maxH="32.75rem"
    >
      {/* 상단 파란색 선 */}
      {/* <Box w="100%" h="0.0625rem" bg="blue.200" mb="1rem" /> */}

      <Grid
        templateColumns="10rem 21.5rem"
        gap="2rem"
        maxW="31.5rem"
        h="25rem"
        minH="25rem"
        maxH="25rem"
      >
        {/* 왼쪽: 프로필 유입 경로 */}
        <VStack align="start" gap="0.75rem" w="100%" h="100%">
          <Heading size="sm" color="gray.800" fontWeight="medium">
            {title} 유입 경로
          </Heading>

          {/* 스크롤 가능한 유입 경로 목록 */}
          <Box
            w="100%"
            h="calc(100% - 2.5rem)"
            overflowY="auto"
            overflowX="hidden"
            css={{
              '&::-webkit-scrollbar': {
                width: '0.375rem',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '0.1875rem',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#c1c1c1',
                borderRadius: '0.1875rem',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#a8a8a8',
              },
            }}
          >
            <VStack align="start" gap="0.75rem" w="100%">
              {data.map((item, index) => {
                const itemId = `traffic-${index}`;
                return (
                  <Box
                    key={itemId}
                    w="100%"
                    p="0.75rem"
                    bg="blue.50"
                    borderRadius="md"
                    cursor={item.details && item.details.length > 0 ? 'pointer' : 'default'}
                    onClick={() =>
                      item.details && item.details.length > 0 && setSelectedItem(index)
                    }
                    _hover={item.details && item.details.length > 0 ? { bg: 'blue.100' } : {}}
                    transition="background-color 0.2s"
                    border={selectedItem === index ? '0.125rem solid' : '0.0625rem solid'}
                    borderColor={selectedItem === index ? 'blue.300' : 'blue.200'}
                    shadow="sm"
                    flexShrink={0}
                  >
                    <HStack justify="space-between" align="center" w="100%">
                      <Text fontSize="sm" color="gray.700" fontWeight="medium">
                        {item.name}
                      </Text>
                      <ChevronRight size={16} color="#3182ce" />
                    </HStack>
                  </Box>
                );
              })}
            </VStack>
          </Box>
        </VStack>

        {/* 오른쪽: 상세 유입 경로 */}
        <VStack align="start" gap="0.75rem" w="100%" h="100%">
          <Heading size="sm" color="gray.800" fontWeight="medium">
            상세 유입 경로
          </Heading>

          {/* 스크롤 가능한 상세 경로 목록 */}
          <Box
            w="100%"
            h="calc(100% - 2.5rem)"
            overflowY="auto"
            overflowX="hidden"
            css={{
              '&::-webkit-scrollbar': {
                width: '0.375rem',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '0.1875rem',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#c1c1c1',
                borderRadius: '0.1875rem',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#a8a8a8',
              },
            }}
          >
            {selectedDetails && selectedDetails.length > 0 ? (
              <VStack align="start" gap="0.5rem" w="100%">
                {selectedDetails.map((detail, detailIndex) => {
                  const detailId = `detail-${detailIndex}`;
                  return (
                    <Box
                      key={detailId}
                      w="85%"
                      p="0.75rem"
                      bg="blue.50"
                      borderRadius="md"
                      border="0.0625rem solid"
                      borderColor="blue.200"
                      shadow="sm"
                      flexShrink={0}
                    >
                      <VStack align="start" gap="0.25rem" w="100%">
                        <Text fontSize="sm" color="blue.700" fontWeight="medium">
                          {detail.title}
                        </Text>
                        <Box w="100%" overflow="hidden">
                          <a
                            href={detail.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: '0.75rem',
                              color: '#3182ce',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: 'block',
                              width: '100%',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#2c5282';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#3182ce';
                            }}
                          >
                            {detail.url}
                          </a>
                        </Box>
                        <Text fontSize="xs" color="blue.700" fontWeight="medium" mt="0.25rem">
                          방문자: {detail.visits.toLocaleString()}명
                        </Text>
                      </VStack>
                    </Box>
                  );
                })}
              </VStack>
            ) : (
              <Box
                w="100%"
                p="1.5rem"
                bg="gray.50"
                borderRadius="md"
                border="0.0625rem solid"
                borderColor="gray.200"
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="12.5rem"
              >
                <Text fontSize="sm" color="gray.500">
                  왼쪽에서 유입 경로를 선택하세요
                </Text>
              </Box>
            )}
          </Box>
        </VStack>
      </Grid>

      {/* 전체 합계 */}
      <Box w="100%" pt="1rem" mt="1rem" borderTop="0.0625rem solid" borderColor="gray.200">
        <HStack justify="space-between" align="center">
          <Text fontSize="sm" color="gray.600" fontWeight="medium">
            전체
          </Text>
          <Text fontSize="lg" color="gray.800" fontWeight="bold">
            {total.toLocaleString()}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}
