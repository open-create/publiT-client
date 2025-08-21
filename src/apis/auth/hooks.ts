import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRefreshToken } from './api';

// 로그인 후 토큰 재발급 및 리다이렉트 처리
export function useAuthRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshTokenMutation = useRefreshToken();
  const attemptedRef = useRef(false);

  // 소셜 인증 성공 후에만 동작 (login=success)
  const loginSuccess = searchParams?.get('login') === 'success';

  useEffect(() => {
    if (!loginSuccess || attemptedRef.current) return;
    attemptedRef.current = true;
    // refreshToken(쿠키)로 accessToken 재발급
    refreshTokenMutation.mutate(undefined, {
      onSuccess: (data) => {
        if (data?.success && data?.data) {
          localStorage.setItem('accessToken', data.data);
          // URL 정리 후 홈으로 이동
          const url = new URL(window.location.href);
          url.searchParams.delete('login');
          window.history.replaceState({}, '', url.toString());
          router.replace('/');
        }
      },
      onError: () => {
        // 실패 시 그대로 로그인 화면 유지
      },
    });
  }, [loginSuccess, refreshTokenMutation, router]);

  return {
    isRefreshing: loginSuccess ? refreshTokenMutation.isPending : false,
    error: refreshTokenMutation.error,
  };
}
