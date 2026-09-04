import { Link } from "@tanstack/react-router";
import { BookOpen, Heart, Menu, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { to: "/", label: "Início" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/favoritos", label: "Favoritos" },
] as const;

export function SiteHeader() {
  const cart = useCart();
  const { user, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="size-5 text-primary" />
          <span className="font-display text-sm font-bold tracking-[0.2em] text-primary uppercase sm:text-base">
            Biblioteca Proibida
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin ? (
            <Link
              to="/admin"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Admin
            </Link>
          ) : null}
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild aria-label="Favoritos">
            <Link to="/favoritos">
              <Heart className="size-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Carrinho" className="relative">
            <Link to="/carrinho">
              <ShoppingCart className="size-4" />
              {cart.count > 0 ? (
                <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cart.count}
                </span>
              ) : null}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Conta">
            <Link to={user ? "/conta" : "/auth"}>
              <User className="size-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="size-4" />
          </Button>
        </div>
      </div>

      {open ? (
        <nav className="flex flex-col gap-1 border-t border-border/60 px-4 py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          {isAdmin ? (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              Admin
            </Link>
          ) : null}
        </nav>
      ) : null}
    </header>
  );
}
