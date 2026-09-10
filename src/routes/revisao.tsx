import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Brain, Check, ChevronRight, Eye, RotateCcw } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useBooks } from "@/lib/library";
import { useAuth } from "@/hooks/useAuth";
import { useHighlights, useMarkReviewed, highlightKindLabel } from "@/lib/reading";

export const Route = createFileRoute("/revisao")({
  head: () => ({
    meta: [
      { title: "Revisão de insights — Biblioteca Proibida" },
      {
        name: "description",
        content:
          "Revise seus destaques em formato de cartões, no ritmo da repetição espaçada, e fixe os insights das suas leituras.",
      },
      { property: "og:title", content: "Revisão de insights" },
      {
        property: "og:description",
        content: "Cartões de revisão criados a partir dos seus destaques de leitura.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RevisaoPage,
});

// Intervalos simples de repetição espaçada, em dias.
const INTERVALS = [0, 1, 3, 7, 14, 30];

function isDue(lastReviewedAt: string | null, reviewCount: number) {
  if (!lastReviewedAt) return true;
  const days = INTERVALS[Math.min(reviewCount, INTERVALS.length - 1)] ?? 30;
  const next = new Date(lastReviewedAt).getTime() + days * 86_400_000;
  return Date.now() >= next;
}

function RevisaoPage() {
  const { user } = useAuth();
  const { data: highlights = [] } = useHighlights();
  const { data: books = [] } = useBooks();
  const markReviewed = useMarkReviewed();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const due = useMemo(
    () => highlights.filter((h) => isDue(h.last_reviewed_at, h.review_count)),
    [highlights],
  );

  const card = due[index];
  const book = card ? books.find((b) => b.id === card.book_id) : undefined;

  const next = () => {
    setRevealed(false);
    setIndex((i) => i + 1);
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] text-primary uppercase">
          <Brain className="size-3.5" />
          Revisão de insights
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
          Fixe o que você destacou
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Cada destaque volta em intervalos crescentes: 1 dia, 3, 7, 14 e 30 dias.
        </p>

        {!user ? (
          <div className="mt-10 rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">Entre na sua conta para revisar seus destaques.</p>
            <Button className="mt-4" asChild>
              <Link to="/auth">Entrar</Link>
            </Button>
          </div>
        ) : highlights.length === 0 ? (
          <div className="mt-10 rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              Você ainda não destacou trechos. Marque um trecho durante a leitura para começar.
            </p>
            <Button className="mt-4" asChild>
              <Link to="/catalogo">Escolher um livro</Link>
            </Button>
          </div>
        ) : !card ? (
          <div className="mt-10 rounded-xl border border-border bg-card p-8 text-center">
            <Check className="mx-auto size-6 text-primary" />
            <p className="mt-3 text-muted-foreground">
              Revisão em dia. Volte amanhã para os próximos cartões.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setIndex(0);
                setRevealed(false);
              }}
            >
              <RotateCcw className="size-4" />
              Recomeçar
            </Button>
          </div>
        ) : (
          <div className="mt-10">
            <p className="text-xs text-muted-foreground">
              Cartão {index + 1} de {due.length}
            </p>
            <article className="mt-3 rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-primary/40 px-3 py-1 text-[11px] tracking-widest text-primary uppercase">
                  {highlightKindLabel(card.kind)}
                </span>
                {book ? (
                  <Link
                    to="/ler/$slug"
                    params={{ slug: book.slug }}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    {book.title}
                  </Link>
                ) : null}
              </div>

              <blockquote className="mt-6 font-display text-xl leading-relaxed">
                “{card.text}”
              </blockquote>

              {revealed ? (
                <p className="mt-6 rounded-lg border border-border/60 bg-background/50 p-4 text-sm text-muted-foreground">
                  {card.note?.trim() ? card.note : "Sem anotação para este trecho."}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-2">
                {!revealed ? (
                  <Button onClick={() => setRevealed(true)}>
                    <Eye className="size-4" />
                    Ver anotação
                  </Button>
                ) : null}
                <Button
                  variant="outline"
                  onClick={() => {
                    markReviewed.mutate({ id: card.id, count: card.review_count });
                    next();
                  }}
                >
                  <Check className="size-4" />
                  Revisado
                </Button>
                <Button variant="ghost" onClick={next}>
                  Pular
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </article>
          </div>
        )}
      </div>
    </PageShell>
  );
}
