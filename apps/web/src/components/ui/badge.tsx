import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-flux-purple/30 bg-flux-purple/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-purple-100",
        className,
      )}
      {...props}
    />
  );
}
