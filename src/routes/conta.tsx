import { createFileRoute, Link } from "@tanstack/react-router";
import { Library, LogOut } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/conta")({
  head: () => ({
    meta: [
      { title: "Minha Conta — Biblioteca Proibida" },
      {
        name: "description",
        content: "Sua biblioteca gratuita, favoritos e dados de leitor na Biblioteca Proibida.",
      },
      { property: "og:title", content: "Minha Conta — Biblioteca Proibida" },
      { property: "og:description", content: "Organize e acesse seus livros gratuitos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Conta,
});

function Conta() {
  const { user, loading, signOut, isAdmin } = useAuth();

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
          <h2 className="font-display text-xl font-bold">Leitura gratuita</h2>
          <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-lg border border-border bg-card p-5">
            <Library className="size-7 shrink-0 text-gold" />
            <div className="min-w-0">
              <p className="font-medium">Minha biblioteca</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Reúna seus títulos preferidos e acesse todos sem cobrança.
              </p>
            </div>
            <Button className="col-span-2 sm:col-span-1 sm:col-start-2 sm:w-fit" asChild>
              <Link to="/carrinho">Abrir minha biblioteca</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
