import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  UseQueryOptions,
  UseMutationOptions,
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
    queryFn: () => request<TData>(path, init),
    ...options,
  });
}

// POST/PUT/PATCH/DELETE
// 기본 에러 타입을 ApiError로 두어 status 코드 분기가 쉬워지게 함
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
export function useApiInfinite<TPage = any>(path: string, pageParamKey = 'page') {
  return useInfiniteQuery({
    queryKey: [path],
    queryFn: ({ pageParam = 1 }) => request<TPage>(`${path}?${pageParamKey}=${pageParam}`),
    initialPageParam: 1,
    getNextPageParam: (last: any) => last?.nextPage ?? false,
  });
}
