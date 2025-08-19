import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  type UseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { request, ApiError } from '@/lib/api';

// GET
export function useApiQuery<TData = unknown, TError = ApiError>(
  key: readonly unknown[],
  path: string,
  init?: RequestInit,
  options?: Omit<UseQueryOptions<TData, TError, TData, typeof key>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, TError, TData, typeof key>({
    queryKey: key,
    // React Query가 주는 signal을 fetch에 연결 → 언마운트/리페치 시 자동 abort
    queryFn: ({ signal }) => request<TData>(path, { ...init, signal }),
    ...options,
  });
}

// 변경계
export function useApiMutation<TInput = unknown, TData = unknown, TError = ApiError>(
  path: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  options?: UseMutationOptions<TData, TError, TInput>
) {
  return useMutation<TData, TError, TInput>({
    mutationFn: (input) => request<TData>(path, { method, body: input }),
    ...options,
  });
}

// 무한 스크롤
export function useApiInfinite<TPage extends Record<string, unknown> = Record<string, unknown>>(
  path: string,
  pageParamKey = 'page',
  opts?: { initialPageParam?: number }
) {
  const initial = opts?.initialPageParam ?? 1;
  return useInfiniteQuery({
    queryKey: [path, pageParamKey], // 키 안정화
    queryFn: ({ pageParam = initial, signal }) =>
      request<TPage>(`${path}?${pageParamKey}=${pageParam}`, { signal }),
    initialPageParam: initial,
    getNextPageParam: (last: Record<string, unknown>) => last?.nextPage ?? false,
  });
}
