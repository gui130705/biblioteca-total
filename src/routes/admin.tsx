import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useBooks, useUpsertBook } from "@/lib/library";
import { formatPrice } from "@/lib/books";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administração do Catálogo — Biblioteca Proibida" },
      {
        name: "description",
        content: "Gerencie títulos, preços e publicação dos livros do acervo digital.",
      },
      { property: "og:title", content: "Administração — Biblioteca Proibida" },
      { property: "og:description", content: "Gestão de catálogo e preços." },
    ],
  }),
  component: Admin,
});

function Admin() {
  const { isAdmin, user, loading } = useAuth();
  const { data: books = [] } = useBooks(true);
  const upsert = useUpsertBook();
  const [prices, setPrices] = useState<Record<string, string>>({});

  if (loading) {
    return (
      <PageShell>
        <div className="mx-auto max-w-5xl px-4 py-24">
          <div className="h-48 animate-pulse rounded-xl border border-border bg-card/60" />
        </div>
      </PageShell>
    );
  }

  if (!user || !isAdmin) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Acesso restrito</h1>
          <p className="mt-3 text-muted-foreground">
            Esta área é exclusiva para administradores do catálogo.
          </p>
          <Button className="mt-6" asChild>
            <Link to={user ? "/conta" : "/auth"}>{user ? "Voltar à conta" : "Entrar"}</Link>
          </Button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Administração do catálogo</h1>
        <p className="mt-2 text-muted-foreground">
          Ajuste preços e visibilidade dos títulos. Preços em reais, aplicados ao checkout.
        </p>

        <ul className="mt-8 space-y-3">
          {books.map((book) => {
            const draft = prices[book.id] ?? (book.price_cents / 100).toFixed(2);
            return (
              <li
                key={book.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4"
              >
                <div className="min-w-48 flex-1">
                  <p className="font-medium">{book.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {book.category} · atual {formatPrice(book.price_cents, book.currency)}
                  </p>
                </div>
                <Badge variant={book.is_published ? "default" : "secondary"}>
                  {book.is_published ? "Publicado" : "Rascunho"}
                </Badge>
                <Input
                  className="w-28"
                  inputMode="decimal"
                  value={draft}
                  onChange={(e) => setPrices((prev) => ({ ...prev, [book.id]: e.target.value }))}
                />
                <Button
                  size="sm"
                  onClick={() => {
                    const value = Math.round(Number(draft.replace(",", ".")) * 100);
                    if (!Number.isFinite(value) || value < 0) {
                      toast.error("Preço inválido.");
                      return;
                    }
                    upsert.mutate(
                      { id: book.id, price_cents: value },
                      {
                        onSuccess: () => toast.success("Preço atualizado."),
                        onError: () => toast.error("Não foi possível atualizar."),
                      },
                    );
                  }}
                >
                  Salvar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    upsert.mutate(
                      { id: book.id, is_published: !book.is_published },
                      {
                        onSuccess: () => toast.success("Visibilidade atualizada."),
                        onError: () => toast.error("Não foi possível atualizar."),
                      },
                    )
                  }
                >
                  {book.is_published ? "Despublicar" : "Publicar"}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </PageShell>
  );
}
