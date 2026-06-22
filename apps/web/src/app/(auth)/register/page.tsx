import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/card";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-md px-4 py-14">
        <Card>
          <h1 className="font-display text-4xl font-semibold text-white">Регистрация</h1>
          <p className="mt-3 text-sm leading-6 text-flux-muted">
            Создайте аккаунт, чтобы оформлять заказы и сохранять товары. Поля простые: имя, почта и
            пароль — как в обычном интернет-магазине.
          </p>
          <RegisterForm />
          <Link href="/" className="mt-6 block text-center text-sm text-flux-purple hover:underline">
            На главную
          </Link>
        </Card>
      </main>
    </PageShell>
  );
}
