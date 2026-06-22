import type { Metadata } from "next";
import { Inter, Manrope, Sora, Space_Grotesk } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flux-store.local"),
  title: {
    default: "Flux — магазин электроники",
    template: "%s — Flux",
  },
  description:
    "Смартфоны, ноутбуки, компьютеры и аксессуары. Удобный каталог, корзина и личный кабинет.",
  applicationName: "Flux",
  manifest: "/manifest.webmanifest",
  keywords: [
    "магазин электроники",
    "смартфоны",
    "ноутбуки",
    "компьютеры",
    "наушники",
    "мониторы",
  ],
  openGraph: {
    title: "Flux — магазин электроники",
    description:
      "Смартфоны, ноутбуки, компьютеры и аксессуары. Удобный каталог, корзина и личный кабинет.",
    type: "website",
    locale: "ru_RU",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === "development" ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (() => {
                  const shouldSuppress = (args) => {
                    const text = args.map((arg) => String(arg)).join(" ");
                    return text.includes("A tree hydrated") && text.includes("data-cursor-ref");
                  };

                  for (const method of ["debug", "error", "warn"]) {
                    const original = console[method];
                    console[method] = (...args) => {
                      if (shouldSuppress(args)) return;
                      original(...args);
                    };
                  }
                })();
              `,
            }}
          />
        ) : null}
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} ${sora.variable} ${spaceGrotesk.variable}`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
