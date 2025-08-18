'use client';

import React from 'react';
import { Box, HStack } from '@chakra-ui/react';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <HStack align="stretch" h="100vh" bg="gray.50" gap={0}>
      <Sidebar />
      <Box as="main" flex={1} overflowY="auto" p={6}>
        {children}
      </Box>
    </HStack>
  );
}
