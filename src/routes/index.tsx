import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, LibraryBig } from "lucide-react";
import { BookCover } from "@/components/BookCover";
import { PixSupportCard } from "@/components/PixSupportDialog";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { useBooks } from "@/lib/library";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Biblioteca Proibida — Leia livros apócrifos grátis" },
      {
        name: "description",
        content:
          "Leia gratuitamente nove livros apócrifos e textos antigos em uma biblioteca digital aberta e direta.",
      },
      { property: "og:title", content: "Biblioteca Proibida — Leitura gratuita" },
      {
        property: "og:description",
        content: "Abra a biblioteca e comece agora a leitura gratuita de livros apócrifos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: books = [], isLoading } = useBooks();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <section className="border-b border-border/60">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:py-24">
            <div>
              <div className="mb-5 flex items-center gap-3 text-primary">
                <LibraryBig className="size-5" />
                <span className="text-xs font-semibold tracking-[0.18em] uppercase">
                  Acervo digital gratuito
                </span>
              </div>
              <h1 className="max-w-3xl font-display text-4xl leading-tight font-bold sm:text-6xl">
                Biblioteca Proibida
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Livros apócrifos, escritos esquecidos e traduções raras reunidos em um só lugar.
                Escolha uma obra abaixo e comece a ler agora, gratuitamente.
              </p>
            </div>

            <PixSupportCard />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="acervo-title">
          <div className="mb-8 border-b border-border pb-5">
            <h2 id="acervo-title" className="font-display text-3xl font-bold sm:text-4xl">
              Todos os livros
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {books.length > 0 ? `${books.length} obras disponíveis para leitura imediata.` : "Acervo gratuito."}
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-5" aria-label="Carregando livros">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-64 animate-pulse rounded-lg border border-border bg-card/60 sm:h-72"
                />
              ))}
            </div>
          ) : (
            <ul className="space-y-5">
              {books.map((book) => (
                <li key={book.id}>
                  <article className="grid grid-cols-[112px_minmax(0,1fr)] gap-5 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/60 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-8 sm:p-6">
                    <Link
                      to="/ler/$slug"
                      params={{ slug: book.slug }}
                      aria-label={`Ler ${book.title}`}
                      className="block"
                    >
                      <BookCover
                        title={book.title.replace(/^Livro d[eoa] /i, "")}
                        subtitle={book.subtitle}
                        theme={book.cover_theme}
                        slug={book.slug}
                        className="aspect-[2/3] h-auto w-full"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-col py-1 sm:py-3">
                      <p className="text-xs font-semibold text-primary uppercase">{book.category}</p>
                      <h3 className="mt-2 font-display text-xl leading-tight font-bold sm:text-3xl">
                        {book.title}
                      </h3>
                      {book.author ? (
                        <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{book.author}</p>
                      ) : null}
                      <p className="mt-4 hidden max-w-2xl text-sm leading-relaxed text-muted-foreground sm:line-clamp-3 sm:block">
                        {book.short_description}
                      </p>

                      <Button size="lg" className="mt-auto w-full font-bold uppercase sm:w-fit sm:min-w-52" asChild>
                        <Link to="/ler/$slug" params={{ slug: book.slug }}>
                          <BookOpen className="size-5" />
                          Ler agora
                        </Link>
                      </Button>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}