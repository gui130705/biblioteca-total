import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CreditCard, Info, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { BookCover } from "@/components/BookCover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useBooks, useCreateOrder } from "@/lib/library";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { formatPrice } from "@/lib/books";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Carrinho — Biblioteca Proibida" },
      {
        name: "description",
        content: "Revise os títulos selecionados e finalize a compra dos seus livros digitais.",
      },
      { property: "og:title", content: "Carrinho — Biblioteca Proibida" },
      { property: "og:description", content: "Finalize a compra dos seus livros digitais." },
    ],
  }),
  component: Carrinho,
});

function Carrinho() {
  const cart = useCart();
  const { data: books = [] } = useBooks();
  const { user } = useAuth();
  const navigate = useNavigate();
  const createOrder = useCreateOrder();

  const items = books.filter((b) => cart.items.includes(b.id));
  const total = items.reduce((sum, b) => sum + b.price_cents, 0);

  async function handleCheckout() {
    if (!user) {
      toast.error("Entre na sua conta para finalizar a compra.");
      void navigate({ to: "/auth" });
      return;
    }
    try {
      await createOrder.mutateAsync(items);
      cart.clear();
      toast.success("Pedido registrado! Veja o status em Minha conta.");
      void navigate({ to: "/conta" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível criar o pedido.");
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Carrinho</h1>

        {items.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">Seu carrinho está vazio.</p>
            <Button className="mt-4" asChild>
              <Link to="/catalogo">Explorar catálogo</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_320px]">
            <ul className="space-y-4">
              {items.map((book) => (
                <li
                  key={book.id}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
                >
                  <BookCover
                    title={book.title.replace(/^Livro d[eoa] /i, "")}
                    theme={book.cover_theme}
                    className="h-24 w-16 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/livro/$slug"
                      params={{ slug: book.slug }}
                      className="font-medium hover:text-primary"
                    >
                      {book.title}
                    </Link>
                    <p className="truncate text-sm text-muted-foreground">{book.category}</p>
                  </div>
                  <span className="font-semibold text-gold">
                    {formatPrice(book.price_cents, book.currency)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Remover ${book.title}`}
                    onClick={() => cart.remove(book.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">Resumo</h2>
              <Separator className="my-4" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{items.length} título(s)</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="mt-4 flex justify-between text-base font-semibold">
                <span>Total</span>
                <span className="text-gold">{formatPrice(total)}</span>
              </div>
              <Button
                className="mt-6 w-full"
                onClick={() => void handleCheckout()}
                disabled={createOrder.isPending}
              >
                <CreditCard className="size-4" />
                {createOrder.isPending ? "Processando..." : "Ir para o pagamento"}
              </Button>
              <p className="mt-4 flex gap-2 text-xs text-muted-foreground">
                <Info className="mt-0.5 size-3.5 shrink-0" />
                O pedido é registrado agora e fica aguardando confirmação. O checkout com cobrança
                real é ativado assim que a conta de pagamentos for conectada.
              </p>
            </aside>
          </div>
        )}
      </div>
    </PageShell>
  );
}
