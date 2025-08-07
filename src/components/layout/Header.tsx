'use client';

import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Flex, Box, HStack, IconButton, Icon } from '@chakra-ui/react';
import Button from '@/components/ui/Button';
import { BellIcon, MegaphoneIcon, NotebookPenIcon } from 'lucide-react';

type HeaderVariant = 'minimal' | 'guest' | 'user' | 'admin';

interface HeaderProps {
  variant?: HeaderVariant;
}

export default function Header({ variant = 'minimal' }: HeaderProps) {
  const router = useRouter();

  /* 공통: 왼쪽 로고 */
  const Logo = (
    <NextLink href="/">
      <Image src="/assets/logo_pic.png" alt="logo" width={148} height={32} />
    </NextLink>
  );

  /* 우측 요소 – variant별로 결정 */
  let right: React.ReactNode = null;

  switch (variant) {
    case 'guest':
      right = (
        <HStack gap="10" fontSize="sm">
          <NextLink href="/search">검색</NextLink>
          <Box mr="5">
            <NextLink href="/auth">로그인</NextLink>
          </Box>
        </HStack>
      );
      break;

    case 'user':
      right = (
        <HStack gap="10" fontSize="sm">
          <Button bg="blue.50" variant="primary" onClick={() => router.push('/pubble')}>
            <NotebookPenIcon />
            PUBBLE +
          </Button>

          <NextLink href="/search">알림</NextLink>
          <NextLink href="/search">검색</NextLink>
          <Box mr="5">
            <NextLink href="/search">프로필</NextLink>
          </Box>
        </HStack>
      );
      break;

    case 'admin':
      right = (
        <HStack gap="6">
          <Button bg="blue.50" variant="primary" onClick={() => router.push('/search')}>
            + 공지 작성
          </Button>
          <IconButton
            aria-label="알림"
            variant="ghost"
            size="lg"
            onClick={() => router.push('/search')}
          >
            <Icon as={BellIcon} boxSize={7} color="blue.500" />
          </IconButton>
          <Box mr="5">
            <Box w="8" h="8" borderRadius="full" bg="gray.300" />
          </Box>
        </HStack>
      );
      break;

    case 'minimal':
    default:
      right = null;
  }

  return (
    <Box as="header" w="100%" px={{ base: 4, md: 6 }} py="3" boxShadow="sm" bg="white">
      <Flex align="center" justify="space-between">
        {Logo}
        {right}
      </Flex>
    </Box>
  );
}
