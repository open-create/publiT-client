import { useMutation } from '@tanstack/react-query';

// 모델 API 베이스 URL (배포 시 환경변수로 바꾸면 좋음)
const MODEL_API_BASE = 'https://publit-model-test-531771359911.asia-northeast3.run.app';

export interface EvaluateRequestBody {
  content: string; // HTML 문자열
}

export interface EvaluateResponse {
  scores: {
    creativity: number; // 1~5
    structure: number;
    style: number;
    emotion: number;
    persuasion: number;
  };
  comments: {
    creativity: string;
    structure: string;
    style: string;
    emotion: string;
    persuasion: string;
  };
  overall_comment?: string;
}

export function useEvaluateContent() {
  return useMutation<EvaluateResponse, unknown, EvaluateRequestBody>({
    mutationFn: async (body: EvaluateRequestBody) => {
      const res = await fetch(`${MODEL_API_BASE}/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        let message = res.statusText;
        try {
          const t = await res.text();
          message = t || message;
        } catch {}
        throw new Error(message);
      }
      return (await res.json()) as EvaluateResponse;
    },
  });
}
