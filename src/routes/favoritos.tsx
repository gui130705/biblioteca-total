import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { useBooks, useFavorites, useToggleFavorite } from "@/lib/library";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Meus Favoritos — Biblioteca Proibida" },
      {
        name: "description",
        content: "Os títulos gratuitos que você salvou para ler depois no acervo digital.",
      },
      { property: "og:title", content: "Meus Favoritos — Biblioteca Proibida" },
      { property: "og:description", content: "Sua lista pessoal de títulos salvos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Favoritos,
});

function Favoritos() {
  const { user, loading } = useAuth();
  const { data: books = [] } = useBooks();
  const { data: favorites = [] } = useFavorites();
  const toggleFavorite = useToggleFavorite();
  const cart = useCart();

  const list = books.filter((b) => favorites.includes(b.id));

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Favoritos</h1>

        {!user && !loading ? (
          <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">
              Entre na sua conta para salvar e ver seus títulos favoritos.
            </p>
            <Button className="mt-4" asChild>
              <Link to="/auth">Entrar ou criar conta</Link>
            </Button>
          </div>
        ) : list.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">Você ainda não favoritou nenhum livro.</p>
            <Button className="mt-4" variant="outline" asChild>
              <Link to="/catalogo">Explorar catálogo</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {list.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite
                inLibrary={cart.has(book.id)}
                onToggleFavorite={(b) => toggleFavorite.mutate({ bookId: b.id, isFavorite: true })}
                onAddToLibrary={(b) => {
                  cart.add(b.id);
                  toast.success(`${b.title} adicionado à sua biblioteca.`);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
