import axios from "axios";
import type {
  AdminProductCreateInput,
  AdminProductUpdateInput,
  ProductDto,
} from "@flux/shared";
import { api, authHeaders, type ApiEnvelope } from "@/lib/api";

function readApiError(error: unknown, fallback: string) {
  if (axios.isAxiosError<ApiEnvelope<unknown>>(error)) {
    return error.response?.data?.error?.message ?? fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

export async function fetchProducts(pageSize = 100) {
  const response = await api.get<ApiEnvelope<ProductDto[]>>("/products", {
    params: { page: 1, pageSize },
  });

  return response.data.data ?? [];
}

export async function fetchProductBySlug(slug: string) {
  const response = await api.get<ApiEnvelope<ProductDto>>(`/products/${slug}`);
  return response.data.data ?? null;
}

export async function fetchAdminProducts(token: string) {
  const response = await api.get<ApiEnvelope<ProductDto[]>>("/admin/products", {
    headers: authHeaders(token),
  });

  return response.data.data ?? [];
}

export async function createAdminProduct(token: string, input: AdminProductCreateInput) {
  try {
    const response = await api.post<ApiEnvelope<ProductDto>>("/admin/products", input, {
      headers: authHeaders(token),
    });

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message ?? "Не удалось создать товар.");
    }

    return response.data.data;
  } catch (error) {
    throw new Error(readApiError(error, "Не удалось создать товар."));
  }
}

export async function updateAdminProduct(
  token: string,
  id: string,
  input: AdminProductUpdateInput,
) {
  try {
    const response = await api.put<ApiEnvelope<ProductDto>>(`/admin/products/${id}`, input, {
      headers: authHeaders(token),
    });

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message ?? "Не удалось обновить товар.");
    }

    return response.data.data;
  } catch (error) {
    throw new Error(readApiError(error, "Не удалось обновить товар."));
  }
}

export async function deleteAdminProduct(token: string, id: string) {
  await api.delete<ApiEnvelope<{ id: string }>>(`/admin/products/${id}`, {
    headers: authHeaders(token),
  });
}
