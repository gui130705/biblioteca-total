import { coverTheme } from "@/lib/books";
import { bookCoverFor } from "@/lib/book-covers";
import { cn } from "@/lib/utils";

export function BookCover({
  title,
  subtitle,
  theme,
  slug,
  className,
}: {
  title: string;
  subtitle?: string | null;
  theme: string;
  slug?: string;
  className?: string;
}) {
  const t = coverTheme(theme);
  const artwork = bookCoverFor(slug);

  if (artwork) {
    return (
      <div
        className={cn(
          "relative isolate overflow-hidden rounded-lg border border-border/60 bg-card",
          className,
        )}
      >
        <img
          src={artwork.src}
          alt={artwork.alt}
          width={1024}
          height={1536}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/75 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 z-10 p-3 text-left sm:p-4">
          <span className="font-display text-sm leading-tight font-bold text-foreground sm:text-base">
            {title}
          </span>
          {subtitle ? (
            <span className="mt-1 block line-clamp-1 text-[9px] text-muted-foreground uppercase">
              {subtitle}
            </span>
          ) : null}
        </div>
      </div>
    );
  }

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
