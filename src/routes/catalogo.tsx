import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { BookCard } from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBooks, useFavorites, useToggleFavorite } from "@/lib/library";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo de Livros — Biblioteca Proibida" },
      {
        name: "description",
        content:
          "Busque por título, filtre por categoria e explore gratuitamente o acervo digital.",
      },
      { property: "og:title", content: "Catálogo — Biblioteca Proibida" },
      { property: "og:description", content: "Todos os títulos do acervo com acesso gratuito." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalogo,
});

function Catalogo() {
  const { data: books = [], isLoading } = useBooks();
  const { data: favorites = [] } = useFavorites();
  const toggleFavorite = useToggleFavorite();
  const cart = useCart();
  const { user } = useAuth();

  const [term, setTerm] = useState("");
  const [category, setCategory] = useState("todas");
  const [sort, setSort] = useState("padrao");

  const categories = useMemo(
    () => ["todas", ...Array.from(new Set(books.map((b) => b.category)))],
    [books],
  );

  const list = useMemo(() => {
    const q = term.trim().toLowerCase();
    const filtered = books.filter((b) => {
      const matchesTerm =
        !q ||
        b.title.toLowerCase().includes(q) ||
        (b.short_description ?? "").toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q);
      const matchesCategory = category === "todas" || b.category === category;
      return matchesTerm && matchesCategory;
    });
    const sorted = [...filtered];
    if (sort === "titulo") sorted.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
    if (sort === "avaliacao") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "destaques")
      sorted.sort(
        (a, b) =>
          Number(b.is_featured) - Number(a.is_featured) ||
          a.title.localeCompare(b.title, "pt-BR"),
      );
    return sorted;
  }, [books, term, category, sort]);

  const groups = useMemo(() => {
    const map = new Map<string, typeof list>();
    for (const book of list) {
      const bucket = map.get(book.category);
      if (bucket) bucket.push(book);
      else map.set(book.category, [book]);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0], "pt-BR"));
  }, [list]);

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Catálogo</h1>
        <p className="mt-2 text-muted-foreground">
          {books.length} títulos disponíveis para leitura gratuita.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Buscar por título, tema ou categoria"
              className="pl-9"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="sm:w-52">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c === "todas" ? "Todas as categorias" : c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="sm:w-52">
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="padrao">Ordem do acervo</SelectItem>
              <SelectItem value="titulo">Título (A-Z)</SelectItem>
              <SelectItem value="avaliacao">Melhor avaliação</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="mt-10 space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-xl border border-border bg-card/60" />
            ))}
          </div>
        ) : list.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">Nenhum título encontrado para esta busca.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setTerm("");
                setCategory("todas");
              }}
            >
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {list.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite={favorites.includes(book.id)}
                inLibrary={cart.has(book.id)}
                onToggleFavorite={(b) => {
                  if (!user) {
                    toast.error("Entre na sua conta para favoritar.");
                    return;
                  }
                  toggleFavorite.mutate({ bookId: b.id, isFavorite: favorites.includes(b.id) });
                }}
                onAddToLibrary={(b) => {
                  cart.add(b.id);
                  toast.success(`${b.title} adicionado à sua biblioteca.`);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
