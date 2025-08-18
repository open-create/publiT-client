import { useApiMutation } from '@/hooks/useApi';
import { ApiResponse } from '@/types';

// Auth 관련 타입
export interface LoginData {
  provider: 'google' | 'kakao' | 'naver';
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    avatar?: string;
  };
}

export interface RefreshTokenData {
  refreshToken: string;
}

// Auth API 함수들
export const authApi = {
  // 소셜 로그인 (리다이렉트)
  getSocialLoginUrl: (provider: string) => `/auth/login-${provider}`,
  
  // 토큰 재발급
  refreshToken: () => '/auth/refresh-token',
};

// Auth Hooks
export function useRefreshToken() {
  return useApiMutation<RefreshTokenData, AuthResponse>('/auth/refresh-token', 'POST');
}
