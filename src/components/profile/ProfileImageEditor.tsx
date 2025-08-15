'use client';

import React from 'react';
import ImageUploader from '@/components/ui/ImageUploader';

interface ProfileImageEditorProps {
  currentImage?: string | null;
  username: string;
  onImageChange: (file: File | null) => void;
}

export default function ProfileImageEditor({
  currentImage,
  username,
  onImageChange,
}: ProfileImageEditorProps) {
  return (
    <ImageUploader
      type="profile"
      currentImage={currentImage}
      username={username}
      onImageChange={onImageChange}
      maxSize={5}
      acceptedFormats={['image/jpeg', 'image/png', 'image/jpg']}
    />
  );
}
