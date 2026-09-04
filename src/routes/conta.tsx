import { createFileRoute, Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { BookCover } from "@/components/BookCover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useBooks, useOrders } from "@/lib/library";
import { formatPrice } from "@/lib/books";

export const Route = createFileRoute("/conta")({
  head: () => ({
    meta: [
      { title: "Minha Conta — Biblioteca Proibida" },
      {
        name: "description",
        content: "Seus pedidos, livros adquiridos e dados de leitor na Biblioteca Proibida.",
      },
      { property: "og:title", content: "Minha Conta — Biblioteca Proibida" },
      { property: "og:description", content: "Acompanhe pedidos e acesse seus livros comprados." },
    ],
  }),
  component: Conta,
});

const statusLabels: Record<string, string> = {
  pending: "Aguardando pagamento",
  paid: "Pago",
  cancelled: "Cancelado",
  refunded: "Reembolsado",
};

function Conta() {
  const { user, loading, signOut, isAdmin } = useAuth();
  const { data: orders = [] } = useOrders();
  const { data: books = [] } = useBooks();

  const bookById = new Map(books.map((b) => [b.id, b]));
  const ownedBooks = books.filter((b) =>
    orders.some((o) => o.status === "paid" && (o.order_items ?? []).some((i) => i.book_id === b.id)),
  );

  if (!user && !loading) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Área do leitor</h1>
          <p className="mt-3 text-muted-foreground">Entre na sua conta para continuar.</p>
          <Button className="mt-6" asChild>
            <Link to="/auth">Entrar ou criar conta</Link>
          </Button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">Minha conta</h1>
            <p className="mt-2 text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex gap-2">
            {isAdmin ? (
              <Button variant="outline" asChild>
                <Link to="/admin">Administração</Link>
              </Button>
            ) : null}
            <Button variant="ghost" onClick={() => void signOut()}>
              <LogOut className="size-4" />
              Sair
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        <section>
          <h2 className="font-display text-xl font-bold">Meus livros</h2>
          {ownedBooks.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Você ainda não tem livros liberados. Assim que um pagamento for confirmado, o título
              aparece aqui.
            </p>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ownedBooks.map((b) => (
                <Link
                  key={b.id}
                  to="/livro/$slug"
                  params={{ slug: b.slug }}
                  className="rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/60"
                >
                  <BookCover
                    title={b.title.replace(/^Livro d[eoa] /i, "")}
                    theme={b.cover_theme}
                    className="h-40 w-full"
                  />
                  <p className="mt-3 text-sm font-medium">{b.title}</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <Separator className="my-8" />

        <section>
          <h2 className="font-display text-xl font-bold">Pedidos</h2>
          {orders.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">Nenhum pedido registrado ainda.</p>
          ) : (
            <ul className="mt-6 space-y-4">
              {orders.map((order) => (
                <li key={order.id} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">
                        Pedido #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <Badge variant={order.status === "paid" ? "default" : "secondary"}>
                      {statusLabels[order.status] ?? order.status}
                    </Badge>
                    <span className="font-semibold text-gold">
                      {formatPrice(order.total_cents, order.currency)}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {(order.order_items ?? []).map((item) => (
                      <li key={item.book_id}>
                        • {bookById.get(item.book_id)?.title ?? "Título removido"} —{" "}
                        {formatPrice(item.unit_price_cents, order.currency)}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </PageShell>
  );
}
