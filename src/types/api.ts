// API 응답 타입
export interface ApiResponse<T = Record<string, unknown>> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 페이지네이션 타입
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 에러 타입
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// 로딩 상태 타입
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// 폼 상태 타입
export interface FormState<T = Record<string, unknown>> {
  data: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
}
