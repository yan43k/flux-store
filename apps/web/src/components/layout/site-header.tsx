"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, LogOut, ShoppingBag, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HeaderSearch } from "@/components/layout/header-search";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { Button, buttonVariantClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { useCommerceStore } from "@/stores/commerce-store";

const publicLinks = [
  { href: "/catalog", label: "Каталог" },
  { href: "/compare", label: "Сравнение" },
  { href: "/wishlist", label: "Избранное" },
];

export function SiteHeader() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const cartCount = useCommerceStore((state) =>
    state.cart.reduce((count, item) => count + item.quantity, 0),
  );
  const wishlistCount = useCommerceStore((state) => state.wishlist.length);
  const [mounted, setMounted] = useState(false);
  const visibleUser = mounted ? user : null;
  const visibleCartCount = mounted ? cartCount : 0;
  const visibleWishlistCount = mounted ? wishlistCount : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    ...publicLinks,
    ...(visibleUser?.role === "ADMIN" ? [{ href: "/admin" as const, label: "Админ-панель" }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-flux-space/75 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl space-y-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/flux-logo.svg"
              alt="Интернет-магазин электроники Flux"
              width={180}
              height={48}
              priority
            />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-flux-muted transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <ThemeSwitcher />
            <Link
              href="/wishlist"
              className={cn(
                "relative hidden h-10 w-10 items-center justify-center rounded-full sm:inline-flex",
                buttonVariantClasses.ghost,
              )}
              aria-label="Избранное"
            >
              <Heart className="h-4 w-4" />
              {visibleWishlistCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-flux-pink px-1 text-[10px] font-semibold text-white">
                  {visibleWishlistCount}
                </span>
              ) : null}
            </Link>
            <Link
              href="/account"
              className={cn(
                "hidden h-10 w-10 items-center justify-center rounded-full sm:inline-flex",
                buttonVariantClasses.ghost,
              )}
              aria-label="Личный кабинет"
            >
              <User className="h-4 w-4" />
            </Link>
            <Link
              href="/cart"
              className={cn(
                "relative inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flux-purple",
                buttonVariantClasses.primary,
              )}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Корзина</span>
              {visibleCartCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-flux-space">
                  {visibleCartCount}
                </span>
              ) : null}
            </Link>
            {visibleUser ? (
              <Button
                type="button"
                variant="secondary"
                className="hidden h-10 gap-2 px-4 text-sm lg:inline-flex"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                <LogOut className="h-4 w-4" />
                Выйти
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className={cn(
                    "inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium transition duration-200",
                    buttonVariantClasses.secondary,
                  )}
                >
                  Вход
                </Link>
                <Link
                  href="/register"
                  className={cn(
                    "inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flux-purple",
                    buttonVariantClasses.primary,
                  )}
                >
                  Регистрация
                </Link>
              </div>
            )}
          </div>
        </div>

        <HeaderSearch />
      </div>
    </header>
  );
}
