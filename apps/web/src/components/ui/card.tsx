import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flux-glass rounded-[var(--radius-flux-card)] p-6 transition duration-300 hover:-translate-y-1 hover:border-flux-purple/40",
        className,
      )}
      {...props}
    />
  );
}
