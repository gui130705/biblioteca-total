import { Link } from "@tanstack/react-router";
import { BookOpen, Heart, ShoppingCart, Star } from "lucide-react";
import { BookCover } from "@/components/BookCover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, type Book } from "@/lib/books";
import { cn } from "@/lib/utils";

export function BookCard({
  book,
  isFavorite,
  owned,
  inCart,
  onToggleFavorite,
  onAddToCart,
}: {
  book: Book;
  isFavorite: boolean;
  owned: boolean;
  inCart: boolean;
  onToggleFavorite: (book: Book) => void;
  onAddToCart: (book: Book) => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/60">
      <Link to="/livro/$slug" params={{ slug: book.slug }} className="block p-3">
        <BookCover
          title={book.title.replace(/^Livro d[eoa] /i, "")}
          subtitle={book.subtitle}
          theme={book.cover_theme}
          className="h-52 w-full transition-transform group-hover:scale-[1.02]"
        />
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-4">
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
          <h3 className="font-display text-base font-bold hover:text-primary">{book.title}</h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{book.short_description}</p>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-bold text-gold">
              {formatPrice(book.price_cents, book.currency)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Favoritar"
              onClick={() => onToggleFavorite(book)}
            >
              <Heart className={cn("size-4", isFavorite && "fill-primary text-primary")} />
            </Button>
          </div>
          {owned ? (
            <Button className="mt-3 w-full" variant="secondary" asChild>
              <Link to="/livro/$slug" params={{ slug: book.slug }}>
                <BookOpen className="size-4" />
                Ler agora
              </Link>
            </Button>
          ) : (
            <Button
              className="mt-3 w-full"
              onClick={() => onAddToCart(book)}
              disabled={inCart}
            >
              <ShoppingCart className="size-4" />
              {inCart ? "No carrinho" : "Comprar"}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
