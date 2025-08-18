import { useApiQuery, useApiMutation, useApiInfinite } from '@/hooks/useApi';
import { Post } from '@/types';

// Pubble 관련 타입
export interface CreatePubbleData {
  title: string;
  subtitle?: string;
  content: string;
  tags: string[];
  visibility: 'public' | 'private';
  adultOnly: boolean;
  password?: string;
  type: 'scroll' | 'ebook';
}

export interface UpdatePubbleData extends Partial<CreatePubbleData> {
  id: string;
}

export interface PubbleListResponse {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PubbleDetailResponse {
  post: Post;
}

// Pubble API 함수들
export const pubbleApi = {
  // 퍼블 목록 조회
  getPubbles: () => '/pubbles',

  // 퍼블 상세 조회
  getPubble: (id: string) => `/pubbles/${id}`,

  // 퍼블 생성
  createPubble: () => '/pubbles',

  // 퍼블 수정
  updatePubble: (id: string) => `/pubbles/${id}`,

  // 퍼블 삭제
  deletePubble: (id: string) => `/pubbles/${id}`,
};

// Pubble Hooks
export function usePubbles() {
  return useApiQuery<PubbleListResponse>(['pubbles'], '/pubbles');
}

export function usePubble(id: string) {
  return useApiQuery<PubbleDetailResponse>(['pubbles', id], `/pubbles/${id}`);
}

export function useCreatePubble() {
  return useApiMutation<CreatePubbleData, PubbleDetailResponse>('/pubbles', 'POST');
}

export function useUpdatePubble() {
  return useApiMutation<UpdatePubbleData, PubbleDetailResponse>('/pubbles', 'PATCH');
}

export function useDeletePubble() {
  return useApiMutation<{ id: string }, void>('/pubbles', 'DELETE');
}

export function useInfinitePubbles() {
  return useApiInfinite<PubbleListResponse>('/pubbles');
}
