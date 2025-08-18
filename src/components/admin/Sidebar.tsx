'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, VStack, Heading, HStack, Text } from '@chakra-ui/react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/notices', label: 'Notice', icon: '📢' },
    { href: '/admin/inquiries', label: 'Inquiry', icon: '❓' },
    { href: '/admin/reports', label: 'Report', icon: '🚨' },
    { href: '/admin/search', label: 'Search', icon: '🔎' },
    { href: '/admin/stats', label: 'Stats', icon: '📈' },
  ];

  return (
    <Box w="16rem" bg="white" shadow="lg">
      {/* <Box p={6}>
        <Heading size="lg" color="gray.900">
          관리자
        </Heading>
      </Box> */}

      <Box as="nav" mt={6}>
        <VStack align="stretch" px={3} gap={1}>
          {menuItems.map((item) => {
            const isDashboard = item.href === '/admin';
            const isActive = isDashboard
              ? pathname === '/admin'
              : pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link key={item.href} href={item.href}>
                <Box
                  px={3}
                  py={2}
                  fontSize="sm"
                  fontWeight="medium"
                  borderRadius="md"
                  bg={isActive ? 'blue.100' : 'transparent'}
                  color={isActive ? 'blue.700' : 'gray.700'}
                  _hover={{
                    bg: isActive ? 'blue.100' : 'gray.100',
                    color: isActive ? 'blue.700' : 'gray.900',
                  }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  <HStack>
                    <Text>{item.icon}</Text>
                    <Text>{item.label}</Text>
                  </HStack>
                </Box>
              </Link>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
}
