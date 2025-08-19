import { useApiQuery, useApiMutation } from '@/hooks/useApi';

// User 관련 타입
export interface UpdateProfileData {
  username?: string;
  bio?: string;
  avatar?: string;
}

export interface GetProfileResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    id: string;
    username: string;
    email: string;
    profile_img: string | null;
    created_at: string;
  };
}

// User API 함수들
export const userApi = {
  // 프로필 조회
  getProfile: () => '/users/profile',

  // 프로필 업데이트
  updateProfile: () => '/users',

  // 유저 탈퇴
  deleteUser: () => '/users',
};

// User Hooks
export function useProfile() {
  return useApiQuery<GetProfileResponse>(['user', 'profile'], '/users/profile');
}

export function useUpdateProfile() {
  return useApiMutation<UpdateProfileData, GetProfileResponse>('/users', 'PATCH');
}

export function useDeleteUser() {
  return useApiMutation<void, void>('/users', 'DELETE');
}
