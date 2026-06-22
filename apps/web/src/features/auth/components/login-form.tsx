"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@flux/shared";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { ApiEnvelope, AuthSessionDto } from "@/lib/api";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";

type LoginValues = {
  email: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useAuthStore((state) => state.setSession);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const response = await api.post<ApiEnvelope<AuthSessionDto>>("/auth/login", values);
      const payload = response.data;

      if (!payload.success || !payload.data) {
        toast.error(payload.error?.message ?? "Не удалось войти.");
        return;
      }

      setSession(payload.data);
      toast.success(`Здравствуйте, ${payload.data.user.name}!`);
      const next = searchParams.get("next");
      router.push(next && next.startsWith("/") ? next : "/account");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = (error.response?.data as ApiEnvelope<unknown> | undefined)?.error?.message;
        toast.error(message ?? "Проверьте, что сервер и база данных запущены.");
        return;
      }

      toast.error("Произошла ошибка. Попробуйте ещё раз.");
    }
  });

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit} noValidate>
      <label className="grid gap-2 text-sm text-flux-muted">
        Электронная почта
        <input
          type="email"
          autoComplete="email"
          className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-flux-purple"
          {...form.register("email")}
        />
        {form.formState.errors.email ? (
          <span className="text-xs text-red-300">{form.formState.errors.email.message}</span>
        ) : null}
      </label>
      <label className="grid gap-2 text-sm text-flux-muted">
        Пароль
        <input
          type="password"
          autoComplete="current-password"
          className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-flux-purple"
          {...form.register("password")}
        />
        {form.formState.errors.password ? (
          <span className="text-xs text-red-300">{form.formState.errors.password.message}</span>
        ) : null}
      </label>
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Входим…" : "Войти"}
      </Button>
      <p className="text-center text-sm text-flux-muted">
        Нет аккаунта?{" "}
        <Link href="/register" className="text-flux-purple hover:underline">
          Зарегистрироваться
        </Link>
      </p>
    </form>
  );
}
