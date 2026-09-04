import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-background/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-sm font-bold tracking-[0.2em] text-primary uppercase">
            Biblioteca Proibida
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Acervo digital de textos apócrifos e livros esquecidos, com compra individual por
            título.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Navegação</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/catalogo" className="hover:text-foreground">
                Catálogo
              </Link>
            </li>
            <li>
              <Link to="/favoritos" className="hover:text-foreground">
                Favoritos
              </Link>
            </li>
            <li>
              <Link to="/carrinho" className="hover:text-foreground">
                Carrinho
              </Link>
            </li>
            <li>
              <Link to="/conta" className="hover:text-foreground">
                Minha conta
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Compras</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Cada livro é vendido separadamente. Os preços exibidos são de exemplo e podem ser
            ajustados na administração do catálogo. O checkout com cobrança real é ativado após a
            conexão da conta de pagamentos.
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Biblioteca Proibida. Todos os direitos reservados.
      </div>
    </footer>
  );
}
