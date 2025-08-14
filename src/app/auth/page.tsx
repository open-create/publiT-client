'use client';

import React from 'react';
import { Container, Flex, Button, Heading, Box, Text } from '@chakra-ui/react';
import { LoginForm, AutoLoginCheckbox } from '@/components/auth';
// import { Toaster, toaster } from '@/components/ui/Toaster';

export default function AuthPage() {
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
