import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-flux-purple via-flux-pink to-flux-violet text-white shadow-flux-glow hover:scale-[1.02]",
  secondary:
    "border border-white/15 bg-white/10 text-white hover:border-flux-purple/60 hover:bg-white/15",
  ghost: "text-flux-muted hover:bg-white/10 hover:text-white",
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-full px-5 font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flux-purple disabled:pointer-events-none disabled:opacity-50",
        buttonVariantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
