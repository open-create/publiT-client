'use client';

import { Container, Flex, Heading, Box, Text, Spinner, Center } from '@chakra-ui/react';
import { LoginForm, AutoLoginCheckbox } from '@/components/auth';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useRefreshToken } from '@/apis/auth';
// import { Toaster, toaster } from '@/components/ui/Toaster';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const loginSuccess = searchParams.get('login') === 'success';
  const refreshTokenMutation = useRefreshToken();
  const attemptedRef = useRef(false);

  // 소셜 인증 후 돌아온 경우에만 재발급 호출
  useEffect(() => {
    if (!loginSuccess || attemptedRef.current) return;
    attemptedRef.current = true;
    refreshTokenMutation.mutate(undefined, {
      onSuccess: (data) => {
        if (data?.success && data?.data) {
          localStorage.setItem('accessToken', data.data);
          // 홈으로 이동
          window.location.href = '/';
        }
      },
      onError: () => {
        // 실패 시에는 그대로 로그인 화면 유지
      },
    });
  }, [loginSuccess, refreshTokenMutation]);

  if (loginSuccess && refreshTokenMutation.isPending) {
    return (
      <Container maxW="1920px" h="100%" display="flex" flexDirection="column">
        <Flex align="center" justify="center" flex="1" minH={0}>
          <Center>
            <Spinner size="lg" color="blue.500" />
            <Text ml={3}>로그인 처리 중...</Text>
          </Center>
        </Flex>
      </Container>
    );
  }
  return (
    <Container maxW="1920px" h="100%" display="flex" flexDirection="column">
      <Flex align="center" justify="center" flex="1" minH={0}>
        <Box w="100%" maxW="27rem">
          <Heading size="3xl" mb={6} textAlign="left" color="blue.500">
            로그인
          </Heading>
          <LoginForm />
          <AutoLoginCheckbox />
          <Box borderTop="1px solid" borderColor="blue.500" my={4} />
          <Text mt="4" color="gray.500" fontSize="xs" textAlign="left">
            별도 회원가입 절차 없이, 로그인 한 번으로 바로 가입이 완료됩니다.
          </Text>
        </Box>
      </Flex>
    </Container>
  );
}
