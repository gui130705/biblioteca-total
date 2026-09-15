import { Link } from "@tanstack/react-router";
import { BookOpen, Clock } from "lucide-react";
import { BookCover } from "@/components/BookCover";
import { Button } from "@/components/ui/button";
import type { Book } from "@/lib/books";

export function NowReadingCard({
  book,
  percent,
  remainingMinutes,
  label = "Lendo agora",
}: {
  book: Book;
  percent: number;
  remainingMinutes?: number;
  label?: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 15%, color-mix(in oklab, var(--primary) 35%, transparent) 0%, transparent 55%)",
        }}
        aria-hidden
      />
      <div className="relative grid gap-6 p-5 sm:grid-cols-[170px_minmax(0,1fr)] sm:p-8">
        <div className="[perspective:1200px]">
          <Link to="/livro/$slug" params={{ slug: book.slug }} className="block">
            <div className="cover-3d">
              <BookCover
                title={book.title.replace(/^Livro d[eoa] /i, "")}
                subtitle={book.subtitle}
                theme={book.cover_theme}
                slug={book.slug}
                className="h-60 w-full shadow-2xl sm:h-72"
              />
            </div>
          </Link>
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <span className="text-[11px] tracking-[0.3em] text-primary uppercase">{label}</span>
          <h2 className="mt-3 font-display text-2xl leading-tight font-bold sm:text-3xl">
            {book.title}
          </h2>
          {book.author ? (
            <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
          ) : null}

          {typeof remainingMinutes === "number" && remainingMinutes > 0 ? (
            <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              cerca de {remainingMinutes} min para terminar
            </p>
          ) : null}

          <div className="mt-5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-gold transition-[width] duration-500"
                style={{ width: `${Math.max(percent, 2)}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{percent}% concluído</span>
              <span>{100 - percent}% restante</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button size="lg" asChild>
              <Link to="/ler/$slug" params={{ slug: book.slug }}>
                <BookOpen className="size-4" />
                Continuar sessão
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link to="/livro/$slug" params={{ slug: book.slug }}>
                Detalhes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
