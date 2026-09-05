import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Library, Trash2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BookCover } from "@/components/BookCover";
import { Button } from "@/components/ui/button";
import { useBooks } from "@/lib/library";
import { useCart } from "@/hooks/useCart";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Minha Biblioteca — Biblioteca Proibida" },
      {
        name: "description",
        content: "Acesse e organize os títulos gratuitos adicionados à sua biblioteca digital.",
      },
      { property: "og:title", content: "Minha Biblioteca — Biblioteca Proibida" },
      { property: "og:description", content: "Seus livros digitais gratuitos reunidos em um só lugar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Carrinho,
});

function Carrinho() {
  const cart = useCart();
  const { data: books = [] } = useBooks();
  const items = books.filter((b) => cart.items.includes(b.id));

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex items-center gap-3">
          <Library className="size-7 text-primary" />
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Minha biblioteca</h1>
        </div>
        <p className="mt-2 text-muted-foreground">Seus títulos gratuitos, prontos para leitura.</p>

        {items.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">Sua biblioteca ainda está vazia.</p>
            <Button className="mt-4" asChild>
              <Link to="/catalogo">Explorar catálogo</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8">
            <ul className="space-y-4">
              {items.map((book) => (
                <li
                  key={book.id}
                   className="grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-4 rounded-lg border border-border bg-card p-3 sm:grid-cols-[88px_minmax(0,1fr)_auto_auto] sm:p-4"
                >
                  <BookCover
                    title={book.title.replace(/^Livro d[eoa] /i, "")}
                    theme={book.cover_theme}
                     className="h-28 w-full shrink-0 sm:h-32"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/livro/$slug"
                      params={{ slug: book.slug }}
                      className="font-medium hover:text-primary"
                    >
                      {book.title}
                    </Link>
                    <p className="truncate text-sm text-muted-foreground">{book.category}</p>
                  </div>
                   <span className="hidden font-semibold text-gold sm:block">Grátis</span>
                   <Button size="sm" asChild className="hidden sm:inline-flex">
                     <Link to="/livro/$slug" params={{ slug: book.slug }}>
                       <BookOpen className="size-4" />
                       Ler agora
                     </Link>
                   </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Remover ${book.title}`}
                    onClick={() => cart.remove(book.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </PageShell>
  );
}
