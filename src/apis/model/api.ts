import { useMutation } from '@tanstack/react-query';

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
