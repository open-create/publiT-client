'use client';

import { ButtonGroup, IconButton, Pagination as ChakraPagination, HStack } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export default function Pagination({
  currentPage,
  totalPages,
  onChange,
  siblingCount = 1,
  size = 'sm',
}: PaginationProps) {
  return (
    <ChakraPagination.Root
      count={totalPages}
      pageSize={1}
      page={currentPage}
      siblingCount={siblingCount}
      onPageChange={(e) => onChange(e.page)}
    >
      <HStack justify="center" align="center" w="100%">
        <ButtonGroup variant="outline" size={size} gap="4">
          <ChakraPagination.PrevTrigger asChild>
            <IconButton variant="ghost" size={size} aria-label="prev">
              <ChevronLeft />
            </IconButton>
          </ChakraPagination.PrevTrigger>

          <ChakraPagination.Items
            render={(page) => (
              <IconButton
                variant={{ base: 'outline', _selected: 'solid' }}
                colorPalette="blue"
                bg={{ _selected: 'blue.500' }}
                color={{ _selected: 'white' }}
              >
                {page.value}
              </IconButton>
            )}
          />

          <ChakraPagination.NextTrigger asChild>
            <IconButton variant="ghost" size={size} aria-label="next">
              <ChevronRight />
            </IconButton>
          </ChakraPagination.NextTrigger>
        </ButtonGroup>
      </HStack>
    </ChakraPagination.Root>
  );
}
