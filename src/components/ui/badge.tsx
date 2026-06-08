import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "sector" | "stage" | "status";
  className?: string;
}

export function Badge({ children, variant = "sector", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full",
        {
          "bg-cream-dark text-forest border border-forest/20": variant === "sector",
          "bg-gold/10 text-gold-dark border border-gold/30": variant === "stage",
          "bg-green-50 text-green-700 border border-green-200": variant === "status",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
