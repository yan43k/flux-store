"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const modes = [
  { value: "light", label: "Светлая тема", icon: Sun },
  { value: "dark", label: "Тёмная тема", icon: Moon },
  { value: "system", label: "Автоматически", icon: Laptop },
] as const;

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
        {modes.map((mode) => {
          const Icon = mode.icon;

          return (
            <Button
              key={mode.value}
              type="button"
              variant="ghost"
              className="h-9 w-9 px-0"
              aria-label={`Тема: ${mode.label}`}
            >
              <Icon className="h-4 w-4" />
            </Button>
          );
        })}
      </div>
    );
  }

  return <MountedThemeSwitcher />;
}

function MountedThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
      {modes.map((mode) => {
        const Icon = mode.icon;

        return (
          <Button
            key={mode.value}
            type="button"
            variant={theme === mode.value ? "primary" : "ghost"}
            className="h-9 w-9 px-0"
            aria-label={`Тема: ${mode.label}`}
            onClick={() => setTheme(mode.value)}
          >
            <Icon className="h-4 w-4" />
          </Button>
        );
      })}
    </div>
  );
}
