import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)] text-white hover:bg-[#143162] focus-visible:ring-[var(--primary)]",
        secondary: "bg-[var(--secondary)] text-white hover:opacity-90 focus-visible:ring-[var(--secondary)]",
        outline: "border border-[var(--border)] bg-white text-[var(--text-main)] hover:bg-[var(--surface)]",
        ghost: "text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text-main)]",
        success: "bg-[var(--accent)] text-white hover:opacity-90",
      },
      size: {
        default: "h-11 min-h-[44px] px-4 py-2",
        sm: "h-9 min-h-[36px] rounded-lg px-3",
        lg: "h-12 min-h-[48px] px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function Button({ className, variant, size, ...props }) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
