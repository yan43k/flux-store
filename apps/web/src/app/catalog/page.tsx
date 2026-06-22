import { Suspense } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { CatalogPage } from "@/features/catalog/components/catalog-page";

function CatalogFallback() {
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-4 py-14 text-center text-flux-muted">
        Загружаем каталог…
      </main>
    </PageShell>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <CatalogPage />
    </Suspense>
  );
}
