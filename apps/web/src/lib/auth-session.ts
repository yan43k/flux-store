import axios from "axios";
import { refreshAuthSession } from "@/lib/auth-api";
import { useAuthStore } from "@/stores/auth-store";

function isAccessTokenExpired(accessToken: string, skewSeconds = 30) {
  try {
    const payload = JSON.parse(atob(accessToken.split(".")[1] ?? "")) as { exp?: number };

    if (!payload.exp) {
      return false;
    }

    return payload.exp * 1000 <= Date.now() + skewSeconds * 1000;
  } catch {
    return true;
  }
}

async function ensureFreshAccessToken() {
  const store = useAuthStore.getState();
  const accessToken = store.accessToken;

  if (!accessToken) {
    throw new Error("Нужно войти в аккаунт.");
  }

  if (!isAccessTokenExpired(accessToken)) {
    return accessToken;
  }

  if (!store.refreshToken) {
    store.logout();
    throw new Error("Сессия истекла. Войдите снова.");
  }

  const session = await refreshAuthSession(store.refreshToken);
  store.setSession(session);
  return session.accessToken;
}

export async function withAuthRequest<T>(request: (accessToken: string) => Promise<T>): Promise<T> {
  let token = await ensureFreshAccessToken();

  try {
    return await request(token);
  } catch (error) {
    const store = useAuthStore.getState();
    const canRefresh =
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      Boolean(store.refreshToken);

    if (!canRefresh) {
      throw error;
    }

    try {
      const session = await refreshAuthSession(store.refreshToken!);
      store.setSession(session);
      token = session.accessToken;
      return await request(token);
    } catch {
      store.logout();
      throw new Error("Сессия истекла. Войдите снова.");
    }
  }
}
