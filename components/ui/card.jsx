import { cn } from "@/lib/utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--border)] bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md md:p-6",
        className
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn("font-semibold text-[var(--text-main)]", className)} {...props} />;
}

export function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm text-[var(--text-muted)]", className)} {...props} />;
}
