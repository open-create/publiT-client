import { useApiMutation } from '@/hooks/useApi';

// Auth 관련 타입
export interface LoginData {
  provider: 'google' | 'kakao' | 'naver';
}

// 백엔드 응답 구조에 맞춘 타입
export interface AuthResponse {
  success: boolean;
  code: number;
  message: string;
  data: string; // accessToken
}

export interface RefreshTokenData {
  // refreshToken은 쿠키에서 자동으로 전송되므로 별도 데이터 불필요
  _placeholder?: never;
}

// Auth API 함수들
export const authApi = {
  // 소셜 로그인 (리다이렉트)
  getSocialLoginUrl: (provider: string) => `/auth/login-${provider}`,

  // 토큰 재발급
  refreshToken: () => '/auth/refresh-token',
};

// 소셜 로그인 리다이렉트 함수
export function redirectToSocialLogin(provider: 'google' | 'kakao' | 'naver') {
  // Next.js rewrites를 통해 백엔드로 프록시
  window.location.href = `/auth/login-${provider}`;
}

// Auth Hooks
export function useRefreshToken() {
  return useApiMutation<void, AuthResponse>('/auth/refresh-token', 'POST');
}
