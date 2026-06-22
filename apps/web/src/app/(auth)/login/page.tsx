import { Suspense } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/card";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-md px-4 py-14">
        <Card>
          <h1 className="font-display text-4xl font-semibold text-white">Вход</h1>
          <p className="mt-3 text-sm leading-6 text-flux-muted">
            Войдите под своей почтой и паролем. Для быстрого доступа доступны тестовые аккаунты с
            единым паролем.
          </p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-flux-muted">
            <p className="font-medium text-white">Пароль для всех тестовых записей:</p>
            <p className="mt-1 font-mono text-flux-purple">FluxStore2026!</p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li>
                Администратор:{" "}
                <span className="text-white">admin@flux.store</span> — откроет админ-панель
              </li>
              <li>
                Обычный покупатель: <span className="text-white">pokupatel@flux.store</span>
              </li>
              <li>
                Тестовый пользователь: <span className="text-white">test@flux.store</span>
              </li>
            </ul>
            <p className="mt-3 text-xs">
              Гостям ссылки «Админ-панель» в меню не показываются. Сначала войдите как администратор.
            </p>
          </div>
          <Suspense
            fallback={<p className="mt-6 text-center text-flux-muted">Загружаем форму…</p>}
          >
            <LoginForm />
          </Suspense>
          <Link href="/" className="mt-6 block text-center text-sm text-flux-purple hover:underline">
            На главную
          </Link>
        </Card>
      </main>
    </PageShell>
  );
}
