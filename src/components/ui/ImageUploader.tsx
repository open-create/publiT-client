'use client';

import React, { useState, useRef } from 'react';
import { Camera, Upload, Image } from 'lucide-react';
import { VStack, HStack, Box, Text, IconButton } from '@chakra-ui/react';
import Button from '@/components/ui/Button';
import { toaster } from '@/components/ui/Toaster';

type ImageUploaderType = 'profile' | 'editor';

interface ImageUploaderProps {
  type: ImageUploaderType;
  currentImage?: string | null;
  username?: string; // profile type에서만 사용
  onImageChange: (file: File | null) => void;
  maxSize?: number; // MB 단위, 기본값 5MB
  acceptedFormats?: string[]; // 기본값 ['image/jpeg', 'image/png']
}

export default function ImageUploader({
  type,
  currentImage,
  username,
  onImageChange,
  maxSize = 5,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/jpg'],
}: ImageUploaderProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 선택 핸들러
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 크기 체크
      if (file.size > maxSize * 1024 * 1024) {
        toaster.create({
          title: `파일 크기는 ${maxSize}MB 이하여야 합니다.`,
          type: 'error',
          duration: 3000,
        });
        return;
      }

      // 이미지 파일 타입 체크
      if (!acceptedFormats.some((format) => file.type === format)) {
        const formatNames = acceptedFormats
          .map((f) => f.split('/')[1]?.toUpperCase() ?? 'UNKNOWN')
          .join(', ');
        toaster.create({
          title: `${formatNames} 파일만 업로드 가능합니다.`,
          type: 'error',
          duration: 3000,
        });
        return;
      }

      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // 부모 컴포넌트에 파일 전달
      onImageChange(file);
    }
  };

  // 이미지 제거 핸들러
  const handleRemoveImage = () => {
    setPreviewImage(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 이미지 업로드 핸들러
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // 프로필 수정 페이지용
  if (type === 'profile') {
    return (
      <VStack align="start" gap={3}>
        <Text fontWeight="medium">프로필 이미지</Text>

        <HStack gap={4} align="start">
          {/* 프로필 이미지 미리보기 */}
          <Box position="relative">
            <Box
              w="100px"
              h="100px"
              borderRadius="full"
              bg="gray.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="2px solid"
              borderColor="gray.300"
              overflow="hidden"
            >
              {previewImage ? (
                <img
                  alt="Preview"
                  src={previewImage}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Text fontSize="3xl" color="gray.500" fontWeight="bold">
                  {username?.charAt(0) || 'U'}
                </Text>
              )}
            </Box>

            {/* 카메라 아이콘 오버레이 */}
            <IconButton
              aria-label="이미지 변경"
              position="absolute"
              bottom="0"
              right="0"
              size="sm"
              borderRadius="full"
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }}
              onClick={handleUploadClick}
            >
              <Camera size={16} />
            </IconButton>
          </Box>

          {/* 버튼 그룹 */}
          <VStack align="start" gap={2}>
            <HStack gap={2}>
              <Button size="sm" variant="outline" onClick={handleUploadClick}>
                <Upload size={16} />
                파일 선택
              </Button>

              {previewImage && (
                <Button size="sm" variant="danger" onClick={handleRemoveImage}>
                  이미지 제거
                </Button>
              )}
            </HStack>

            {/* 안내 텍스트 */}
            <Text fontSize="sm" color="gray.500">
              JPG, PNG 파일만 가능하며, 최대 {maxSize}MB까지 업로드할 수 있습니다.
            </Text>
          </VStack>
        </HStack>

        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </VStack>
    );
  }

  // 에디터용 단순 아이콘 버튼
  if (type === 'editor') {
    return (
      <>
        <IconButton
          aria-label="이미지 업로드"
          variant="ghost"
          size="sm"
          onClick={handleUploadClick}
          color="gray.600"
          _hover={{ bg: 'gray.100', color: 'gray.800' }}
        >
          <Image size={20} />
        </IconButton>

        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </>
    );
  }

  return null;
}
