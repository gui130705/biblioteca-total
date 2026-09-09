import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Heart, Library, Star } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { BookCover } from "@/components/BookCover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useBook, useFavorites, useToggleFavorite } from "@/lib/library";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/livro/$slug")({
  head: () => ({
    meta: [
      { title: "Detalhes do livro — Biblioteca Proibida" },
      {
        name: "description",
        content: "Sinopse, categoria, avaliação e acesso gratuito ao título na Biblioteca Proibida.",
      },
      { property: "og:title", content: "Detalhes do livro — Biblioteca Proibida" },
      {
        property: "og:description",
        content: "Veja a sinopse completa e adicione o título gratuitamente à sua biblioteca.",
      },
      { property: "og:type", content: "book" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookDetail,
});

function BookDetail() {
  const { slug } = Route.useParams();
  const { data: book, isLoading } = useBook(slug);
  const { data: favorites = [] } = useFavorites();
  const toggleFavorite = useToggleFavorite();
  const cart = useCart();
  const { user } = useAuth();

  if (isLoading) {
    return (
      <PageShell>
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="h-96 animate-pulse rounded-xl border border-border bg-card/60" />
        </div>
      </PageShell>
    );
  }

  if (!book) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Livro não encontrado</h1>
          <p className="mt-3 text-muted-foreground">
            Este título não está no acervo ou não está publicado.
          </p>
          <Button className="mt-6" asChild>
            <Link to="/catalogo">Voltar ao catálogo</Link>
          </Button>
        </div>
      </PageShell>
    );
  }

  const isFavorite = favorites.includes(book.id);
  const isInLibrary = cart.has(book.id);

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/catalogo">
            <ArrowLeft className="size-4" />
            Voltar ao catálogo
          </Link>
        </Button>

        <div className="grid gap-10 md:grid-cols-[320px_1fr]">
          <BookCover
            title={book.title.replace(/^Livro d[eoa] /i, "")}
            subtitle={book.subtitle}
            theme={book.cover_theme}
            className="h-[420px] w-full"
          />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{book.category}</Badge>
              <span className="inline-flex items-center gap-1 text-sm text-gold">
                <Star className="size-4 fill-current" />
                {book.rating.toFixed(1)}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">{book.title}</h1>
            {book.subtitle ? (
              <p className="mt-2 text-sm tracking-[0.2em] text-muted-foreground uppercase">
                {book.subtitle}
              </p>
            ) : null}
            {book.author ? (
              <p className="mt-3 text-sm text-muted-foreground">{book.author}</p>
            ) : null}

            <p className="mt-6 leading-relaxed text-muted-foreground">
              {book.long_description ?? book.short_description}
            </p>

            <Separator className="my-6" />

            <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              {[
                ["Páginas", book.pages ? String(book.pages) : "—"],
                ["Idioma", book.language],
                ["Período", book.year ?? "—"],
                ["Formato", "Digital"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="mt-1 font-medium">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs tracking-widest text-muted-foreground uppercase">
                    Acesso livre
                  </p>
                  <p className="font-display text-3xl font-bold text-gold">Grátis</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (!user) {
                        toast.error("Entre na sua conta para salvar favoritos.");
                        return;
                      }
                      toggleFavorite.mutate({ bookId: book.id, isFavorite });
                    }}
                  >
                    <Heart className={cn("size-4", isFavorite && "fill-primary text-primary")} />
                    {isFavorite ? "Nos favoritos" : "Favoritar"}
                  </Button>
                  {isInLibrary ? (
                      <Button asChild>
                        <Link to="/carrinho">
                      <BookOpen className="size-4" />
                        Ler agora
                        </Link>
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          cart.add(book.id);
                          toast.success("Adicionado à sua biblioteca.");
                        }}
                        disabled={cart.has(book.id)}
                      >
                        <Library className="size-4" />
                        {cart.has(book.id) ? "Na biblioteca" : "Adicionar à biblioteca"}
                      </Button>
                      <Button asChild>
                        <Link to="/carrinho">Ver minha biblioteca</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
