import { useApiQuery, useApiMutation, useApiInfinite } from '@/hooks/useApi';
import { Post } from '@/types';

// Pubble 관련 타입
// POST /pubbles 요청 바디 스펙
export interface CreatePubbleRequest {
  title: string;
  content: string;
  pubbleCategory: { id: string };
  pubblesTags: { id: string }[];
}

export interface UpdatePubbleData extends Partial<CreatePubbleRequest> {
  id: string;
}

export interface PubbleListResponse extends Record<string, unknown> {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// POST /pubbles 성공 응답 스펙
export interface CreatePubbleResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    id: string;
    title: string;
    content: string;
    pubbleCategory: { id: string };
    pubblesTags: { id: string }[];
    author: {
      id: string;
      username: string;
      email: string;
      profile_img: string | null;
      created_at: string;
    };
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  };
}

// Pubble API 함수들
export const pubbleApi = {
  // 퍼블 목록 조회 (쿼리 파라미터 지원)
  getPubbles: (params?: { source?: string; page?: number; limit?: number }) => {
    const q = new URLSearchParams();
    if (params?.source) q.set('source', params.source);
    if (typeof params?.page === 'number') q.set('page', String(params.page));
    if (typeof params?.limit === 'number') q.set('limit', String(params.limit));
    const qs = q.toString();
    return `/pubbles${qs ? `?${qs}` : ''}`;
  },

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
export function usePubbles(params?: { source?: string; page?: number; limit?: number }) {
  const path = pubbleApi.getPubbles(params);
  return useApiQuery<PubbleListResponse>(['pubbles', params], path);
}

export function usePubble(id: string) {
  return useApiQuery<Post>(['pubbles', id], `/pubbles/${id}`);
}

export function useCreatePubble() {
  return useApiMutation<CreatePubbleRequest, CreatePubbleResponse>('/pubbles', 'POST');
}

export function useUpdatePubble() {
  return useApiMutation<UpdatePubbleData, Post>('/pubbles', 'PATCH');
}

export function useDeletePubble() {
  return useApiMutation<{ id: string }, void>('/pubbles', 'DELETE');
}

export function useInfinitePubbles() {
  return useApiInfinite<PubbleListResponse>('/pubbles');
}
