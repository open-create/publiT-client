'use client';

import { VStack, HStack, Heading, Grid, GridItem, Box, Text } from '@chakra-ui/react';

export default function StatsPage() {
  const stats = [
    { title: '총 사용자', count: '1,234', color: 'blue.600', change: '+12% 이번 달' },
    { title: '총 게시글', count: '5,678', color: 'green.600', change: '+8% 이번 주' },
    { title: '활성 사용자', count: '892', color: 'yellow.600', change: '오늘' },
    { title: '신고 건수', count: '23', color: 'red.600', change: '이번 주' },
  ];

  const charts = [{ title: '사용자 증가 추이' }, { title: '게시글 분포' }];

  return (
    <VStack align="stretch" gap={6}>
      <HStack justify="space-between" align="center">
        <Heading size="2xl" color="gray.900">
          통계 대시보드
        </Heading>
      </HStack>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
        {stats.map((stat) => (
          <GridItem key={stat.title}>
            <Box bg="white" p={6} borderRadius="lg" shadow="md">
              <VStack align="start" gap={1}>
                <Text fontSize="lg" fontWeight="semibold" color="gray.900">
                  {stat.title}
                </Text>
                <Text fontSize="3xl" fontWeight="bold" color={stat.color}>
                  {stat.count}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {stat.change}
                </Text>
              </VStack>
            </Box>
          </GridItem>
        ))}
      </Grid>

      <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
        {charts.map((chart) => (
          <GridItem key={chart.title}>
            <Box bg="white" p={6} borderRadius="lg" shadow="md">
              <Text fontSize="lg" fontWeight="semibold" color="gray.900" mb={4}>
                {chart.title}
              </Text>
              <Box
                h="16rem"
                bg="gray.100"
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="gray.500">차트 컴포넌트</Text>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
}
