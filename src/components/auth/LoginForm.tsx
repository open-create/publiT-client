'use client';

import React from 'react';
import Image from 'next/image';
import { VStack, Box, Text, HStack, Badge } from '@chakra-ui/react';
import Button from '@/components/ui/Button';
import Tooltip from '@/components/ui/Tooltip';
import { redirectToSocialLogin } from '@/apis/auth';

type AuthOption = {
  id: 'google' | 'kakao' | 'naver';
  label: string;
  icon: { src: string; w: number; h: number };
  colorPalette: string;
  bgColor: string;
  hoverBgColor: string;
};

// 1) authOptions 배열 정의
const authOptions: AuthOption[] = [
  {
    id: 'google',
    label: '구글로 로그인',
    icon: { src: '/assets/google.webp', w: 24, h: 24 },
    colorPalette: 'blue',
    bgColor: 'white',
    hoverBgColor: 'gray.50',
  },
  {
    id: 'kakao',
    label: '카카오로 로그인',
    icon: { src: '/assets/kakao.png', w: 24, h: 24 },
    colorPalette: 'blue',
    bgColor: 'yellow.500',
    hoverBgColor: 'yellow.300',
  },
  {
    id: 'naver',
    label: '네이버로 로그인',
    icon: { src: '/assets/naverText.png', w: 20, h: 20 },
    colorPalette: 'blue',
    bgColor: 'green.500',
    hoverBgColor: 'green.300',
  },
];

export default function LoginForm() {
  // 2) 최근 로그인 더미 데이터
  /*
  const recentLogin = {
    authOptions: 'kakao' as AuthOption['id'],
    email: 'user@example.com',
    lastLogin: '2024-01-15',
  };
  */

  return (
    <VStack gap={4} align="stretch" w="100%" maxW="27rem">
      {authOptions.map(({ id, label, icon, colorPalette, bgColor, hoverBgColor }) => (
        <Box key={id} position="relative" display="inline-block" w="100%">
          {/* 3) 로그인 버튼 */}
          <Button
            onClick={() => redirectToSocialLogin(id)}
            size="md"
            w="100%"
            colorPalette={colorPalette}
            bg={bgColor}
            color={bgColor === 'white' ? 'gray.800' : 'white'}
            borderColor={bgColor === 'white' ? 'gray.200' : 'transparent'}
            fontSize="sm"
            _hover={{ bg: hoverBgColor }}
          >
            <HStack gap={2}>
              <Image src={icon.src} alt={id} width={icon.w} height={icon.h} />
              <Text>{label}</Text>
            </HStack>
          </Button>

          {/* 4) recentLogin.authOptions가 일치할 때만 뱃지＋툴팁 */}
          {false && (
            <Tooltip
              content={
                <VStack gap={0} align="start">
                  <Text fontSize="s">user@example.com</Text>
                  <Text fontSize="xs" color="gray.500">
                    마지막: 2024-01-15
                  </Text>
                </VStack>
              }
            >
              <Badge
                position="absolute"
                top="50%"
                right={-3}
                transform="translateY(-50%)"
                bg="blue.500"
                _hover={{ bg: 'blue.50' }}
                variant="solid"
                px={2}
                py={1}
                fontSize="xs"
                rounded="md"
                cursor="pointer"
              >
                최근 로그인
              </Badge>
            </Tooltip>
          )}
        </Box>
      ))}
    </VStack>
  );
}
