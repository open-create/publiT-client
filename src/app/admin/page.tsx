'use client';

import React from 'react';
import Link from 'next/link';
import { VStack, HStack, Heading, Grid, GridItem, Box, Text } from '@chakra-ui/react';

export default function AdminDashboard() {
  const stats = [
    { title: '공지사항', count: '12', color: 'blue.600', href: '/admin/notices' },
    { title: '문의', count: '8', color: 'yellow.600', href: '/admin/inquiries' },
    { title: '신고', count: '3', color: 'red.600', href: '/admin/reports' },
    { title: '통계', count: '1.2K', color: 'green.600', href: '/admin/stats' },
  ];

  return (
    <VStack align="stretch" gap={6}>
      <HStack justify="space-between" align="center">
        <Heading size="2xl" color="gray.900">
          관리자 대시보드
        </Heading>
      </HStack>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
        {stats.map((stat) => (
          <GridItem key={stat.title}>
            <Box bg="white" p={6} borderRadius="lg" shadow="md">
              <VStack align="start" gap={2}>
                <Text fontSize="lg" fontWeight="semibold" color="gray.900">
                  {stat.title}
                </Text>
                <Text fontSize="3xl" fontWeight="bold" color={stat.color}>
                  {stat.count}
                </Text>
                <Link href={stat.href}>
                  <Text color="blue.500" _hover={{ color: 'blue.700' }} cursor="pointer">
                    {stat.title === '통계' ? '보기' : '관리하기'} →
                  </Text>
                </Link>
              </VStack>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
}
