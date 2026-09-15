import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { BookCover } from "@/components/BookCover";
import { Button } from "@/components/ui/button";
import type { Book } from "@/lib/books";
import type { ReadingProgress } from "@/lib/reading";

export function ShelfRow({
  title,
  books,
  progressFor,
  empty,
  action,
}: {
  title: string;
  books: Book[];
  progressFor: (bookId: string) => ReadingProgress | null;
  empty: string;
  action?: (book: Book) => ReactNode;
}) {
  return (
    <section className="mt-10">
      <div className="flex items-baseline gap-3 border-b border-border pb-2">
        <h2 className="font-display text-xl font-bold">{title}</h2>
        <span className="text-xs text-muted-foreground">{books.length}</span>
      </div>

      {books.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {books.map((book) => {
            const percent = progressFor(book.id)?.percent ?? 0;
            return (
              <li
                key={book.id}
                className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-4 rounded-lg border border-border bg-card p-3 sm:grid-cols-[80px_minmax(0,1fr)_auto_auto] sm:p-4"
              >
                <BookCover
                  title={book.title.replace(/^Livro d[eoa] /i, "")}
                  theme={book.cover_theme}
                  slug={book.slug}
                  className="h-24 w-full shrink-0 sm:h-28"
                />
                <div className="min-w-0">
                  <Link
                    to="/livro/$slug"
                    params={{ slug: book.slug }}
                    className="font-medium hover:text-primary"
                  >
                    {book.title}
                  </Link>
                  <p className="truncate text-xs text-muted-foreground">{book.category}</p>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-primary" style={{ width: `${percent}%` }} />
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">{percent}% lido</p>
                </div>
                <Button size="sm" asChild className="hidden sm:inline-flex">
                  <Link to="/ler/$slug" params={{ slug: book.slug }}>
                    <BookOpen className="size-4" />
                    Ler
                  </Link>
                </Button>
                {action ? action(book) : <span />}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
