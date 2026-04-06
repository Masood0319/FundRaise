import { cn } from "@/lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-[var(--primary)]",
        className
      )}
      {...props}
    />
  );
}
