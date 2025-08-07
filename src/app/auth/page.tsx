'use client';

import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { Container, Flex, Button } from '@chakra-ui/react';
// import { Toaster, toaster } from '@/components/ui/Toaster';

export default function AuthPage() {
  return (
    <Container maxW="1920px" py={8}>
      <Flex justify="center" align="center" minH="100vh">
        <LoginForm />
      </Flex>
    </Container>
  );
}
