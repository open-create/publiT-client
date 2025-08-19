import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useRefreshToken } from './api';

// 로그인 후 토큰 재발급 및 리다이렉트 처리
export function useAuthRedirect() {
  const router = useRouter();
  const refreshTokenMutation = useRefreshToken();
  const attemptedRef = useRef(false);

  // 스피너 노출은 소셜 로그인 콜백으로 돌아왔을 때만
  const showSpinnerByParam =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('login') === 'success';

  useEffect(() => {
    if (attemptedRef.current) return;
    attemptedRef.current = true;

    // 토큰 재발급 요청 (쿠키 기반) — 항상 1회 시도
    refreshTokenMutation.mutate(undefined, {
      onSuccess: (data) => {
        // console.log('[auth] refresh-token success:', data, new Date().toISOString());
        if (data?.success && data?.data) {
          // accessToken 저장
          localStorage.setItem('accessToken', data.data);
          // 콜백으로 들어온 경우엔 홈으로 이동
          if (showSpinnerByParam) router.replace('/');
        }
      },
      onError: () => {
        // console.error('[auth] refresh-token error:', error, new Date().toISOString());
        // 실패 시에는 현재 페이지에서 로그인 버튼 노출 (리다이렉트 없음)
      },
    });
  }, [refreshTokenMutation, router, showSpinnerByParam]);

  return {
    isRefreshing: showSpinnerByParam ? refreshTokenMutation.isPending : false,
    error: refreshTokenMutation.error,
  };
}
