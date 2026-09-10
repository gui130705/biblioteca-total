import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Search, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { BookCard } from "@/components/BookCard";
import { ShelfRow } from "@/components/ShelfRow";
import { Button } from "@/components/ui/button";
import { useBooks, useFavorites, useToggleFavorite } from "@/lib/library";
import { useReadingProgress } from "@/lib/reading";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Biblioteca Proibida — Livros apócrifos em acervo digital" },
      {
        name: "description",
        content:
          "Explore gratuitamente um acervo digital de livros apócrifos com busca, categorias, favoritos e biblioteca pessoal.",
      },
      { property: "og:title", content: "Biblioteca Proibida — Acervo digital" },
      {
        property: "og:description",
        content: "Livros apócrifos e textos esquecidos com acesso gratuito.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: books = [], isLoading } = useBooks();
  const { data: favorites = [] } = useFavorites();
  const toggleFavorite = useToggleFavorite();
  const cart = useCart();
  const { user } = useAuth();

  const { data: progress = [] } = useReadingProgress();

  const featured = books.filter((b) => b.is_featured).slice(0, 4);
  const showcase = featured.length > 0 ? featured : books.slice(0, 4);
  const reading = books.filter((b) => {
    const p = progress.find((item) => item.book_id === b.id);
    return p?.status === "reading" && p.percent < 98;
  });

  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-1 text-xs tracking-[0.2em] text-primary uppercase">
            <Sparkles className="size-3" />
            Acervo restrito
          </span>
          <h1 className="mt-6 font-display text-4xl leading-tight font-bold sm:text-6xl">
            Os livros que <span className="text-gradient-gold">não entraram</span> no cânone
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Textos apócrifos, escritos esquecidos e traduções raras reunidos em um acervo digital
            organizado. Escolha seus títulos e leia gratuitamente.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link to="/catalogo">
                <Search className="size-4" />
                Explorar catálogo
              </Link>
            </Button>
            {!user ? (
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth">Criar conta grátis</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      {reading.length > 0 && reading[0] ? (
        <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Continuar lendo</h2>
            <Button variant="ghost" asChild>
              <Link to="/carrinho">Minha estante</Link>
            </Button>
          </div>
          <NowReadingCard
            book={reading[0]}
            percent={progress.find((p) => p.book_id === reading[0]!.id)?.percent ?? 0}
          />
          {reading.length > 1 ? (
            <ShelfRow
              title="Também em andamento"
              books={reading.slice(1)}
              progressFor={(id) => progress.find((p) => p.book_id === id) ?? null}
              empty=""
            />
          ) : null}
        </section>
      ) : null}



      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-3">
        {[
          { icon: BookOpen, title: "Leitura organizada", text: "Categorias, busca e detalhes completos de cada obra." },
          { icon: ShieldCheck, title: "Acesso gratuito", text: "Leia os títulos disponíveis sem cobrança ou assinatura." },
          { icon: Sparkles, title: "Acervo curado", text: "Textos raros com sinopses, avaliações e contexto histórico." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-xl border border-border bg-card p-6">
            <Icon className="size-5 text-gold" />
            <h2 className="mt-4 font-display text-lg font-bold">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Destaques do acervo</h2>
          <Button variant="ghost" asChild>
            <Link to="/catalogo">Ver tudo</Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="mt-8 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-xl border border-border bg-card/60" />
            ))}
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {showcase.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite={favorites.includes(book.id)}
                inLibrary={cart.has(book.id)}
                onToggleFavorite={(b) => {
                  if (!user) {
                    toast.error("Entre na sua conta para favoritar.");
                    return;
                  }
                  toggleFavorite.mutate({ bookId: b.id, isFavorite: favorites.includes(b.id) });
                }}
                onAddToLibrary={(b) => {
                  cart.add(b.id);
                  toast.success(`${b.title} adicionado à sua biblioteca.`);
                }}
              />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
