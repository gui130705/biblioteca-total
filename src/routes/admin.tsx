import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useBooks, useUpsertBook } from "@/lib/library";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administração do Catálogo — Biblioteca Proibida" },
      {
        name: "description",
        content: "Gerencie os títulos e a publicação dos livros gratuitos do acervo digital.",
      },
      { property: "og:title", content: "Administração — Biblioteca Proibida" },
      { property: "og:description", content: "Gestão do catálogo gratuito." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const { isAdmin, user, loading } = useAuth();
  const { data: books = [] } = useBooks(true);
  const upsert = useUpsertBook();

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
          Controle a visibilidade dos títulos. Todo o acervo atual está disponível gratuitamente.
        </p>

        <ul className="mt-8 space-y-3">
          {books.map((book) => (
              <li
                key={book.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4"
              >
                <div className="min-w-48 flex-1">
                  <p className="font-medium">{book.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {book.category} · acesso grátis
                  </p>
                </div>
                <Badge variant={book.is_published ? "default" : "secondary"}>
                  {book.is_published ? "Publicado" : "Rascunho"}
                </Badge>
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
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
