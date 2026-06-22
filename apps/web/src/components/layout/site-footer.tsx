import Image from "next/image";
import Link from "next/link";

const footerGroups = [
  {
    title: "Магазин",
    links: [
      { label: "Смартфоны", href: "/info/smartphones" },
      { label: "Ноутбуки", href: "/info/laptops" },
      { label: "Мониторы", href: "/info/monitors" },
      { label: "Игры", href: "/info/gaming" },
    ],
  },
  {
    title: "Покупателям",
    links: [
      { label: "Доставка", href: "/info/delivery" },
      { label: "Гарантия", href: "/info/warranty" },
      { label: "Возврат", href: "/info/returns" },
      { label: "Поддержка", href: "/info/support" },
    ],
  },
  {
    title: "О Flux",
    links: [
      { label: "О нас", href: "/info/about" },
      { label: "Отзывы", href: "/info/reviews" },
      { label: "Вопросы и ответы", href: "/info/faq" },
      { label: "Контакты", href: "/info/contacts" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div>
          <Image src="/flux-logo.svg" alt="Логотип Flux" width={180} height={48} />
          <p className="mt-5 max-w-sm text-sm leading-6 text-flux-muted">
            Российский витринный магазин электроники: понятные цены, удобная корзина и аккуратное
            оформление для ежедневных покупок.
          </p>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-white">
              {group.title}
            </h3>
            <div className="mt-4 grid gap-3">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-flux-muted transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-flux-muted">
        © 2026 Интернет-магазин Flux. Все права защищены.
      </div>
    </footer>
  );
}
