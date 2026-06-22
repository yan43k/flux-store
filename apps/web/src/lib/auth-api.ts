import axios from "axios";
import { api, type ApiEnvelope, type AuthSessionDto } from "@/lib/api";
import { formatValidationDetails } from "@/lib/validation-errors";

export async function refreshAuthSession(refreshToken: string) {
  const response = await api.post<ApiEnvelope<AuthSessionDto>>("/auth/refresh", { refreshToken });
  const payload = response.data;

  if (!payload.success || !payload.data) {
    throw new Error(payload.error?.message ?? "Не удалось обновить сессию.");
  }

  return payload.data;
}

export function readApiError(error: unknown, fallback: string) {
  if (axios.isAxiosError<ApiEnvelope<unknown>>(error)) {
    const validation = formatValidationDetails(error.response?.data?.error?.details);

    if (validation) {
      return validation;
    }

    return error.response?.data?.error?.message ?? fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
