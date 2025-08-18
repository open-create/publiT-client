import { useApiMutation } from '@/hooks/useApi';

// Like 관련 타입
export interface LikeData {
  postId: string;
}

export interface LikeResponse {
  liked: boolean;
  count: number;
}

// Like API 함수들
export const likeApi = {
  // 포스트 좋아요/취소
  toggleLike: (postId: string) => `/pubbles/${postId}/like`,

  // 댓글 좋아요/취소
  toggleCommentLike: (commentId: string) => `/comments/${commentId}/like`,
};

// Like Hooks
export function useTogglePostLike() {
  return useApiMutation<LikeData, LikeResponse>('/pubbles/like', 'POST');
}

export function useToggleCommentLike() {
  return useApiMutation<{ commentId: string }, LikeResponse>('/comments/like', 'POST');
}
