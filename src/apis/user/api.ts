import { useApiQuery, useApiMutation } from '@/hooks/useApi';
import { User } from '@/types';

// User 관련 타입
export interface UpdateProfileData {
  username?: string;
  bio?: string;
  avatar?: string;
}

export interface ProfileResponse {
  user: User;
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
  return useApiQuery<ProfileResponse>(['user', 'profile'], '/users/profile');
}

export function useUpdateProfile() {
  return useApiMutation<UpdateProfileData, ProfileResponse>('/users', 'PATCH');
}

export function useDeleteUser() {
  return useApiMutation<void, void>('/users', 'DELETE');
}
