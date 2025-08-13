'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Flex, Portal, Text, chakra, BoxProps } from '@chakra-ui/react';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: ModalSize;
  footer?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  hideCloseButton?: boolean;
  showCloseButton?: boolean; // header X 버튼 노출 여부
  withOverlay?: boolean; // false면 배경/포털 없이 인라인 드롭다운처럼 렌더
  containerProps?: Partial<Omit<BoxProps, 'css' | 'accentColor'>>; // v3 타입 충돌 방지
  closeOnOutsideClick?: boolean; // 배경/바깥 클릭 시 무조건 닫기 (기본 true)
}

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
      if (contentRef.current && target && !contentRef.current.contains(target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, withOverlay, closeOnOutsideClick, onClose]);

  if (!isOpen) return null;

  const maxW: Record<ModalSize, string> = {
    sm: '24rem',
    md: '32rem',
    lg: '42rem',
    xl: '56rem',
    full: '100vw',
  };

  const shouldShowClose = showCloseButton !== undefined ? showCloseButton : !hideCloseButton;

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
        {(title || !hideCloseButton) && (
          <Flex
            align="center"
            justify="space-between"
            p={4}
            borderBottom="1px solid"
            borderColor="gray.100"
          >
            {title ? (
              <Text id="ui-modal-title" fontSize="lg" fontWeight="medium">
                {title}
              </Text>
            ) : (
              <span />
            )}
            {shouldShowClose && (
              <chakra.button
                type="button"
                aria-label="닫기"
                onClick={onClose}
                color="gray.500"
                _hover={{ color: 'gray.700' }}
              >
                ×
              </chakra.button>
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
            onClick={(e) => e.stopPropagation()}
            pointerEvents="auto"
            ref={contentRef}
          >
            {(title || !hideCloseButton) && (
              <Flex
                align="center"
                justify="space-between"
                p={4}
                borderBottom="1px solid"
                borderColor="gray.100"
              >
                {title ? (
                  <Text id="ui-modal-title" fontSize="lg" fontWeight="medium">
                    {title}
                  </Text>
                ) : (
                  <span />
                )}
                {shouldShowClose && (
                  <chakra.button
                    type="button"
                    aria-label="닫기"
                    onClick={onClose}
                    color="gray.500"
                    _hover={{ color: 'gray.700' }}
                  >
                    ×
                  </chakra.button>
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
        </Flex>
      </Box>
    </Portal>
  );
}
