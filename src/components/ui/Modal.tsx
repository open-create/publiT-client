'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Flex, Portal, Text, Icon, HStack } from '@chakra-ui/react';
import Button from '@/components/ui/Button';
import { X, ChevronRight } from 'lucide-react';

type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

import { ModalProps } from './types';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  footer,
  closeOnOverlayClick = true,
  hideCloseButton = false,
  showCloseButton,
  showTitle = true,
  showTitleAction = false,
  onTitleAction,
  withOverlay = true,
  containerProps,
  closeOnOutsideClick = true,
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen && withOverlay) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (withOverlay) document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, withOverlay]);

  // 인라인 모달일 때 바깥 클릭으로 닫기
  useEffect(() => {
    if (!isOpen || withOverlay === true || !closeOnOutsideClick) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      // 트리거 버튼(예: data-modal-trigger) 클릭은 무시하여 토글 시 재오픈 현상 방지
      if ((target as Element | null)?.closest?.('[data-modal-trigger]')) return;
      if (contentRef.current && target && !contentRef.current.contains(target)) {
        onClose();
      }
    };
    document.addEventListener('click', handleClick, { capture: true });
    return () =>
      document.removeEventListener('click', handleClick, {
        capture: true,
      } as AddEventListenerOptions);
  }, [isOpen, withOverlay, closeOnOutsideClick, onClose]);

  if (!isOpen) return null;

  const maxW: Record<ModalSize, string> = {
    xs: '20rem',
    sm: '24rem',
    md: '32rem',
    lg: '42rem',
    xl: '56rem',
    full: '100vw',
  };

  const shouldShowClose = showCloseButton !== undefined ? showCloseButton : !hideCloseButton;
  const shouldShowHeader = (showTitle && !!title) || shouldShowClose;

  // 인라인(배경 없음) 모드
  if (!withOverlay) {
    return isOpen ? (
      <Box
        role="dialog"
        aria-modal={false}
        bg="white"
        color="gray.800"
        rounded="lg"
        boxShadow="xl"
        w="100%"
        maxW={maxW[size]}
        {...containerProps}
        ref={contentRef}
      >
        {shouldShowHeader && (
          <Flex
            align="center"
            justify="space-between"
            pt={4}
            pb={3}
            pl={4}
            borderBottom="1px solid"
            borderColor="gray.100"
          >
            {showTitle && title ? (
              <HStack gap={1}>
                <Text id="ui-modal-title" fontSize="md" fontWeight="medium">
                  {title}
                </Text>
                {showTitleAction && onTitleAction && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={onTitleAction}
                    p="0"
                    minW="auto"
                    h="auto"
                    color="gray.500"
                    _hover={{ color: 'gray.700', bg: 'transparent' }}
                    aria-label="이동"
                  >
                    <Icon as={ChevronRight} boxSize={6} />
                  </Button>
                )}
              </HStack>
            ) : (
              <span />
            )}
            {shouldShowClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                p="0"
                minW="auto"
                h="auto"
                color="gray.500"
                _hover={{ color: 'gray.700', bg: 'transparent' }}
                aria-label="닫기"
              >
                <Icon as={X} boxSize={4} />
              </Button>
            )}
          </Flex>
        )}
        <Box p={4}>{children}</Box>
        {footer && (
          <Box p={4} borderTop="1px solid" borderColor="gray.100">
            {footer}
          </Box>
        )}
      </Box>
    ) : null;
  }

  return (
    <Portal>
      <Box position="fixed" inset={0} zIndex={1400}>
        <Box
          position="absolute"
          inset={0}
          bg="blackAlpha.500"
          onClick={closeOnOutsideClick ? onClose : closeOnOverlayClick ? onClose : undefined}
          zIndex={0}
        />
        <Flex
          minH="100vh"
          align="center"
          justify="center"
          p={{ base: 4, md: 6 }}
          position="relative"
          zIndex={1}
          pointerEvents="none"
        >
          <Box
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'ui-modal-title' : undefined}
            bg="white"
            color="gray.800"
            rounded="lg"
            boxShadow="xl"
            w="100%"
            maxW={maxW[size]}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            pointerEvents="auto"
            overflow="visible"
            ref={contentRef}
          >
            {shouldShowHeader && (
              <Flex
                align="center"
                justify="space-between"
                p={4}
                borderBottom="1px solid"
                borderColor="gray.100"
              >
                {showTitle && title ? (
                  <HStack gap={1}>
                    <Text id="ui-modal-title" fontSize="lg" fontWeight="medium">
                      {title}
                    </Text>
                    {showTitleAction && onTitleAction && (
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={onTitleAction}
                        p="0"
                        minW="auto"
                        h="auto"
                        color="gray.500"
                        _hover={{ color: 'gray.700', bg: 'transparent' }}
                        aria-label="이동"
                      >
                        <Icon as={ChevronRight} boxSize={4} />
                      </Button>
                    )}
                  </HStack>
                ) : (
                  <span />
                )}
                {shouldShowClose && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    p="0"
                    minW="auto"
                    h="auto"
                    color="gray.500"
                    _hover={{ color: 'gray.700', bg: 'transparent' }}
                    aria-label="닫기"
                  >
                    <Icon as={X} boxSize={4} />
                  </Button>
                )}
              </Flex>
            )}
            <Box p={4} overflow="visible">
              {children}
            </Box>
            {footer && (
              <Box p={4} borderTop="1px solid" borderColor="gray.100">
                {footer}
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
    </Portal>
  );
}
