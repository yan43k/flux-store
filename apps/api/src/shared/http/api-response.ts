import type { ApiResponse } from "@flux/shared";

export const ok = <T>(data: T, meta?: ApiResponse<T>["meta"]): ApiResponse<T> => ({
  success: true,
  data,
  meta,
});

export const fail = (code: string, message: string, details?: unknown): ApiResponse<never> => ({
  success: false,
  error: {
    code,
    message,
    details,
  },
});
