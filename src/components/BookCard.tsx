import { Link } from "@tanstack/react-router";
import { BookOpen, Heart, Library, Star } from "lucide-react";
import { BookCover } from "@/components/BookCover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Book } from "@/lib/books";
import { cn } from "@/lib/utils";

export function BookCard({
  book,
  isFavorite,
  inLibrary,
  onToggleFavorite,
  onAddToLibrary,
}: {
  book: Book;
  isFavorite: boolean;
  inLibrary: boolean;
  onToggleFavorite: (book: Book) => void;
  onAddToLibrary: (book: Book) => void;
}) {
  return (
    <article className="group grid grid-cols-[104px_minmax(0,1fr)] gap-4 overflow-hidden rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/60 sm:grid-cols-[148px_minmax(0,1fr)] sm:gap-6 sm:p-4">
      <Link to="/livro/$slug" params={{ slug: book.slug }} className="block self-stretch">
        <BookCover
          title={book.title.replace(/^Livro d[eoa] /i, "")}
          subtitle={book.subtitle}
          theme={book.cover_theme}
          className="h-full min-h-40 w-full transition-transform group-hover:scale-[1.02] sm:min-h-52"
        />
      </Link>

      <div className="flex min-w-0 flex-col py-1 sm:py-2">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="text-[10px]">
            {book.category}
          </Badge>
          <span className="inline-flex items-center gap-1 text-xs text-gold">
            <Star className="size-3 fill-current" />
            {book.rating.toFixed(1)}
          </span>
        </div>

        <Link to="/livro/$slug" params={{ slug: book.slug }} className="mt-2">
          <h3 className="font-display text-base font-bold hover:text-primary sm:text-xl">{book.title}</h3>
        </Link>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">{book.short_description}</p>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between gap-2">
            <span className="font-display text-lg font-bold text-gold">Grátis</span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Favoritar"
              onClick={() => onToggleFavorite(book)}
            >
              <Heart className={cn("size-4", isFavorite && "fill-primary text-primary")} />
            </Button>
          </div>
          {inLibrary ? (
            <Button className="mt-3 w-full" variant="secondary" asChild>
              <Link to="/livro/$slug" params={{ slug: book.slug }}>
                <BookOpen className="size-4" />
                Ler agora
              </Link>
            </Button>
          ) : (
            <Button
              className="mt-3 w-full"
              onClick={() => onAddToLibrary(book)}
            >
              <Library className="size-4" />
              Adicionar à biblioteca
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
