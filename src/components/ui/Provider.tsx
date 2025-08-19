'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { system } from '@/styles/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

// 개발 환경에서만 ReactQueryDevtools import
const ReactQueryDevtools =
  process.env.NODE_ENV === 'development'
    ? require('@tanstack/react-query-devtools').ReactQueryDevtools
    : null;

export default function Provider(props: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {props.children}
          {ReactQueryDevtools && <ReactQueryDevtools initialIsOpen={false} />}
        </ThemeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
