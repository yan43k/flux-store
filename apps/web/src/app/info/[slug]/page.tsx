import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Headphones, ShieldCheck, Truck } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/card";

const pages = {
  smartphones: {
    eyebrow: "Категория",
    title: "Смартфоны",
    description: "Флагманские и практичные модели с яркими экранами, хорошей камерой и быстрой доставкой.",
    points: ["OLED и AMOLED-экраны", "Большой объём памяти", "Аксессуары и защита экрана"],
  },
  laptops: {
    eyebrow: "Категория",
    title: "Ноутбуки",
    description: "Устройства для учёбы, работы, игр и творчества: от тонких ультрабуков до мощных игровых моделей.",
    points: ["Производительные процессоры", "Игровые видеокарты", "Гарантия и помощь с выбором"],
  },
  monitors: {
    eyebrow: "Категория",
    title: "Мониторы",
    description: "Мониторы для игр, офиса и контента: высокая частота, точная цветопередача и удобная диагональ.",
    points: ["144-240 Гц", "Широкоформатные модели", "Подбор под рабочее место"],
  },
  gaming: {
    eyebrow: "Игры",
    title: "Техника для игр",
    description: "Игровые ПК, ноутбуки, мониторы, гарнитуры и комплектующие для стабильного FPS.",
    points: ["Готовые сборки", "RGB-периферия", "Мощные видеокарты"],
  },
  delivery: {
    eyebrow: "Покупателям",
    title: "Доставка",
    description: "Доставляем заказы курьером, в пункты выдачи и транспортными службами по России.",
    points: ["Курьерская доставка по городу", "Самовывоз из пункта выдачи", "Отслеживание статуса заказа"],
  },
  warranty: {
    eyebrow: "Покупателям",
    title: "Гарантия",
    description: "На товары действует гарантия производителя и поддержка магазина по вопросам качества.",
    points: ["Проверка комплектации при получении", "Помощь с гарантийным обращением", "Сохранение электронного чека"],
  },
  returns: {
    eyebrow: "Покупателям",
    title: "Возврат",
    description: "Если товар не подошёл, мы поможем оформить возврат или обмен по правилам магазина.",
    points: ["Быстрая заявка в поддержку", "Проверка состояния товара", "Возврат средств после подтверждения"],
  },
  support: {
    eyebrow: "Покупателям",
    title: "Поддержка",
    description: "Команда Flux помогает с выбором, заказом, доставкой и гарантийными вопросами.",
    points: ["Ответы по заказам", "Консультация перед покупкой", "Помощь после получения товара"],
  },
  about: {
    eyebrow: "О Flux",
    title: "О нас",
    description: "Flux — магазин электроники с фокусом на понятный выбор, аккуратный интерфейс и честные характеристики.",
    points: ["Подборки популярных товаров", "Прозрачные цены", "Современный сервис"],
  },
  reviews: {
    eyebrow: "О Flux",
    title: "Отзывы",
    description: "Покупатели ценят быстрый подбор, понятные карточки товаров и аккуратное оформление заказов.",
    points: ["Удобный каталог", "Быстрая корзина", "Поддержка на каждом этапе"],
  },
  faq: {
    eyebrow: "О Flux",
    title: "Вопросы и ответы",
    description: "Собрали короткие ответы на частые вопросы о заказах, оплате, доставке и гарантии.",
    points: ["Как оформить заказ?", "Когда приедет доставка?", "Что делать при гарантийном случае?"],
  },
  contacts: {
    eyebrow: "О Flux",
    title: "Контакты",
    description: "Свяжитесь с нами любым удобным способом. Мы поможем выбрать товар и уточнить детали заказа.",
    points: ["support@flux.store", "+7 900 000-00-00", "Ежедневно с 10:00 до 21:00"],
  },
} as const;

type InfoPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default async function InfoPage({ params }: InfoPageProps) {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];

  if (!page) {
    notFound();
  }

  return (
    <PageShell>
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden">
            <p className="font-accent text-sm uppercase tracking-[0.32em] text-flux-purple">
              {page.eyebrow}
            </p>
            <h1 className="font-display mt-4 text-5xl font-semibold text-white">{page.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-flux-muted">{page.description}</p>
            <Link
              href="/catalog"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-flux-purple via-flux-pink to-flux-violet px-5 py-3 text-sm font-medium text-white shadow-flux-glow transition hover:scale-[1.02]"
            >
              Перейти в каталог
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute right-[-20%] top-[-20%] h-56 w-56 rounded-full bg-flux-purple/25 blur-3xl" />
            <div className="relative grid gap-4">
              {[Truck, ShieldCheck, Headphones].map((Icon, index) => (
                <div key={index} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <Icon className="h-7 w-7 text-flux-purple" />
                  <p className="mt-3 text-sm text-flux-muted">{page.points[index]}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {page.points.map((point) => (
            <Card key={point} className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-flux-purple" />
              <p className="text-sm leading-6 text-flux-muted">{point}</p>
            </Card>
          ))}
        </section>
      </main>
    </PageShell>
  );
}
