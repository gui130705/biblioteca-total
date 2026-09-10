import { createFileRoute, Link } from "@tanstack/react-router";
import { Library, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { ShelfRow } from "@/components/ShelfRow";
import { NowReadingCard } from "@/components/NowReadingCard";
import { Button } from "@/components/ui/button";
import { useBooks } from "@/lib/library";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useReadingProgress, useSaveProgress } from "@/lib/reading";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Minha estante — Biblioteca Proibida" },
      {
        name: "description",
        content:
          "Sua estante pessoal com leituras em andamento, títulos concluídos e a lista Quero ler.",
      },
      { property: "og:title", content: "Minha estante — Biblioteca Proibida" },
      {
        property: "og:description",
        content: "Continue de onde parou e acompanhe seu progresso de leitura.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Estante,
});

function Estante() {
  const cart = useCart();
  const { user } = useAuth();
  const { data: books = [] } = useBooks();
  const { data: progress = [] } = useReadingProgress();
  const saveProgress = useSaveProgress();

  const progressFor = (bookId: string) => progress.find((p) => p.book_id === bookId) ?? null;
  const saved = books.filter((b) => cart.items.includes(b.id));

  const reading = books.filter((b) => {
    const p = progressFor(b.id);
    return p?.status === "reading" && p.percent < 98;
  });
  const done = books.filter((b) => progressFor(b.id)?.status === "done");
  const want = books.filter((b) => {
    const p = progressFor(b.id);
    const isSaved = cart.items.includes(b.id) || p?.status === "want";
    return isSaved && p?.status !== "reading" && p?.status !== "done";
  });

  const continueBook = reading[0];
  const continuePercent = continueBook ? (progressFor(continueBook.id)?.percent ?? 0) : 0;

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex items-center gap-3">
          <Library className="size-7 text-primary" />
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Minha estante</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          Seus livros gratuitos, organizados pelo seu ritmo de leitura.
        </p>

        {continueBook ? (
          <div className="mt-8">
            <NowReadingCard book={continueBook} percent={continuePercent} />
          </div>
        ) : null}

        {!user ? (
          <div className="mt-8 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Entre na sua conta para salvar progresso, marcações e anotações em todos os aparelhos.{" "}
            <Link to="/auth" className="text-primary underline-offset-4 hover:underline">
              Entrar
            </Link>
          </div>
        ) : null}

        <ShelfRow
          title="Em andamento"
          books={reading}
          progressFor={progressFor}
          empty="Nenhuma leitura em andamento."
        />
        <ShelfRow
          title="Quero ler"
          books={want}
          progressFor={progressFor}
          empty="Adicione títulos à sua estante pelo catálogo."
          action={(book) => (
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Remover ${book.title}`}
              onClick={() => {
                cart.remove(book.id);
                toast.success("Removido da estante.");
              }}
            >
              <Trash2 className="size-4" />
            </Button>
          )}
        />
        <ShelfRow
          title="Concluídos"
          books={done}
          progressFor={progressFor}
          empty="Você ainda não concluiu nenhum livro."
          action={(book) => (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                saveProgress.mutate({ bookId: book.id, status: "reading" });
                toast.success("Movido para Em andamento.");
              }}
            >
              Reabrir
            </Button>
          )}
        />

        {saved.length === 0 && reading.length === 0 && done.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">Sua estante ainda está vazia.</p>
            <Button className="mt-4" asChild>
              <Link to="/catalogo">Explorar catálogo</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </PageShell>
  );
}
