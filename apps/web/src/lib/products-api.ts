import type {
  AdminProductCreateInput,
  AdminProductUpdateInput,
  ProductDto,
} from "@flux/shared";
import { readApiError } from "@/lib/auth-api";
import { withAuthRequest } from "@/lib/auth-session";
import { api, authHeaders, type ApiEnvelope } from "@/lib/api";

const CATALOG_PAGE_SIZE = 48;

export async function fetchAllProducts() {
  let page = 1;
  let total = Number.POSITIVE_INFINITY;
  const items: ProductDto[] = [];

  while (items.length < total) {
    const response = await api.get<ApiEnvelope<ProductDto[]>>("/products", {
      params: { page, pageSize: CATALOG_PAGE_SIZE, sort: "newest" },
    });

    const batch = response.data.data ?? [];
    total = response.data.meta?.total ?? batch.length;
    items.push(...batch);

    if (batch.length === 0) {
      break;
    }

    page += 1;
  }

  return items;
}

/** @deprecated Use fetchAllProducts() */
export async function fetchProducts(pageSize = CATALOG_PAGE_SIZE) {
  const response = await api.get<ApiEnvelope<ProductDto[]>>("/products", {
    params: { page: 1, pageSize: Math.min(pageSize, CATALOG_PAGE_SIZE) },
  });

  return response.data.data ?? [];
}

export async function fetchProductBySlug(slug: string) {
  const response = await api.get<ApiEnvelope<ProductDto>>(`/products/${slug}`);
  return response.data.data ?? null;
}

export async function fetchAdminProducts() {
  try {
    return await withAuthRequest(async (token) => {
      const response = await api.get<ApiEnvelope<ProductDto[]>>("/admin/products", {
        headers: authHeaders(token),
      });

      return response.data.data ?? [];
    });
  } catch (error) {
    throw new Error(readApiError(error, "Не удалось загрузить товары."));
  }
}

export async function createAdminProduct(input: AdminProductCreateInput) {
  try {
    return await withAuthRequest(async (token) => {
      const response = await api.post<ApiEnvelope<ProductDto>>("/admin/products", input, {
        headers: authHeaders(token),
      });

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error?.message ?? "Не удалось создать товар.");
      }

      return response.data.data;
    });
  } catch (error) {
    throw new Error(readApiError(error, "Не удалось создать товар."));
  }
}

export async function updateAdminProduct(id: string, input: AdminProductUpdateInput) {
  try {
    return await withAuthRequest(async (token) => {
      const response = await api.put<ApiEnvelope<ProductDto>>(`/admin/products/${id}`, input, {
        headers: authHeaders(token),
      });

      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error?.message ?? "Не удалось обновить товар.");
      }

      return response.data.data;
    });
  } catch (error) {
    throw new Error(readApiError(error, "Не удалось обновить товар."));
  }
}

export async function deleteAdminProduct(id: string) {
  try {
    await withAuthRequest(async (token) => {
      await api.delete<ApiEnvelope<{ id: string }>>(`/admin/products/${id}`, {
        headers: authHeaders(token),
      });
    });
  } catch (error) {
    throw new Error(readApiError(error, "Не удалось удалить товар."));
  }
}
