import { useApiQuery, useApiMutation } from '@/hooks/useApi';
import { Comment } from '@/types';

// Comment 관련 타입
export interface CreateCommentData {
  content: string;
  postId: string;
  parentId?: string;
}

export interface UpdateCommentData {
  id: string;
  content: string;
}

export interface CommentListResponse {
  comments: Comment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CommentDetailResponse {
  comment: Comment;
}

// Comment API 함수들
export const commentApi = {
  // 퍼블 댓글 조회
  getComments: (postId: string) => `/pubbles/${postId}/comments`,

  // 퍼블 댓글 생성
  createComment: (postId: string) => `/pubbles/${postId}/comments`,

  // 퍼블 댓글 수정
  updateComment: (commentId: string) => `/comments/${commentId}`,

  // 퍼블 댓글 삭제
  deleteComment: (commentId: string) => `/comments/${commentId}`,
};

// Comment Hooks
export function useComments(postId: string) {
  return useApiQuery<CommentListResponse>(['comments', postId], `/pubbles/${postId}/comments`);
}

export function useCreateComment() {
  return useApiMutation<CreateCommentData, CommentDetailResponse>('/comments', 'POST');
}

export function useUpdateComment() {
  return useApiMutation<UpdateCommentData, CommentDetailResponse>('/comments', 'PATCH');
}

export function useDeleteComment() {
  return useApiMutation<{ id: string }, void>('/comments', 'DELETE');
}
