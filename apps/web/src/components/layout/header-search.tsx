"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function HeaderSearch() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const q = value.trim();
    if (q.length === 0) {
      router.push("/catalog");
      return;
    }
    router.push(`/catalog?q=${encodeURIComponent(q)}`);
  };

  return (
    <form
      onSubmit={submit}
      className="flex min-w-0 flex-1 max-w-xl items-center rounded-full border border-white/10 bg-white/5 px-4 py-2"
      role="search"
    >
      <Search className="mr-2 h-4 w-4 shrink-0 text-flux-muted" aria-hidden />
      <input
        type="search"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Поиск: телефон, ноутбук, Samsung…"
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-flux-muted outline-none"
        aria-label="Поиск по каталогу"
      />
      <button
        type="submit"
        className="ml-2 shrink-0 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
      >
        Найти
      </button>
    </form>
  );
}
