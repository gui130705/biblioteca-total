import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { StickyNote, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useBooks } from "@/lib/library";
import { useAuth } from "@/hooks/useAuth";
import { useDeleteHighlight, useHighlights, useUpdateHighlightNote } from "@/lib/reading";

export const Route = createFileRoute("/anotacoes")({
  head: () => ({
    meta: [
      { title: "Minhas anotações — Biblioteca Proibida" },
      {
        name: "description",
        content: "Trechos marcados e anotações pessoais reunidos por livro, salvos na sua conta.",
      },
      { property: "og:title", content: "Minhas anotações — Biblioteca Proibida" },
      {
        property: "og:description",
        content: "Revise seus destaques e notas de leitura do acervo apócrifo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Anotacoes,
});

function Anotacoes() {
  const { user, loading } = useAuth();
  const { data: highlights = [] } = useHighlights();
  const { data: books = [] } = useBooks();
  const updateNote = useUpdateHighlightNote();
  const remove = useDeleteHighlight();
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const byBook = useMemo(() => {
    const map = new Map<string, typeof highlights>();
    for (const h of highlights) {
      const list = map.get(h.book_id);
      if (list) list.push(h);
      else map.set(h.book_id, [h]);
    }
    return Array.from(map.entries());
  }, [highlights]);

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="flex items-center gap-3">
          <StickyNote className="size-6 text-primary" />
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Anotações</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          Seus trechos marcados e notas ficam salvos na sua conta.
        </p>

        {!user && !loading ? (
          <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">Entre na sua conta para ver suas anotações.</p>
            <Button className="mt-4" asChild>
              <Link to="/auth">Entrar ou criar conta</Link>
            </Button>
          </div>
        ) : byBook.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">
              Nenhuma marcação ainda. Selecione um trecho durante a leitura para salvar.
            </p>
            <Button className="mt-4" variant="outline" asChild>
              <Link to="/catalogo">Explorar catálogo</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-10 space-y-10">
            {byBook.map(([bookId, items]) => {
              const book = books.find((b) => b.id === bookId);
              return (
                <section key={bookId}>
                  <h2 className="border-b border-border pb-2 font-display text-xl font-bold">
                    {book ? (
                      <Link to="/livro/$slug" params={{ slug: book.slug }} className="hover:text-primary">
                        {book.title}
                      </Link>
                    ) : (
                      "Livro"
                    )}
                  </h2>
                  <ul className="mt-4 space-y-4">
                    {items.map((h) => (
                      <li key={h.id} className="rounded-lg border border-border bg-card p-4">
                        <p className="border-l-2 border-primary pl-3 text-sm leading-relaxed italic">
                          “{h.text}”
                        </p>
                        <Textarea
                          className="mt-3"
                          rows={2}
                          placeholder="Sua anotação"
                          value={drafts[h.id] ?? h.note ?? ""}
                          onChange={(e) =>
                            setDrafts((prev) => ({ ...prev, [h.id]: e.target.value }))
                          }
                        />
                        <div className="mt-3 flex flex-wrap justify-end gap-2">
                          {book ? (
                            <Button variant="ghost" size="sm" asChild>
                              <Link to="/ler/$slug" params={{ slug: book.slug }}>
                                Ir ao livro
                              </Link>
                            </Button>
                          ) : null}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateNote.mutate(
                                { id: h.id, note: (drafts[h.id] ?? h.note ?? "").trim() || null },
                                { onSuccess: () => toast.success("Anotação salva.") },
                              )
                            }
                          >
                            Salvar nota
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Remover marcação"
                            onClick={() =>
                              remove.mutate(h.id, {
                                onSuccess: () => toast.success("Marcação removida."),
                              })
                            }
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </PageShell>
  );
}
