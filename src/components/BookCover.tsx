import { coverTheme } from "@/lib/books";
import { cn } from "@/lib/utils";

export function BookCover({
  title,
  subtitle,
  theme,
  className,
}: {
  title: string;
  subtitle?: string | null;
  theme: string;
  className?: string;
}) {
  const t = coverTheme(theme);
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-lg p-4 text-center",
        className,
      )}
      style={{ backgroundImage: `linear-gradient(150deg, ${t.from}, ${t.to})` }}
    >
      <div
        className="absolute inset-2 rounded-md border"
        style={{ borderColor: `${t.accent}55` }}
        aria-hidden
      />
      <span
        className="font-display text-xs tracking-[0.3em] uppercase"
        style={{ color: t.accent }}
      >
        Biblioteca
      </span>
      <span className="mt-3 font-display text-lg leading-tight font-bold text-white">{title}</span>
      {subtitle ? (
        <span className="mt-2 text-[10px] tracking-widest text-white/70 uppercase">{subtitle}</span>
      ) : null}
    </div>
  );
}
