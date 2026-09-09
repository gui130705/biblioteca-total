import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useBook } from "@/lib/library";

export const Route = createFileRoute("/ler/$slug")({
  head: () => ({
    meta: [
      { title: "Leitor — Biblioteca Proibida" },
      {
        name: "description",
        content: "Leia o texto completo do título diretamente no navegador ou baixe o PDF.",
      },
      { property: "og:title", content: "Leitor — Biblioteca Proibida" },
      {
        property: "og:description",
        content: "Leitura gratuita do acervo de livros apócrifos, direto no navegador.",
      },
      { property: "og:type", content: "book" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reader,
});

function Reader() {
  const { slug } = Route.useParams();
  const { data: book, isLoading } = useBook(slug);

  if (isLoading) {
    return (
      <PageShell>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="h-[70vh] animate-pulse rounded-xl border border-border bg-card/60" />
        </div>
      </PageShell>
    );
  }

  if (!book || !book.pdf_url) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Leitura indisponível</h1>
          <p className="mt-3 text-muted-foreground">
            Este título ainda não tem arquivo de leitura no acervo.
          </p>
          <Button className="mt-6" asChild>
            <Link to="/catalogo">Voltar ao catálogo</Link>
          </Button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/livro/$slug" params={{ slug: book.slug }}>
              <ArrowLeft className="size-4" />
              Voltar aos detalhes
            </Link>
          </Button>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={book.pdf_url} target="_blank" rel="noreferrer">
                <ExternalLink className="size-4" />
                Abrir em nova aba
              </a>
            </Button>
            <Button size="sm" asChild>
              <a href={book.pdf_url} download>
                <Download className="size-4" />
                Baixar PDF
              </a>
            </Button>
          </div>
        </div>

        <h1 className="mt-6 font-display text-2xl font-bold sm:text-3xl">{book.title}</h1>
        {book.author ? <p className="mt-1 text-sm text-muted-foreground">{book.author}</p> : null}

        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
          <object data={book.pdf_url} type="application/pdf" className="h-[75vh] w-full">
            <iframe src={book.pdf_url} title={book.title} className="h-[75vh] w-full" />
          </object>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Se a leitura não aparecer no seu aparelho, use “Abrir em nova aba” ou baixe o arquivo.
        </p>
      </div>
    </PageShell>
  );
}
