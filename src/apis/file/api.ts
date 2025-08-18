import { useApiMutation } from '@/hooks/useApi';
import { FileUpload } from '@/types';

// File 관련 타입
export interface UploadFileData {
  file: File;
  type?: 'image' | 'document';
}

export interface UploadFileResponse {
  file: FileUpload;
}

// File API 함수들
export const fileApi = {
  // 파일 업로드
  uploadFile: () => '/files/upload',

  // 이미지 업로드
  uploadImage: () => '/files/upload/image',

  // 파일 삭제
  deleteFile: (fileId: string) => `/files/${fileId}`,
};

// File Hooks
export function useUploadFile() {
  return useApiMutation<UploadFileData, UploadFileResponse>('/files/upload', 'POST');
}

export function useUploadImage() {
  return useApiMutation<UploadFileData, UploadFileResponse>('/files/upload/image', 'POST');
}

export function useDeleteFile() {
  return useApiMutation<{ fileId: string }, void>('/files', 'DELETE');
}
